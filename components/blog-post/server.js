import { html, nothing } from "lit";

import { AuthorDateReadTime, BlogContainer } from "../blog/index.js";
import { Section } from "../content/server.js";
import { PageLayout } from "../page-layout/server.js";
import { ReferenceToc } from "../reference-toc/server.js";

import { ServerComponent } from "../server/index.js";

/**
 * @param {Fred.Context} _context
 * @param {object} params
 * @param {Rari.BlogImage} params.image
 * @param {number} params.width
 * @param {number} params.height
 * @returns {Lit.TemplateResult}
 */
function BlogTitleImageFigure(_context, { image, width, height }) {
  // In post view, image paths are relative to the post's directory sibling
  const src = `../${image.file}`;
  return html`<figure class="blog-post__image">
    <img alt=${image.alt || ""} src=${src} height=${height} width=${width} />
  </figure>`;
}

/**
 * @param {Fred.Context<Rari.BlogPage>} context
 * @param {object} params
 * @param {Rari.TocEntry[] | undefined} params.toc
 * @returns {Lit.TemplateResult | nothing}
 */
function BlogPostSidebar(context, { toc }) {
  if (!toc || toc.length === 0) {
    return nothing;
  }

  return html` <nav class="blog-toc">${ReferenceToc.render(context)}</nav> `;
}

/**
 * @param {Fred.Context} _context
 * @returns {Lit.TemplateResult | nothing}
 */
function SidePlacement(_context) {
  // TODO: implement somewhere central
  return nothing;
}

/**
 * @param {Fred.Context} context
 * @param {object} params
 * @param {Rari.BlogPostDoc} params.doc
 * @returns {Lit.TemplateResult}
 */
function RenderBlogContent(context, { doc }) {
  return html` ${doc.body.map((section) => Section(context, section))} `;
}

/**
 * @param {Fred.Context} context
 * @param {object} params
 * @param {Rari.BlogMeta} params.blogMeta
 * @returns {Lit.TemplateResult | nothing}
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
   * @param {Fred.Context<Rari.BlogPage>} context
   * @returns {Lit.TemplateResult}
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
    const { toc } = doc;

    const postContent = html`
      <article class="blog-post__main">
        <aside class="blog-post__sidebar">
          ${BlogPostSidebar(context, { toc })} ${SidePlacement(context)}
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
