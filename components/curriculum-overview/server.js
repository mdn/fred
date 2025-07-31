import { html, nothing } from "lit";

import { Button } from "../button/server.js";
import NextIcon from "../curriculum/assets/curriculum-next.svg?lit";
import PrevIcon from "../curriculum/assets/curriculum-prev.svg?lit";
import {
  addAttrs,
  renderCurriculumBody,
  renderModulesList,
  renderSidebar,
  renderToc,
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
        <div class="curriculum-layout curriculum-content-container">
          <main
            id="content"
            class="curriculum-layout__content curriculum-content-container curriculum-overview topic-${topicCssClass}"
            lang=${doc.locale}
          >
            <header class="curriculum-layout__header curriculum-content">
              <h1><span>${coloredTitle}</span> ${restTitle}</h1>
            </header>

            <aside class="curriculum-layout__toc">
              ${toc}
              <mdn-placement-sidebar></mdn-placement-sidebar>
            </aside>

            <div class="curriculum-layout__body curriculum-content">
              ${renderCurriculumBody(context, doc)}
              ${doc?.modules && doc.modules.length > 0
                ? html`
                    <section class="module-contents">
                      <h2>Module list</h2>
                      ${renderModulesList(context, doc.modules)}
                    </section>
                  `
                : nothing}
              ${this.renderPrevNext(context, doc)}
            </div>
          </main>

          <aside class="curriculum-layout__sidebar" id="main-sidebar">
            ${sidebar}
          </aside>
        </div>
      `,

      // html`
      //   <main
      //     id="content"
      //     class="curriculum-content-container container curriculum-overview topic-${topicCssClass}"
      //   >
      //     ${sidebar}
      //     <article id="content" class="curriculum-content" lang=${doc.locale}>
      //       <header>
      //         <h1><span>${coloredTitle}</span> ${restTitle}</h1>
      //       </header>
      //       ${renderCurriculumBody(context, doc)}
      //       ${doc?.modules && doc.modules.length > 0
      //         ? html`
      //             <section class="module-contents">
      //               <h2>Module list</h2>
      //               ${renderModulesList(context, doc.modules)}
      //             </section>
      //           `
      //         : nothing}
      //       ${this.renderPrevNext(context, doc)}
      //     </article>
      //     <div class="toc-container">
      //       <aside class="toc">
      //         <nav>${toc}</nav>
      //       </aside>
      //       <mdn-placement-sidebar></mdn-placement-sidebar>
      //     </div>
      //   </main>
      // `,
    );
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
