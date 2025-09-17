import { html } from "@lit-labs/ssr";
import { nothing } from "lit";

import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { ServerComponent } from "../server/index.js";

export class ReferenceToc extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").DocPage>} context
   */
  render(context) {
    const toc = context?.doc?.toc;

    if (!toc || toc.length === 0) {
      return nothing;
    }

    return html`<nav class="reference-toc">
      <h2>${context.l10n("reference-toc-header")`In this article`}</h2>
      <ul>
        ${toc?.map(
          ({ id, text }) =>
            html`<li><a href="#${id}">${unsafeHTML(text)}</a></li>`,
        )}
      </ul>
    </nav>`;
  }
}
