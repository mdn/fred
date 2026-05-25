import { html } from "@lit-labs/ssr";
import { nothing } from "lit";

import { Button } from "../button/server.js";
import { ServerComponent } from "../server/index.js";

export class WriterToolbar extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").DocPage>} context
   */
  render(context) {
    const prodUrl = new URL(context.url, "https://developer.mozilla.org");
    const { folder, filename } = context.doc.source;

    return html`<div class="writer-toolbar">
      ${Button.render(context, {
        label: context.l10n("writer-toolbar-view-on-mdn")`View on MDN`,
        href: prodUrl.toString(),
        variant: "plain",
      })}
      ${context.localServer
        ? html`
            <mdn-writer-open-editor
              filepath=${`${folder}/${filename}`}
            ></mdn-writer-open-editor>
            <mdn-writer-reload></mdn-writer-reload>
            <mdn-record-visit
              page-title=${context.doc.title}
            ></mdn-record-visit>
          `
        : nothing}
    </div>`;
  }
}
