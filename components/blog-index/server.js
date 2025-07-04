import { html, nothing } from "lit";

import { AuthorDateReadTime, BlogContainer } from "../blog/index.js";
import { Button } from "../button/server.js";
import arrowRightIcon from "../icon/arrow-right.svg?lit";
import { PageLayout } from "../page-layout/server.js";
import { Pagination } from "../pagination/server.js";
import { ServerComponent } from "../server/index.js";

/**
 * @param {import("@fred").Context} _context
 * @param {object} params
 * @param {import("@rari").BlogImage} params.image
 * @param {string} params.slug
 * @param {number} params.width
 * @param {number} params.height
 */
export function BlogIndexImageFigure(_context, { image, slug, width, height }) {
  const src = `./${slug}/${image.file}`;
  return html`<figure class="blog-image">
    <a href="./${slug}/">
      <img alt=${image.alt || ""} src=${src} height=${height} width=${width} />
    </a>
  </figure>`;
}

/**
 *
 * @param {import("@fred").Context} context
 * @param {import("@rari").BlogMeta} blogMeta
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
        ? html`<span class="sponsored">Sponsored</span>`
        : nothing}
      ${Button.render(context, {
        label: "Read more",
        href: `./${blogMeta.slug}/`,
        icon: arrowRightIcon,
        iconPosition: "after",
      })}
    </footer>
  </article>`;
}

export class BlogIndex extends ServerComponent {
  /**
   *
   * @param {import("@fred").Context<import("@rari").BlogPostPage>} context
   * @returns {import("@lit").TemplateResult}
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
          ${Pagination.render(context, {
            ...context.hyData?.pagination,
            pageUrl: (page) =>
              page === 1
                ? `/${context.locale}/blog/`
                : `/${context.locale}/blog/${page}/`,
          })}
        </div>
      `,
    );
    return PageLayout.render(context, content);
  }
}
