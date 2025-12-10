import { html } from "@lit-labs/ssr";

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
      <div class="layout__2-sidebars generic-layout">
        <aside class="layout__right-sidebar generic-layout__toc">
          ${GenericToc.render(context)}
        </aside>
        <div class="layout__content generic-layout__content">
          ${GenericContent.render(context)}
        </div>
        <aside
          class="layout__left-sidebar generic-layout__sidebar"
          id="main-sidebar"
        >
          ${GenericSidebar.render(context)}
        </aside>
      </div>
    `;
  }
}
