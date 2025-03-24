import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import "./index.css";

/**
 * @param {Fred.Context<Rari.DocPage>} context
 */
export function LeftSidebar(context) {
  return html`<nav class="left-sidebar">
    ${unsafeHTML(context?.doc?.sidebarHTML)}
  </nav>`;
}
