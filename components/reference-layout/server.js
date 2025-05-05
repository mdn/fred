import { html } from "lit";

import { Content } from "../content/server.js";
import { LeftSidebar } from "../left-sidebar/server.js";
import { ReferenceToc } from "../reference-toc/server.js";
import { ServerComponent } from "../server/index.js";

export class ReferenceLayout extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.DocPage>} context
   */
  render(context) {
    return html`
      <div class="reference-layout">
        <div class="reference-layout__content">${Content.render(context)}</div>
        <aside class="reference-layout__sidebar">
          ${LeftSidebar.render(context)}
        </aside>
        <aside class="reference-layout__toc">
          ${ReferenceToc.render(context)}
        </aside>
      </div>
    `;
  }
}
