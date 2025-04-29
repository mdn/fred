import { html } from "lit";

import { GenericContent } from "../generic-content/index.js";
import { GenericSidebar } from "../generic-sidebar/index.js";
import { GenericToc } from "../generic-toc/index.js";
import { ServerComponent } from "../server.js";

export class GenericLayout extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.GenericPage>} context
   */
  render(context) {
    return html`
      <div class="generic-layout">
        <div class="generic-layout__sidebar">
          ${GenericSidebar.render(context)}
        </div>
        <div class="generic-layout__content">
          ${GenericContent.render(context)}
        </div>
        <div class="generic-layout__toc">${GenericToc.render(context)}</div>
      </div>
    `;
  }
}
