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
        <aside class="reference-layout__toc">
          <div class="reference-layout__toc-inner">
            ${ReferenceToc.render(context)}
            <mdn-placement-sidebar></mdn-placement-sidebar>
          </div>
        </aside>
        <div class="reference-layout__content">${Content.render(context)}</div>
        <aside class="reference-layout__sidebar">
          ${LeftSidebar.render(context)}
        </aside>
      </div>
    `;
  }
}
