import { html } from "lit";

import { ServerComponent } from "../server/index.js";

export class GenericToc extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").GenericPage>} context
   */
  render(context) {
    return html`<nav class="generic-toc">
      <h2>${context.l10n("generic_toc_header")`In this article`}</h2>
      <ul>
        ${context.hyData.toc.map(
          ({ id, text }) => html`<li><a href="#${id}">${text}</a></li>`,
        )}
      </ul>
    </nav>`;
  }
}
