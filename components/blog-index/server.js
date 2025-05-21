import { html, nothing } from "lit";

import { AuthorDateReadTime, BlogContainer } from "../blog/index.js";
import { Button } from "../button/server.js";
import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

/**
 * @param {import("types/fred.js").Context} _context
 * @param {object} params
 * @param {import("types/rari.js").BlogImage} params.image
 * @param {string} params.slug
 * @param {number} params.width
 * @param {number} params.height
 */
export function BlogIndexImageFigure(_context, { image, slug, width, height }) {
  const src = `./${slug}/${image.file}`;
  return html`<figure className="blog-image">
    <a href="./${slug}/">
      <img alt=${image.alt || ""} src=${src} height=${height} width=${width} />
    </a>
  </figure>`;
}

/**
 *
 * @param {import("types/fred.js").Context} context
 * @param {import("types/rari.js").BlogMeta} blogMeta
 */
function PostPreview(context, blogMeta) {
  return html`<article class="blog-index__article">
    <header>
      ${BlogIndexImageFigure(context, {
        image: blogMeta.image,
        slug: blogMeta.slug,
        width: 200,
        height: 200,
      })}
      <h2>
        <a href="./${blogMeta.slug}/">${blogMeta.title}</a>
      </h2>
      <div class="blog-index__author-read-time">
        ${AuthorDateReadTime(context, { blogMeta })}
      </div>
    </header>
    <p>${blogMeta.description}</p>
    <footer>
      ${blogMeta.sponsored
        ? html`<span className="sponsored">Sponsored</span>`
        : nothing}
      ${Button.render(context, {
        label: "Read more →",
        href: `./${blogMeta.slug}/`,
      })}
    </footer>
  </article>`;
}

export class BlogIndex extends ServerComponent {
  /**
   *
   * @param {import("types/fred.js").Context<import("types/rari.js").BlogPage>} context
   * @returns {import("types/lit.js").TemplateResult}
   */
  render(context) {
    const content = BlogContainer(
      context,
      html`
        <div class="blog-index__main">
          <header class="blog-index__header">
            <h1 class="mify">${context.l10n`Blog it better`}</h1>
          </header>
          <section class="blog-index__articles">
            ${context.hyData?.posts.map((blogMeta) => {
              return PostPreview(context, blogMeta);
            })}
          </section>
        </div>
      `,
    );
    return PageLayout.render(context, content);
  }
}
