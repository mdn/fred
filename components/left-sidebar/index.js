import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { ServerComponent } from "../server/index.js";

export class LeftSidebar extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.DocPage>} context
   */
  render(context) {
    return html`<nav class="left-sidebar">
      <mdn-sidebar-filter></mdn-sidebar-filter>
      <section class="left-sidebar--content">
        ${unsafeHTML(context?.doc?.sidebarHTML)}
      </section>
    </nav>`;
  }
}
