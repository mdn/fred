// @ts-nocheck
import { html } from "lit";

/** @import { AuthorMetadata, BlogPostMetadata } from "../types" */

function MaybeLink({ className = "", link, children }) {
  return link
    ? link.startsWith("https://")
      ? html`<a
          href=${link}
          className="external ${className}"
          target="_blank"
          rel="noreferrer"
        >
          ${children}
        </a>`
      : html`<a href=${link} className=${className}> ${children} </a>`
    : html`<span className=${className}>${children}</span>`;
}

/**
 * @param root0
 * @param root0.readTime
 * @returns
 */
export function TimeToRead({ readTime }) {
  if (!readTime) {
    return;
  }
  return html`<span className="read-time">${readTime} minute read</span>`;
}

/**
 * @param root0
 * @param root0.date
 * @returns
 */
export function PublishDate({ date }) {
  return html`<time className="date" suppressHydrationWarning>
    ${Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(
      new Date(date),
    )}
  </time>`;
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
 * @returns
 */
export function AuthorDateReadTime({ metadata }) {
  return html`
    <div className="date-author">
      ${Author(metadata)} ${PublishDate(metadata)} ${TimeToRead(metadata)}
    </div>
  `;
}
