import { html, nothing } from "lit";

import { AuthorDateReadTime, BlogContainer } from "../blog/index.js";
import { ContentSection } from "../content-section/server.js";
import { PageLayout } from "../page-layout/server.js";
import { ReferenceToc } from "../reference-toc/server.js";

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
  const src = `../${image.file}`;
  return html`<figure class="blog-post__image">
    <img alt=${image.alt || ""} src=${src} height=${height} width=${width} />
  </figure>`;
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

/**
 * @param {import("@fred").Context} context
 * @param {object} params
 * @param {import("@rari").BlogMeta} params.blogMeta
 * @returns {import("@lit").TemplateResult | nothing}
 */
function PrevNextLinks(context, { blogMeta }) {
  if (!blogMeta.links) {
    return nothing;
  }
  if (!blogMeta.links.previous && !blogMeta.links.next) {
    return nothing;
  }

  const previous = blogMeta.links.previous
    ? html`
        <a href="../${blogMeta.links.previous.slug}/">
          <article>
            ${context.l10n("blog_previous")`Previous Post`}
            ${blogMeta.links.previous.title}
          </article>
        </a>
      `
    : nothing;
  const next = blogMeta.links.next
    ? html`
        <a href="../${blogMeta.links.next.slug}/">
          <article>
            ${context.l10n("blog_next")`Next post`} ${blogMeta.links.next.title}
          </article>
        </a>
      `
    : nothing;
  return html`<div class="blog-post__previous-next">${previous} ${next}</div>`;
}

export class BlogPost extends ServerComponent {
  /**
   *
   * @param {import("@fred").Context<import("@rari").BlogPage>} context
   * @returns {import("@lit").TemplateResult}
   */
  render(context) {
    const { blogMeta, doc } = context;

    if (!blogMeta || !doc) {
      return PageLayout.render(
        context,
        html`<p>
          ${context.l10n("blog_post_not_found")`Blog post not found`}
        </p>`,
      );
    }

    const postContent = html`
      <article class="blog-post__main">
        <aside class="blog-post__sidebar">
          ${ReferenceToc.render(context)}
          <mdn-placement-sidebar></mdn-placement-sidebar>
        </aside>
        <div class="blog-post__content">
          <header class="blog-post__header">
            ${BlogTitleImageFigure(context, {
              image: blogMeta.image,
              width: 800,
              height: 420,
            })}
            ${blogMeta.sponsored
              ? html`<span class="blog-post__sponsored">Sponsored</span>`
              : nothing}
            <h1>${blogMeta.title}</h1>
            <div class="blog-post__author-read-time">
              ${AuthorDateReadTime(context, { blogMeta })}
            </div>
          </header>
          <main class="blog-post__content">
            ${RenderBlogContent(context, { doc })}
          </main>
          <footer class="blog-post__footer">
            ${PrevNextLinks(context, { blogMeta })}
          </footer>
        </div>
      </article>
    `;

    return PageLayout.render(context, BlogContainer(context, postContent));
  }
}
