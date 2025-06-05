import { html, nothing } from "lit";

import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { html as hh, unsafeStatic } from "lit/static-html.js";

import { renderSidebar, renderToc, topic2css } from "../curriculum/utils.js";
import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class CurriculumAbout extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} context
   */
  render(context) {
    const doc = context.doc;
    const titleParts = doc?.title?.split(" ") || [];
    const [coloredTitle, ...restTitle] = titleParts;
    const topicCssClass = doc.topic ? topic2css(doc.topic) : "";

    const sidebar = renderSidebar(context, doc);
    const toc =
      doc.toc && doc.toc.length > 0
        ? renderToc(context, doc.toc, "In this module")
        : nothing;

    return PageLayout.render(
      context,
      html`
        <main
          id="content"
          class="curriculum-content-container container with-sidebar main-wrapper curriculum-about curriculum-module topic-${topicCssClass}"
        >
          ${sidebar}
          <article id="content" class="curriculum-content" lang=${doc.locale}>
            <header>
              <h1><span>${coloredTitle}</span> ${restTitle.join(" ")}</h1>
            </header>
            ${this.renderCurriculumBody(context, doc)}
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
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} context
   * @param {import("@rari").CurriculumDoc} doc
   * @returns {import("lit").TemplateResult | import("lit").nothing}
   */
  renderCurriculumBody(context, doc) {
    if (!doc?.body) return nothing;

    return html`
      ${doc.body.map((section) => this.renderSection(context, section))}
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

        const heading = hh`<${unsafeStatic("h" + level)} id=${ifDefined(id)}><a class="heading-anchor" href="#${id}">${title}</a></${unsafeStatic("h" + level)}>`;

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
