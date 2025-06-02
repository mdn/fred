import { html } from "lit";

import { nothing } from "lit";

import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { renderTopicIcon, topic2css } from "../curriculum/utils.js";
import { HeadingAnchor } from "../heading-anchor/server.js";
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
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} _context
   * @param {import("@rari").CurriculumDoc} doc
   * @returns {import("lit").TemplateResult | import("lit").nothing}
   */
  renderPrevNext(_context, doc) {
    const { prev, next } = doc.prevNext || {};

    if (!prev && !next) return nothing;

    return html`
      <section class="curriculum-prev-next">
        ${prev
          ? html`
              <a href=${prev.url} class="button button-primary">
                <span class="button-icon curriculum-prev"></span>
                Previous: ${prev.title}
              </a>
            `
          : nothing}
        ${next
          ? html`
              <a href=${next.url} class="button button-primary">
                Next: ${next.title}
                <span class="button-icon curriculum-next"></span>
              </a>
            `
          : nothing}
      </section>
    `;
  }

  toggleSidebar() {
    // TODO: Implement sidebar toggle logic
    console.log("Sidebar toggled");
  }

  /**
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} _context
   * @param {import("@rari").CurriculumDoc} doc
   * @returns {import("lit").TemplateResult | import("lit").nothing}
   */
  renderSidebar(_context, doc) {
    if (!doc.sidebar) return nothing;

    return html`
      <div class="sidebar-container">
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
                                open=${entry.children.some(
                                  (c) => c.url === doc.mdn_url,
                                ) || entry.url === doc.mdn_url}
                              >
                                <summary>${entry.title}</summary>
                                <ol>
                                  <li>
                                    ${this.renderSidebarLink(
                                      _context,
                                      doc.mdn_url,
                                      entry.url,
                                      `${entry.title.replace(/ modules$/, "")} overview`,
                                    )}
                                  </li>
                                  ${entry.children.map(
                                    (subEntry) => html`
                                      <li>
                                        ${this.renderSidebarLink(
                                          _context,
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
                              _context,
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
        <div class="toc-container">
          <aside class="toc">
            <nav></nav>
          </aside>
          <mdn-placement-sidebar></mdn-placement-sidebar>
        </div>
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
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} _context
   * @param {import("@rari").Section} section - The section object containing about data.
   * @returns {import("@lit").TemplateResult | nothing} The Lit HTML template for the about section.
   */
  renderSection(_context, section) {
    const { id, title, content, isH3 } = section.value;
    switch (section.type) {
      case "browser_compatibility": {
        return nothing;
      }
      case "specifications": {
        return nothing;
      }
      default: {
        const level = isH3 ? 3 : 2;
        return html`
          <section aria-labelledby=${ifDefined(id ?? undefined)}>
            ${HeadingAnchor.render(
              level,
              id ? String(id) : null,
              String(title),
            )}
            <div class="section-content">${unsafeHTML(content)}</div>
          </section>
        `;
      }
    }
  }
}
