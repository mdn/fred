import { html } from "lit";

import { ServerComponent } from "../server/index.js";

export class GenericToc extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").GenericPage>} context
   */
  render(context) {
    return html`<nav class="generic-toc">
      <h2>${context.l10n("generic-toc__header")`In this article`}</h2>
      <ul class="generic-toc__list">
        ${context.hyData.toc.map(
          ({ id, text }) =>
            html`<li class="generic-toc__item">
              <a class="generic-toc__link" href="#${id}">${text}</a>
            </li>`,
        )}
      </ul>
    </nav>`;
  }
}
