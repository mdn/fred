import { html } from "lit";

import { ServerComponent } from "../server/index.js";

export class ReferenceToc extends ServerComponent {
  /**
   * @param {import("types/fred.js").Context<import("types/rari.js").DocPage | import("types/rari.js").BlogPage>} context
   */
  render(context) {
    return html`<nav class="reference-toc">
      <h2>${context.l10n("reference_toc_header")`In this article`}</h2>
      <ul>
        ${context?.doc?.toc?.map(
          ({ id, text }) => html`<li><a href="#${id}">${text}</a></li>`,
        )}
      </ul>
    </nav>`;
  }
}
