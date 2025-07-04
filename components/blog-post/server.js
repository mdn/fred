import { html, nothing } from "lit";

import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { AuthorDateReadTime, PrevNextLinks } from "../blog/utils.js";
import { ContentSection } from "../content-section/server.js";
import { PageLayout } from "../page-layout/server.js";

import { ServerComponent } from "../server/index.js";

/**
 * @param {import("@fred").Context} _context
 * @param {object} params
 * @param {import("@rari").BlogImage} params.image
 * @param {number} params.width
 * @param {number} params.height
 * @returns {import("@lit").TemplateResult}
 */
function BlogTitleImageFigure(_context, { image, width, height }) {
  // In post view, image paths are relative to the post's directory sibling
  const src = `./${image.file}`;
  return html`<figure class="blog-post-header__image">
    <img alt=${image.alt || ""} src=${src} height=${height} width=${width} />
  </figure>`;
}

/**
 * @param {import("@fred").Context<import("@rari").BlogPage>} context
 */
function RenderToc(context) {
  return html`<nav class="blog-toc">
    <h2>${context.l10n("reference-toc-header")`In this article`}</h2>
    <ul>
      ${context?.doc?.toc?.map(
        ({ id, text }) =>
          html`<li><a href="#${id}">${unsafeHTML(text)}</a></li>`,
      )}
    </ul>
  </nav>`;
}

/**
 * @param {import("@fred").Context} context
 * @param {object} params
 * @param {import("@rari").BlogPostDoc} params.doc
 * @returns {import("@lit").TemplateResult}
 */
function RenderBlogContent(context, { doc }) {
  return html`
    ${doc.body.map((section) => ContentSection.render(context, section))}
  `;
}

export class BlogPost extends ServerComponent {
  /**
   *
   * @param {import("@fred").Context<import("@rari").BlogPostPage>} context
   * @returns {import("@lit").TemplateResult}
   */
  render(context) {
    const { blogMeta, doc } = context;

    if (!blogMeta || !doc) {
      return PageLayout.render(
        context,
        html`<p>
          ${context.l10n("blog-post-not-found")`Blog post not found`}
        </p>`,
      );
    }

    const postContent = html`
      <article class="blog-post">
        <aside class="blog-post__toc">
          ${RenderToc(context)}
          <mdn-placement-sidebar></mdn-placement-sidebar>
        </aside>
        <div class="blog-post__content blog-post-content">
          <header class="blog-post-content__header">
            ${BlogTitleImageFigure(context, {
              image: blogMeta.image,
              width: 800,
              height: 420,
            })}
            ${blogMeta.sponsored
              ? html`<span class="blog-post__sponsored">Sponsored</span>`
              : nothing}
            <h1 class="blog-post-header__heading">${blogMeta.title}</h1>
            <div class="blog-post-header__author-read-time">
              ${AuthorDateReadTime(context, blogMeta)}
            </div>
          </header>
          <main class="blog-post-content__content">
            ${RenderBlogContent(context, { doc })}
          </main>
          <footer class="blog-post-content__footer">
            ${PrevNextLinks(context, { blogMeta })}
          </footer>
        </div>
      </article>
    `;

    return PageLayout.render(context, postContent);
  }
}
