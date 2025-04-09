import { html, nothing } from "lit";

/**
 *
 * @param {Fred.Context} _context
 * @param {Lit.TemplateResult} content
 * @returns {Lit.TemplateResult}
 */
export function BlogContainer(_context, content) {
  return html`<div className="page-layout__blog-container">${content}</div>`;
}

/**
 *
 * @param {Fred.Context} _context
 * @param {object} params
 * @param {string | null | undefined} params.link
 * @param {Lit.TemplateResult} params.content
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
 * @param {Fred.Context} _context
 * @param {object} params
 * @param {string | undefined} params.date
 * @returns {Lit.TemplateResult | nothing}
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
 * @param {Fred.Context} context
 * @param {object} params
 * @param {Rari.BlogMeta} params.blogMeta
 * @returns {Lit.TemplateResult | nothing}
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
 * @param {Fred.Context} context
 * @param {object} params
 * @param {Rari.BlogMeta} params.blogMeta
 * @returns {Lit.TemplateResult | nothing}
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
