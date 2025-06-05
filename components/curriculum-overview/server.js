import { html, nothing } from "lit";

import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { html as hh, unsafeStatic } from "lit/static-html.js";

import { Button } from "../button/server.js";
import NextIcon from "../curriculum/assets/curriculum-next.svg?lit";
import PrevIcon from "../curriculum/assets/curriculum-prev.svg?lit";
import {
  addAttrs,
  renderSidebar,
  renderToc,
  renderTopicIcon,
  topic2css,
} from "../curriculum/utils.js";
import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class CurriculumOverview extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} context
   */
  render(context) {
    const doc = context.doc;
    const titleParts = doc?.title?.split(" ") || [];
    const coloredTitle = titleParts.slice(0, -1).join(" ");
    const restTitle = titleParts.at(-1);
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
          class="curriculum-content-container container curriculum-overview topic-${topicCssClass}"
        >
          ${sidebar}
          <article id="content" class="curriculum-content" lang=${doc.locale}>
            <header>
              <h1><span>${coloredTitle}</span> ${restTitle}</h1>
            </header>
            ${this.renderCurriculumBody(context, doc)}
            ${doc?.modules && doc.modules.length > 0
              ? html`
                  <section class="module-contents">
                    <h2>Module list</h2>
                    ${this.renderModulesList(context, doc.modules)}
                  </section>
                `
              : nothing}
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

  /**
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} context
   * @param {import("@rari").CurriculumIndexEntry[]} modules
   * @returns {import("lit").TemplateResult | import("lit").nothing}
   */
  renderModulesList(context, modules) {
    if (!modules || modules.length === 0) {
      return nothing;
    }
    return html`
      <ol class="modules-list">
        ${modules.map(
          (module, j) => html`
            <li
              key="ml-${j}"
              class="module-list-item topic-${topic2css(module.topic)}"
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
}
