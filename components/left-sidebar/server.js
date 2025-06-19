import { html, nothing } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { ServerComponent } from "../server/index.js";

export class LeftSidebar extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").DocPage>} context
   */
  render(context) {
    const content = context?.doc?.sidebarHTML;

    if (!content) {
      return nothing;
    }

    return html`<nav class="left-sidebar">
      <div class="left-sidebar__header">
        <mdn-sidebar-filter></mdn-sidebar-filter>
      </div>
      <div class="left-sidebar__content">${unsafeHTML(content)}</div>
    </nav>`;
  }
}
