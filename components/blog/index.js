import { html, nothing } from "lit";

/**
 *
 * @param {import("@fred").Context} _context
 * @param {import("@lit").TemplateResult} content
 * @returns {import("@lit").TemplateResult}
 */
export function BlogContainer(_context, content) {
  return html`<div class="page-layout__blog-container">${content}</div>`;
}

/**
 *
 * @param {import("@fred").Context} _context
 * @param {object} params
 * @param {string} [params.className]
 * @param {string | null | undefined} params.link
 * @param {import("@lit").TemplateResult} params.content
 * @returns
 */
export function MaybeLink(_context, { className = "", link, content }) {
  return link
    ? link.startsWith("https://")
      ? html` <a href=${link} class="external" target="_blank" rel="noreferrer">
          ${content}
        </a>`
      : html`<a href=${link} class=${className}> ${content} </a>`
    : html`<span class=${className}>${content}</span>`;
}

/**
 *
 * @param {import("@fred").Context} _context
 * @param {object} params
 * @param {string | undefined} params.date
 * @returns {import("@lit").TemplateResult | nothing}
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
 * @param {import("@fred").Context} context
 * @param {object} params
 * @param {number} params.readTime
 * @returns {import("@lit").TemplateResult | nothing}
 */
export function TimeToRead(context, { readTime }) {
  if (!readTime) {
    return nothing;
  }
  return html`<span class="read-time"
    >${context.l10n.raw({
      id: "blog-time-to-read",
      args: { minutes: readTime },
    })}
  </span>`;
}

/**
 *
 * @param {import("@fred").Context} context
 * @param {object} params
 * @param {import("@rari").BlogMeta} params.blogMeta
 * @returns {import("@lit").TemplateResult | nothing}
 */
export function Author(context, { blogMeta }) {
  const author = blogMeta.author;
  if (!author) {
    return nothing;
  }
  return MaybeLink(context, {
    link: author.link,
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
 * @param {import("@fred").Context} context
 * @param {object} params
 * @param {import("@rari").BlogMeta} params.blogMeta
 * @returns {import("@lit").TemplateResult | nothing}
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
