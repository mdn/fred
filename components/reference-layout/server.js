import { html } from "@lit-labs/ssr";
import { nothing } from "lit";

import { ArticleFooter } from "../article-footer/server.js";
import { BaselineIndicator } from "../baseline-indicator/server.js";
import { ContentSection } from "../content-section/server.js";
import { WRITER_MODE } from "../env/index.js";
import { LeftSidebar } from "../left-sidebar/server.js";
import { ReferenceToc } from "../reference-toc/server.js";
import { ServerComponent } from "../server/index.js";
import { TranslationBanner } from "../translation-banner/server.js";
import { WriterToolbar } from "../writer-toolbar/server.js";

export class ReferenceLayout extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").DocPage>} context
   */
  render(context) {
    const { doc } = context;
    const [description, ...sections] =
      doc.body?.map((section) => ContentSection.render(context, section)) || [];

    return html`
      <div class="reference-layout">
        <main id="content" class="reference-layout__content">
          <div class="reference-layout__header">
            ${WRITER_MODE ? WriterToolbar.render(context) : nothing}
            ${TranslationBanner.render(context)}
            <mdn-survey></mdn-survey>
            <h1>${doc.title}</h1>
            ${BaselineIndicator.render(context)} ${description}
          </div>
          <aside class="reference-layout__toc">
            ${ReferenceToc.render(context)}
            <mdn-placement-sidebar></mdn-placement-sidebar>
          </aside>
          <div class="reference-layout__body">
            ${sections} ${ArticleFooter.render(context)}
          </div>
        </main>
        <aside class="reference-layout__sidebar" id="main-sidebar">
          ${LeftSidebar.render(context)}
        </aside>
      </div>
    `;
  }
}
