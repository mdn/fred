import { html } from "lit";

import { ServerComponent } from "../server/index.js";

export class ReferenceToc extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.DocPage | Rari.BlogPage>} context
   */
  render(context) {
    return html`<div class="reference-toc">
      <h2>${context.l10n("reference_toc_header")`In this article`}</h2>
      <ul>
        ${context?.doc?.toc?.map(
          ({ id, text }) => html`<li><a href="#${id}">${text}</a></li>`,
        )}
      </ul>
    </div>`;
  }
}
