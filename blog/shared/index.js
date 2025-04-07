// @ts-nocheck
import { html, nothing } from "lit";

/** @import { AuthorMetadata, BlogPostMetadata } from "../types" */

/**
 *
 * @param {Fred.Context} context
 * @param {Lit.TemplateResult} content
 * @returns {Lit.TemplateResult}
 */
export function BlogContainer(context, content) {
  return html`<div className="blog-container">${content}</div>`;
}

/**
 *
 * @param {Fred.Context} _context
 * @param {object} params
 * @param {string | undefined} [params.className]
 * @param {string | null | undefined} params.link
 * @param {Lit.TemplateResult} params.content
 * @returns
 */
export function MaybeLink(_context, { className = "", link, content }) {
  return link
    ? link.startsWith("https://")
      ? html` <a
          href=${link}
          className="external ${className}"
          target="_blank"
          rel="noreferrer"
        >
          ${content}
        </a>`
      : html`<a href=${link} className="{className}"> ${content} </a>`
    : html`<span className="{className}">${content}</span>`;
}

/**
 *
 * @param {Fred.Context} _context
 * @param {object} params
 * @param {string} params.date
 * @returns {Lit.TemplateResult}
 */
export function PublishDate(_context, { date }) {
  return html`
    <time class="date">
      ${Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(
        new Date(date),
      )}
    </time>
  `;
}

/**
 *
 * @param {Fred.Context} context
 * @param {object} params
 * @param {number} params.readTime
 * @returns {Lit.TemplateResult | nothing}
 */
export function TimeToRead(context, { readTime }) {
  if (!readTime) {
    return nothing;
  }
  return html`<span className="read-time"
    >${context.l10n.raw({
      id: "blog_time_to_read",
      args: { minutes: readTime },
    })}
  </span>`;
}

/**
 *
 * @param {{metadata?: AuthorMetadata }} param0
 * @returns
 */
export function Author({ metadata }) {
  return MaybeLink({
    link: metadata?.link,
    className: "author",
    children: html`<img
        src=${metadata?.avatar_url ?? "/assets/avatar.png"}
        alt="Author avatar"
      />
      ${metadata?.name || "The MDN Team"} `,
  });
}

/**
 *
 * @param root0
 * @param root0.metadata
 * @param {Fred.Context} context
 * @returns
 */
export function AuthorDateReadTime(context, { metadata }) {
  return html`
    <div className="date-author">
      ${Author(metadata)} ${PublishDate(metadata)}
      ${TimeToRead(context, metadata)}
    </div>
  `;
}
