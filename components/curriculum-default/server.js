import { html } from "@lit-labs/ssr";
import { nothing } from "lit";

import {
  renderCurriculumBody,
  renderSidebar,
  renderToc,
  topic2css,
} from "../curriculum/utils.js";
import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class CurriculumDefault extends ServerComponent {
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
        <div class="curriculum-layout curriculum-content-container">
          <main
            id="content"
            class="curriculum-layout__content curriculum-content-container curriculum-default curriculum-about curriculum-module topic-${topicCssClass}"
            lang=${doc.locale}
          >
            <header class="curriculum-layout__header curriculum-content">
              <h1><span>${coloredTitle}</span> ${restTitle.join(" ")}</h1>
            </header>
            <aside class="curriculum-layout__toc">
              ${toc}
              <mdn-placement-sidebar></mdn-placement-sidebar>
            </aside>
            <div class="curriculum-layout__body curriculum-content">
              ${renderCurriculumBody(context, doc)}
            </div>
          </main>
          <aside class="curriculum-layout__sidebar" id="main-sidebar">
            ${sidebar}
          </aside>
        </div>
      `,
    );
  }
}
