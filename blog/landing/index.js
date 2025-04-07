import { html } from "lit";

import { PageLayout } from "../../components/page-layout/index.js";
import {
  BlogContainer,
  MaybeLink,
  PublishDate,
  TimeToRead,
} from "../shared/index.js";

/**
 * @param {Fred.Context} _context
 * @param {object} params
 * @param {Rari.BlogImage} params.image
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
 * @param {Fred.Context} context
 * @param {Rari.BlogMeta} blogMeta
 * @returns {Lit.TemplateResult}
 */
function AuthorDateReadTime(context, blogMeta) {
  const author = html`
    <img
      src=${blogMeta.author.avatar_url || "/assets/avatar.png"}
      alt="Author avatar"
    />
    ${blogMeta.author.name || "The MDN Team"}
  `;
  console.log("author", blogMeta.author);
  const link = blogMeta.author?.link ?? undefined;

  return html`
    ${MaybeLink(context, { link, content: author })}
    ${PublishDate(context, { date: blogMeta.date })}
    ${TimeToRead(context, { readTime: blogMeta.readTime })}
  `;
}

/**
 *
 * @param {Fred.Context} context
 * @param {Rari.BlogMeta} blogMeta
 */
function PostPreview(context, blogMeta) {
  return html`<article>
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
        ${AuthorDateReadTime(context, blogMeta)}
      </div>
    </header>
    <p>${blogMeta.description}</p>
    <footer>
      ${blogMeta.sponsored &&
      html`<span className="sponsored">Sponsored</span>`}
      <a href="./${blogMeta.slug}/" target="_self"> Read more → </a>
    </footer>
  </article>`;
}

/**
 *
 * @param {Fred.Context<Rari.BlogPage>} context
 * @returns {Lit.TemplateResult}
 */
export function BlogIndex(context) {
  const content = BlogContainer(
    context,
    html`
      <header>
        <h1 class="mify">${context.l10n`Blog it better`}</h1>
      </header>
      <section className="article-list">
        ${context.hyData?.posts.map((blogMeta) => {
          return PostPreview(context, blogMeta);
        })}
      </section>
    `,
  );
  return PageLayout(context, content);
}
