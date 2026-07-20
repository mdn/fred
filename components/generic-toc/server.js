import { html } from "@lit-labs/ssr";
import { nothing } from "lit";

import { ServerComponent } from "../server/index.js";

export class GenericToc extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").GenericPage>} context
   */
  render(context) {
    if (context.hyData.toc.length === 0) return nothing;

    let styleVariant = "default";
    if (context.path.startsWith("/en-US/observatory/docs")) {
      styleVariant = "observatory";
    } else if (context.path.startsWith("/en-US/plus/docs")) {
      styleVariant = "plus";
    }

    return html`<nav class="generic-toc generic-toc--${styleVariant}">
      <h2 class="generic-toc__header">
        ${context.l10n("generic-toc__header")`In this article`}
      </h2>
      <ul class="generic-toc__list">
        ${context.hyData.toc.map(
          ({ id, text }) =>
            html`<li class="generic-toc__item">
              <a
                class="generic-toc__link"
                href="#${id}"
                data-glean-id="toc_click: #${id}"
                >${text}</a
              >
            </li>`,
        )}
      </ul>
    </nav>`;
  }
}
