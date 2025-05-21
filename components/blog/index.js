import { html, nothing } from "lit";

/**
 *
 * @param {import("types/fred.js").Context} _context
 * @param {import("types/lit.js").TemplateResult} content
 * @returns {import("types/lit.js").TemplateResult}
 */
export function BlogContainer(_context, content) {
  return html`<div className="page-layout__blog-container">${content}</div>`;
}

/**
 *
 * @param {import("types/fred.js").Context} _context
 * @param {object} params
 * @param {string | null | undefined} params.link
 * @param {import("types/lit.js").TemplateResult} params.content
 * @returns
 */
export function MaybeLink(_context, { link, content }) {
  return link
    ? link.startsWith("https://")
      ? html` <a
          href=${link}
          className="external"
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
 * @param {import("types/fred.js").Context} _context
 * @param {object} params
 * @param {string | undefined} params.date
 * @returns {import("types/lit.js").TemplateResult | nothing}
 */
export function PublishDate(_context, { date }) {
  if (!date) {
    return nothing;
  }
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
 * @param {import("types/fred.js").Context} context
 * @param {object} params
 * @param {number} params.readTime
 * @returns {import("types/lit.js").TemplateResult | nothing}
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
 * @param {import("types/fred.js").Context} context
 * @param {object} params
 * @param {import("types/rari.js").BlogMeta} params.blogMeta
 * @returns {import("types/lit.js").TemplateResult | nothing}
 */
export function Author(context, { blogMeta }) {
  const author = blogMeta.author;
  if (!author) {
    return nothing;
  }
  return MaybeLink(context, {
    link: author.link,
    // @ts-expect-error
    className: "author",
    content: html`<img
        src=${author.avatar_url ?? "/assets/avatar.png"}
        alt="Author avatar"
      />
      ${author.name || "The MDN Team"} `,
  });
}

/**
 *
 * @param {import("types/fred.js").Context} context
 * @param {object} params
 * @param {import("types/rari.js").BlogMeta} params.blogMeta
 * @returns {import("types/lit.js").TemplateResult | nothing}
 */
export function AuthorDateReadTime(context, { blogMeta }) {
  if (!blogMeta.author) {
    return nothing;
  }

  return html`
    ${Author(context, { blogMeta })}
    ${
      // @ts-expect-error
      PublishDate(context, { date: blogMeta.published })
    }
    ${TimeToRead(context, { readTime: blogMeta.readTime })}
  `;
}
