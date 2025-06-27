import { html } from "lit";

import { GenericContent } from "../generic-content/server.js";
import { GenericSidebar } from "../generic-sidebar/server.js";
import { GenericToc } from "../generic-toc/server.js";
import { ServerComponent } from "../server/index.js";

export class GenericLayout extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").GenericPage>} context
   */
  render(context) {
    return html`
      <div class="generic-layout">
        <aside class="generic-layout__toc">${GenericToc.render(context)}</aside>
        <div class="generic-layout__content">
          ${GenericContent.render(context)}
        </div>
        <aside class="generic-layout__sidebar" id="main-sidebar">
          ${GenericSidebar.render(context)}
        </aside>
      </div>
    `;
  }
}
