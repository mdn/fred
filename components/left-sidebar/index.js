import { html } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import "./index.css";

/**
 * @param {Fred.Context<Rari.DocPage>} context
 */
export function LeftSidebar(context) {
  return html`<nav class="left-sidebar">
    ${unsafeHTML(context?.doc?.sidebarHTML)}
  </nav>`;
}
