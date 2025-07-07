import { html } from "lit";

import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { ServerComponent } from "../server/index.js";

export class ReferenceToc extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").DocPage>} context
   */
  render(context) {
    return html`<nav class="reference-toc">
      <h2>${context.l10n("reference-toc-header")`In this article`}</h2>
      <ul>
        ${context?.doc?.toc?.map(
          ({ id, text }) =>
            html`<li><a href="#${id}">${unsafeHTML(text)}</a></li>`,
        )}
      </ul>
    </nav>`;
  }
}
