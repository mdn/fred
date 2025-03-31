/** @import { AuthorMetadata, BlogPostMetadata } from "../types" */

function MaybeLink({ className = "", link, children }) {
  return link
    ? link.startsWith("https://")
      ? html`<a
          href="${link}"
          className="external ${className}"
          target="_blank"
          rel="noreferrer"
        >
          ${children}
        </a>`
      : html`<a href="${link}" className="${className}"> ${children} </a>`
    : html`<span className="${className}">${children}</span>`;
}

/**
 * @param {{readtime?: string}}
 * @returns
 */
export function TimeToRead({ readTime }) {
  if (!readTime) {
    return null;
  }
  return html`<span className="read-time">${readTime} minute read</span>`;
}

/**
 * @param {{date?: string}}
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
        src="${metadata?.avatar_url ?? "/assets/avatar.png"}"
        alt="Author avatar"
      />
      ${metadata?.name || "The MDN Team"} `,
  });
}

/**
 *
 * @param {{ metadata: BlogPostMetadata}}
 * @returns
 */
export function AuthorDateReadTime({ metadata }) {
  return (
    <div className="date-author">
      ${Author(metadata)}
      <Author metadata={metadata.author} />
      <PublishDate date={metadata.date} />
      <TimeToRead readTime={metadata.readTime} />
    </div>
  );
}
