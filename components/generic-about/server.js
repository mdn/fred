import { html, nothing } from "lit";

import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { Section } from "../content/server.js";
import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

/**
 * @typedef {import("@mdn/rari").Section} Section
 * @typedef {Section & { H3s?: Section[] }} AboutSection
 */

export class GenericAbout extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.GenericPage>} context
   */
  render(context) {
    const doc = context.hyData;

    console.log("GenericAbout", doc.sections);

    // Process sections to group H3s under their preceding H2

    const originalSections = doc?.sections || [];
    /** @type {AboutSection[]} */
    const sections = [];
    for (const section of originalSections) {
      if (section.value.isH3) {
        // Get the last section added (should be the preceding H2)
        const lastSection = sections.at(-1);
        if (lastSection) {
          if (!lastSection.H3s) {
            lastSection.H3s = [];
          }
          lastSection.H3s.push(section);
        }
      } else {
        /** @type {AboutSection} */
        const newSection = { ...section };
        sections.push(newSection);
      }
    }

    const bodyContent = sections.map((section, i) => {
      // Render Header Section (First section)
      if (i === 0) {
        return section.value.content
          ? html`<header>
              <section>${unsafeHTML(section.value.content)}</section>
            </header>`
          : nothing;
      } else if (section.H3s) {
        const { id, title, content } = section.value;
        const h3s = section.H3s || [];
        // Static rendering defaults to the first tab being active
        // const defaultActiveTab = 0;

        return id && content
          ? html`<section aria-labelledby=${id} data-interactive-tabs>
              <h2 id=${id}>${title}</h2>
              <div class="section-content">${unsafeHTML(content)}</div>
              ${h3s.length > 0
                ? html`
                    <mdn-about-tabs>
                      ${h3s.map(({ value: h3Value }, _idx) =>
                        h3Value.id && h3Value.content
                          ? html`
                              <a
                                slot="tab"
                                href="#${h3Value.id}"
                                data-panel-id=${h3Value.id}
                              >
                                ${h3Value.title}
                              </a>
                            `
                          : nothing,
                      )}
                      ${h3s.map(({ value: h3Value }, _idx) =>
                        h3Value.id && h3Value.content
                          ? html`
                              <div slot="panel" id=${h3Value.id}>
                                ${unsafeHTML(h3Value.content)}
                              </div>
                            `
                          : nothing,
                      )}
                    </mdn-about-tabs>
                  `
                : nothing}
            </section>`
          : nothing;
      } else {
        // Render other sections (like Prose)
        // Basic rendering for other sections, assuming they have content
        return section.type === "prose"
          ? Section(context, { type: section.type, value: section.value })
          : nothing;
      }
    });

    const h = html`
      <main id="content" class="about-container">${bodyContent}</main>
    `;
    return PageLayout.render(context, h);
  }
}

// ? html`<div class="tabs">
//     <div class="tablist-wrapper">
//       <div class="tablist" role="tablist">
//         ${h3s.map(({ value: h3Value }, tabIndex) =>
//           h3Value.id && h3Value.content
//             ? html`
//                 <a
//                   key=${h3Value.id}
//                   id=${`${h3Value.id}-tab`}
//                   href=${`#${h3Value.id}`}
//                   class=${tabIndex === defaultActiveTab
//                     ? "active"
//                     : ""}
//                   role="tab"
//                   aria-selected=${tabIndex === defaultActiveTab
//                     ? "true"
//                     : "false"}
//                   aria-controls=${`${h3Value.id}-panel`}
//                   data-tab-index=${tabIndex}
//                 >
//                   ${h3Value.title}
//                 </a>
//               `
//             : nothing,
//         )}
//       </div>
//     </div>
//     ${h3s.map(({ value: h3Value }, tabIndex) =>
//       h3Value.id && h3Value.content
//         ? html`<div
//             key=${h3Value.id}
//             id=${`${h3Value.id}-panel`}
//             class="tabpanel ${tabIndex === defaultActiveTab
//               ? "active"
//               : ""}"
//             role="tabpanel"
//             aria-labelledby=${`${h3Value.id}-tab`}
//           >
//             ${unsafeHTML(h3Value.content)}
//           </div> `
//         : nothing,
//     )}
//   </div> `
