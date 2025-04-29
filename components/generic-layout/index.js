import { html } from "lit";

import { Content } from "../content/index.js";
import { LeftSidebar } from "../left-sidebar/index.js";
import { ReferenceToc } from "../reference-toc/index.js";
import { ServerComponent } from "../server.js";

export class GenericLayout extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.DocPage>} context
   */
  render(context) {
    return html`
      <div class="reference-layout">
        <div class="reference-layout__sidebar">
          ${LeftSidebar.render(context)}
        </div>
        <div class="reference-layout__content">${Content.render(context)}</div>
        <div class="reference-layout__toc">${ReferenceToc.render(context)}</div>
      </div>
    `;
  }
}
