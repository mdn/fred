import { html, nothing } from "lit";

import { AuthorDateReadTime } from "../blog/utils.js";
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
 * @param {boolean} params.lazyLoad
 */
export function BlogIndexImageFigure(
  _context,
  { image, slug, width, height, lazyLoad },
) {
  const src = `/en-US/blog/${slug}/${image.file}`;
  return html`<figure class="blog-post-preview__figure">
    <a href="/en-US/blog/${slug}/">
      <img
        alt=${image.alt || ""}
        src=${src}
        width=${width}
        height=${height}
        loading=${lazyLoad ? "lazy" : "eager"}
      />
    </a>
  </figure>`;
}

/**
 *
 * @param {import("@fred").Context} context
 * @param {import("@rari").BlogMeta} blogMeta
 * @param {boolean} lazyLoad
 */
function PostPreview(context, blogMeta, lazyLoad = false) {
  return html`<article class="blog-post-preview">
    <header data-x="bla" class="blog-post-preview__header">
      ${BlogIndexImageFigure(context, {
        image: blogMeta.image,
        slug: blogMeta.slug,
        width: 1200,
        height: 630,
        lazyLoad,
      })}
      <h2>
        <a href="/en-US/blog/${blogMeta.slug}/">${blogMeta.title}</a>
      </h2>
      <div class="blog-post-preview__author-read-time">
        ${AuthorDateReadTime(context, blogMeta, lazyLoad)}
      </div>
    </header>
    <p class="blog-post-preview__description">${blogMeta.description}</p>
    <footer class="blog-post-preview__footer">
      ${blogMeta.sponsored
        ? html`<span class="blog-post-preview__sponsored">Sponsored</span>`
        : nothing}
      ${Button.render(context, {
        label: "Read more",
        href: `/en-US/blog/${blogMeta.slug}/`,
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
    return PageLayout.render(
      context,
      html`
        <div class="blog-index">
          <header class="blog-index__header">
            <h1>${context.l10n`Blog it better`}</h1>
          </header>
          <div class="blog-index__main">
            <section class="blog-index__articles">
              ${context.hyData?.posts.map((blogMeta, index) =>
                PostPreview(context, blogMeta, index >= 2),
              )}
            </section>
            ${Pagination.render(context, {
              ...context.hyData?.pagination,
              pageUrl: (page) =>
                page === 1
                  ? `/${context.locale}/blog/`
                  : `/${context.locale}/blog/${page}/`,
            })}
          </div>
        </div>
      `,
    );
  }
}
