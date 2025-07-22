import { html } from "lit";

import { Button } from "../button/server.js";
import { ServerComponent } from "../server/index.js";

export class WriterToolbar extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").DocPage>} context
   */
  render(context) {
    const prodUrl = new URL(context.url, "https://developer.mozilla.org");

    return html`<div class="writer-toolbar">
      ${Button.render(context, {
        label: context.l10n`View on MDN`,
        href: prodUrl.toString(),
        variant: "plain",
      })}
    </div>`;
  }
}
