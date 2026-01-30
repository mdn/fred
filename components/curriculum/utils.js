import { nothing } from "lit";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import practicesSVG from "../curriculum/assets/curriculum-topic-practices.svg?lit";
import scriptingSVG from "../curriculum/assets/curriculum-topic-scripting.svg?lit";
import standardsSVG from "../curriculum/assets/curriculum-topic-standards.svg?lit";
import stylingSVG from "../curriculum/assets/curriculum-topic-styling.svg?lit";
import toolingSVG from "../curriculum/assets/curriculum-topic-tooling.svg?lit";
import { HeadingAnchor } from "../heading-anchor/server.js";

/** @enum {string} */
const Topic = {
  WebStandards: "Web Standards & Semantics",
  Styling: "Styling",
  Scripting: "Scripting",
  BestPractices: "Best Practices",
  Tooling: "Tooling",
  None: "",
};

/**
 * Maps a topic enum value to a CSS class name.
 * @param {Topic | undefined} topic
 * @returns {string} The corresponding CSS class name.
 */
export function topic2css(topic) {
  switch (topic) {
    case Topic.WebStandards:
      return "standards";
    case Topic.Styling:
      return "styling";
    case Topic.Scripting:
      return "scripting";
    case Topic.Tooling:
      return "tooling";
    case Topic.BestPractices:
      return "practices";
    default:
      return "none";
  }
}

/**
 * @param {import("@fred").Context<import("@rari").CurriculumPage>} _context
 * @param {string} topic - The topic string.
 * @returns {import("@lit").TemplateResult | nothing} The Lit HTML template for the topic icon SVG.
 */
export function renderTopicIcon(_context, topic) {
  const className = `topic-icon topic-${topic2css(topic)}`;
  // Simplified placeholder SVG content, using currentColor for fill where CSS vars apply.
  switch (topic) {
    case "Web Standards & Semantics":
      return addAttrs(standardsSVG, {
        role: "none",
        class: className,
      });
    case "Styling":
      return addAttrs(stylingSVG, {
        role: "none",
        class: className,
      });
    case "Scripting":
      return addAttrs(scriptingSVG, {
        role: "none",
        class: className,
      });
    case "Tooling":
      return addAttrs(toolingSVG, {
        role: "none",
        class: className,
      });
    case "Best Practices":
      return addAttrs(practicesSVG, {
        role: "none",
        class: className,
      });
    default:
      return nothing;
  }
}

/**
 *
 * @param {import("@lit").SVGTemplateResult} original
 * @param {{[key: string]: string}} attrs
 * @returns {import("@lit").SVGTemplateResult}
 */

export function addAttrs(original, attrs) {
  // turn { role: 'img', 'aria-label': 'Foo' } into: role="img" aria-label="Foo"
  const attrString = Object.entries(attrs)
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ");
  const [head, ...restStrings] = original.strings;
  if (!head) {
    return original;
  }
  const newHead = head.replace(/<svg([\s\S]*?)>/, `<svg$1 ${attrString}>`);
  const newStrings = [newHead, ...restStrings];
  // @ts-expect-error
  newStrings.raw = [newHead, ...restStrings];
  // @ts-expect-error
  original.strings = newStrings;
  return original;
}

/**
 * @param {import("@fred").Context<import("@rari").CurriculumPage>} context
 * @param {import("@rari").CurriculumDoc} doc
 * @returns {import("lit").TemplateResult | import("lit").nothing}
 */
export function renderSidebar(context, doc) {
  if (!doc.sidebar) return nothing;

  return html`<nav class="left-sidebar">
    <div class="left-sidebar__content">
      <ol>
        ${doc.sidebar.map(
          (entry, _i) => html`
            <li class=${entry.children?.length ? "toggle" : ""}>
              ${entry.children?.length
                ? html`
                    <details
                      ?open=${entry.children.some(
                        (c) => c.url === doc.mdn_url,
                      ) || entry.url === doc.mdn_url}
                    >
                      <summary>${entry.title}</summary>
                      <ol>
                        <li>
                          ${renderSidebarLink(
                            context,
                            doc.mdn_url,
                            entry.url,
                            `${entry.title.replace(/ modules$/, "")} overview`,
                          )}
                        </li>
                        ${entry.children.map(
                          (subEntry) => html`
                            <li>
                              ${renderSidebarLink(
                                context,
                                doc.mdn_url,
                                subEntry.url,
                                subEntry.title,
                              )}
                            </li>
                          `,
                        )}
                      </ol>
                    </details>
                  `
                : renderSidebarLink(
                    context,
                    doc.mdn_url,
                    entry.url,
                    entry.title,
                  )}
            </li>
          `,
        )}
      </ol>
    </div>
  </nav>`;
}

