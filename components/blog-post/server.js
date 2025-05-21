import { html, nothing } from "lit";

import { AuthorDateReadTime, BlogContainer } from "../blog/index.js";
import { PageLayout } from "../page-layout/server.js";
import { ReferenceToc } from "../reference-toc/server.js";
import { Section } from "../section/server.js";

import { ServerComponent } from "../server/index.js";

/**
 * @param {import("types/fred.js").Context} _context
 * @param {object} params
 * @param {import("types/rari.js").BlogImage} params.image
 * @param {number} params.width
 * @param {number} params.height
 * @returns {import("types/lit.js").TemplateResult}
 */
function BlogTitleImageFigure(_context, { image, width, height }) {
  // In post view, image paths are relative to the post's directory sibling
  const src = `../${image.file}`;
  return html`<figure class="blog-post__image">
    <img alt=${image.alt || ""} src=${src} height=${height} width=${width} />
  </figure>`;
}

/**
 * @param {import("types/fred.js").Context<import("types/rari.js").BlogPage>} context
 * @param {object} params
 * @param {import("types/rari.js").TocEntry[] | undefined} params.toc
 * @returns {import("types/lit.js").TemplateResult | nothing}
 */
function BlogPostToc(context, { toc }) {
  if (!toc || toc.length === 0) {
    return nothing;
  }

  return html`
    <div class="blog-post__toc">${ReferenceToc.render(context)}</div>
  `;
}

/**
 * @param {import("types/fred.js").Context} _context
 * @returns {import("types/lit.js").TemplateResult | nothing}
 */
function SidePlacement(_context) {
  // TODO: implement somewhere central
  return nothing;
}

/**
 * @param {import("types/fred.js").Context} context
 * @param {object} params
 * @param {import("types/rari.js").BlogPostDoc} params.doc
 * @returns {import("types/lit.js").TemplateResult}
 */
function RenderBlogContent(context, { doc }) {
  return html` ${doc.body.map((section) => Section.render(context, section))} `;
}

/**
 * @param {import("types/fred.js").Context} context
 * @param {object} params
 * @param {import("types/rari.js").BlogMeta} params.blogMeta
 * @returns {import("types/lit.js").TemplateResult | nothing}
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
   * @param {import("types/fred.js").Context<import("types/rari.js").BlogPage>} context
   * @returns {import("types/lit.js").TemplateResult}
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
          ${BlogPostToc(context, { toc })} ${SidePlacement(context)}
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
