import { html, nothing } from "lit";

import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { html as hh, unsafeStatic } from "lit/static-html.js";

import { Button } from "../button/server.js";
import NextIcon from "../curriculum/assets/curriculum-next.svg?lit";
import PrevIcon from "../curriculum/assets/curriculum-prev.svg?lit";
import { addAttrs, renderTopicIcon, topic2css } from "../curriculum/utils.js";
import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class CurriculumModule extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} context
   */
  render(context) {
    const withSidebar = true;
    const doc = context.doc;
    const topicCssClass = doc.topic ? topic2css(doc.topic) : "";

    const sidebar = withSidebar ? this.renderSidebar(context, doc) : nothing;
    const toc =
      doc.toc && doc.toc.length > 0
        ? this.renderToc(context, doc.toc, "In this module")
        : nothing;

    return PageLayout.render(
      context,
      html`
        <main
          id="content"
          class="curriculum-content-container container ${withSidebar
            ? "with-sidebar main-wrapper"
            : ""} curriculum-module topic-${topicCssClass}"
        >
          ${sidebar}
          <article id="content" class="curriculum-content" lang=${doc.locale}>
            <header>
              ${doc?.topic ? renderTopicIcon(context, doc.topic) : nothing}
              <h1>${doc?.title}</h1>
              ${doc?.topic
                ? html`<p class="module-topic">${doc.topic}</p>`
                : nothing}
              ${doc?.group
                ? html`<p class="module-group">${doc.group}</p>`
                : nothing}
            </header>
            ${this.renderCurriculumBody(context, doc)}
            ${this.renderPrevNext(context, doc)}
          </article>
          <div class="toc-container">
            <aside class="toc">
              <nav>${toc}</nav>
            </aside>
            <mdn-placement-sidebar></mdn-placement-sidebar>
          </div>
        </main>
      `,
    );
  }

  /**
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} _context
   * @param {import("@rari").CurriculumDoc} doc
   * @returns {import("lit").TemplateResult | import("lit").nothing}
   */
  renderCurriculumBody(_context, doc) {
    if (!doc?.body) return nothing;

    return html`
      ${doc.body.map((section) => this.renderSection(_context, section))}
    `;
  }

  /**
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} context
   * @param {import("@rari").CurriculumDoc} doc
   * @returns {import("lit").TemplateResult | import("lit").nothing}
   */
  renderPrevNext(context, doc) {
    const { prev, next } = doc.prevNext || {};

    if (!prev && !next) return nothing;

    return html`
      <section class="curriculum-prev-next">
        ${prev
          ? Button.render(context, {
              label: `Previous: ${prev.title}`,
              icon: addAttrs(PrevIcon, { width: "16px", height: "16px" }),
              href: prev.url,
            })
          : nothing}
        ${next
          ? Button.render(context, {
              label: `Next: ${next.title}`,
              icon: addAttrs(NextIcon, { width: "16px", height: "16px" }),
              href: next.url,
            })
          : nothing}
      </section>
    `;
  }

  /**
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} context
   * @param {import("@rari").CurriculumDoc} doc
   * @returns {import("lit").TemplateResult | import("lit").nothing}
   */
  renderSidebar(context, doc) {
    if (!doc.sidebar) return nothing;

    return html`
      <div class="sidebar-container" id="main-sidebar">
        <aside id="sidebar-quicklinks" class="sidebar">
          <nav class="sidebar-inner" aria-label="Related Topics">
            <div class="sidebar-inner-nav">
              <aside class="curriculum-sidebar" data-current=${doc.mdn_url}>
                <ol>
                  ${doc.sidebar.map(
                    (entry, _i) => html`
                      <li class=${entry.children?.length ? "toggle" : ""}>
                        ${entry.children?.length
                          ? html`
                              <details
                                open=${ifDefined(
                                  entry.children.some(
                                    (c) => c.url === doc.mdn_url,
                                  ) ||
                                    entry.url === doc.mdn_url ||
                                    undefined,
                                )}
                              >
                                <summary>${entry.title}</summary>
                                <ol>
                                  <li>
                                    ${this.renderSidebarLink(
                                      context,
                                      doc.mdn_url,
                                      entry.url,
                                      `${entry.title.replace(/ modules$/, "")} overview`,
                                    )}
                                  </li>
                                  ${entry.children.map(
                                    (subEntry) => html`
                                      <li>
                                        ${this.renderSidebarLink(
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
                          : this.renderSidebarLink(
                              context,
                              doc.mdn_url,
                              entry.url,
                              entry.title,
                            )}
                      </li>
                    `,
                  )}
                </ol>
              </aside>
            </div>
          </nav>
        </aside>
      </div>
    `;
  }

  /**
   * Render individual sidebar link
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} _context
   * @param {string} current
   * @param {string} url
   * @param {string} title
   * @returns {import("lit").TemplateResult}
   */
  renderSidebarLink(_context, current, url, title) {
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
  renderToc(context, toc, title) {
    if (!toc || toc.length === 0) return nothing;

    const tocTitle = title;

    return html`
      <div class="document-toc-container">
        <section class="document-toc">
          <header>
            <h2 class="document-toc-heading">${tocTitle}</h2>
          </header>
          <ul class="document-toc-list">
            ${toc.map((item) => this.renderTocItem(context, item))}
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
  renderTocItem(_context, item) {
    const href = item.id ? `#${item.id.toLowerCase()}` : undefined;
    return html`
      <li class="document-toc-item">
        <a class="document-toc-link" href=${ifDefined(href)}
          >${unsafeHTML(item.text)}</a
        >
      </li>
    `;
  }

  /**
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} _context
   * @param {import("@rari").Section} section - The section object containing about data.
   * @returns {import("@lit").TemplateResult | nothing} The Lit HTML template for the about section.
   */
  renderSection(_context, section) {
    const { id, title, isH3 } = section.value;
    let { content } = section.value;

    // Pre-process section content for proper custom element naming.
    // After yari has been sunset, change in generic-content
    // and remove these replacements.
    content = content?.replaceAll("<scrim-inline", "<mdn-scrim-inline");
    content = content?.replaceAll("</scrim-inline", "</mdn-scrim-inline");

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
          return html`<div className="section-content">
            ${unsafeHTML(content)}
          </div>`;
        }

        const heading = hh`
          <${unsafeStatic("h" + level)} id=${ifDefined(id)}>
            <a class="heading-anchor" href="#${id}">
              ${title}
            </a>
            </${unsafeStatic("h" + level)}>`;

        return html`
          <section aria-labelledby=${ifDefined(id ?? undefined)}>
            ${heading}
            <div class="section-content">${unsafeHTML(content)}</div>
          </section>
        `;
      }
    }
  }
}
