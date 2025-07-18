import { html } from "lit";

import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { HeadingAnchor } from "../heading-anchor/server.js";
import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

const LABELS = new Set(["good first issue", "accepting PR"]);

export class GenericCommunity extends ServerComponent {
  /**
   *
   * @param {import("@rari").Section} section
   * @param {number} i
   * @returns
   */
  renderSection(section, i) {
    // Pre-process section content for proper custom element naming.
    // After yari has been sunset, change in generic-content
    // and remove these replacements.
    section.value.content = section.value.content?.replaceAll(
      "<contributor-list>",
      "<mdn-contributor-list>",
    );
    section.value.content = section.value.content?.replaceAll(
      "</contributor-list>",
      "</mdn-contributor-list>",
    );

    /** @type {import("@github").Issues} */
    const issues = [];
    if (i === 0) {
      return html`
        <header>
          <section aria-labelledby=${ifDefined(section.value.id ?? undefined)}>
            ${unsafeHTML(section.value.content)}
          </section>
        </header>
      `;
    } else if (section.value.id === "help_us_fix_open_issues") {
      return html`
        <section aria-labelledby=${section.value.id}>
          ${HeadingAnchor.render(
            2,
            section.value.id ? String(section.value.id) : null,
            String(section.value.title),
          )}
          <div class="section-content">
            ${unsafeHTML(section.value.content)}
          </div>
          <mdn-issues-table class="issues-table">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Repository</th>
                </tr>
              </thead>
              <tbody>
                ${issues.map(
                  (issue) => html`
                    <tr>
                      <td>
                        <div>
                          <a
                            href=${issue.html_url}
                            target="_blank"
                            rel="noreferrer"
                            >${issue.title}</a
                          >
                          ${issue.labels
                            .filter((l) => LABELS.has(l.toString()))
                            .map(
                              (l) =>
                                html`<span class="label"
                                  >${l.toString()}</span
                                >`,
                            )}
                        </div>
                      </td>
                      <td>
                        <a
                          href=${issue.repository_url.replace(
                            "https://api.github.com/repos/",
                            "https://github.com/",
                          )}
                          target="_blank"
                          rel="noreferrer"
                        >
                          ${issue.repository_url.replace(
                            "https://api.github.com/repos/",
                            "",
                          )}
                        </a>
                      </td>
                    </tr>
                  `,
                )}
              </tbody>
            </table>
          </mdn-issues-table>
        </section>
      `;
    }
    // Default: render prose
    return html`
      <section aria-labelledby=${ifDefined(section.value.id ?? undefined)}>
        ${HeadingAnchor.render(
          2,
          section.value.id ? String(section.value.id) : null,
          String(section.value.title),
        )}
        <div class="section-content">${unsafeHTML(section.value.content)}</div>
      </section>
    `;
  }

  /**
   * @param {import("@fred").Context<import("@rari").GenericPage>} context
   */
  render(context) {
    const doc = context.hyData;

    return PageLayout.render(
      context,
      html`<main id="content" class="community-container">
        ${doc?.sections?.map(this.renderSection)}
      </main>`,
    );
  }
}