/**
 * Render individual sidebar link
 * @param {import("@fred").Context<import("@rari").CurriculumPage>} _context
 * @param {string} current
 * @param {string} url
 * @param {string} title
 * @returns {import("lit").TemplateResult}
 */
export function renderSidebarLink(_context, current, url, title) {
  const isCurrent = url === current;

  return isCurrent
    ? html`
        <em>
          <a href=${url} aria-current="page">${title}</a>
        </em>
      `
    : html`<a href=${url}>${title}</a>`;
}

/**
 * @param {import("@fred").Context<import("@rari").CurriculumPage>} context
 * @param {import("@rari").TocEntry[]} toc
 * @param {string} [title]
 * @returns {import("lit").TemplateResult | import("lit").nothing}
 */
export function renderToc(context, toc, title) {
  if (!toc || toc.length === 0) return nothing;

  const tocTitle = title;

  return html`
    <div class="document-toc-container">
      <section class="document-toc">
        <header>
          <h2 class="document-toc-heading">${tocTitle}</h2>
        </header>
        <ul class="document-toc-list">
          ${toc.map((item) => renderTocItem(context, item))}
        </ul>
      </section>
    </div>
  `;
}

/**
 * @param {import("@fred").Context<import("@rari").CurriculumPage>} _context
 * @param {import("@rari").TocEntry} item
 * @returns {import("lit").TemplateResult}
 */
export function renderTocItem(_context, item) {
  const href = item.id ? `#${item.id}` : undefined;
  return html`
    <li class="document-toc-item">
      <a class="document-toc-link" href=${ifDefined(href)}
        >${unsafeHTML(item.text)}</a
      >
    </li>
  `;
}

/**
 * Pre-process section content for proper custom element naming.
 * After yari has been sunset, change in generic-content
 * and remove these replacements.
 * @param {string | null | undefined} content
 * @returns {string | null | undefined}
 */
export function replaceCustomElementNames(content) {
  if (!content) return content;
  let ret = content;
  ret = ret.replaceAll("<scrim-inline", "<mdn-scrim-inline");
  ret = ret.replaceAll("</scrim-inline", "</mdn-scrim-inline");

  return ret;
}

/**
 * @param {import("@fred").Context<import("@rari").CurriculumPage>} context
 * @param {import("@rari").CurriculumDoc} doc
 * @returns {import("lit").TemplateResult | import("lit").nothing}
 */
export function renderCurriculumBody(context, doc) {
  if (!doc?.body) return nothing;

  return html` ${doc.body.map((section) => renderSection(context, section))} `;
}

/**
 * @param {import("@fred").Context<import("@rari").CurriculumPage>} _context
 * @param {import("@rari").Section} section - The section object containing about data.
 * @returns {import("@lit").TemplateResult | nothing} The Lit HTML template for the about section.
 */
export function renderSection(_context, section) {
  const { id, title, isH3 } = section.value;
  let { content } = section.value;

  content = replaceCustomElementNames(content);

  switch (section.type) {
    case "browser_compatibility": {
      return nothing;
    }
    case "specifications": {
      return nothing;
    }
    default: {
      const level = isH3 ? 3 : 2;
      if (!id) {
        return html`<div class="section-content">${unsafeHTML(content)}</div>`;
      }

      return html`
        <section aria-labelledby=${ifDefined(id ?? undefined)}>
          ${HeadingAnchor.render(level, id ? String(id) : null, String(title))}
          <div class="section-content">${unsafeHTML(content)}</div>
        </section>
      `;
    }
  }
}

/**
 * Renders a single list of modules.
 * Corresponds to the inner ModulesList component in the React version.
 * @param {import("@fred").Context<import("@rari").CurriculumPage>} context
 * @param {import("@rari").CurriculumIndexEntry[]} modules - Array of module entries within a group.
 * @returns {import("@lit").TemplateResult | import("@lit").nothing} The Lit HTML template for the module list.
 */
export function renderModulesList(context, modules) {
  if (!modules || modules.length === 0) {
    return nothing;
  }
  return html`
    <ol class="modules-list">
      ${modules.map(
        (module) => html`
          <li
            class="module-list-item ${module.topic
              ? `topic-${topic2css(module.topic)}`
              : ""}"
          >
            <a href=${module.url}>
              <header>
                ${module.topic
                  ? renderTopicIcon(context, module.topic)
                  : nothing}
                <span>${module.title}</span>
              </header>
              <section>
                <p>${module.summary}</p>
                <p>${module.topic}</p>
              </section>
            </a>
          </li>
        `,
      )}
    </ol>
  `;
}
