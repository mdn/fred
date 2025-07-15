import { html } from "lit";

import { ArticleFooter } from "../article-footer/server.js";
import { BaselineIndicator } from "../baseline-indicator/server.js";
import { ContentSection } from "../content-section/server.js";
import { LeftSidebar } from "../left-sidebar/server.js";
import { ReferenceToc } from "../reference-toc/server.js";
import { ServerComponent } from "../server/index.js";
import { TranslationBanner } from "../translation-banner/server.js";

export class ReferenceLayout extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").DocPage>} context
   */
  render(context) {
    const { doc } = context;
    const [description, ...sections] = doc.body.map((section) =>
      ContentSection.render(context, section),
    );

    return html`
      <div class="reference-layout">
        <main id="content" class="reference-layout__content">
          <div class="reference-layout__content__header">
            ${TranslationBanner.render(context)}
            <h1>${wbrIfy(doc.title)}</h1>
            ${BaselineIndicator.render(context)} ${description}
          </div>
          <aside class="reference-layout__toc">
            ${ReferenceToc.render(context)}
            <mdn-placement-sidebar></mdn-placement-sidebar>
          </aside>
          <div class="reference-layout__content__body">
            <mdn-survey></mdn-survey>
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

/**
 * Insert <wbr>s to wrap code-like strings in a pretty way
 * NB: don't use in client side code because we use lookbehind assertions
 * which aren't baseline green (yet)
 * @param {string} text
 */
function wbrIfy(text) {
  return text
    .split(
      /(?=\.)|(?<=[a-z])(?=[A-Z0-9])|(?<=[A-Z])(?=[A-Z][a-z])|(?<=[A-Z])(?=[0-9])/,
    )
    .flatMap((part, i) => (i ? [html`<wbr />`, part] : part));
}
