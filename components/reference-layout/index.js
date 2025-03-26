import { html } from "lit";

import { Content } from "../content/index.js";
import { LeftSidebar } from "../left-sidebar/index.js";
import { ReferenceToc } from "../reference-toc/index.js";

import "./index.css";
import "../definition-list/index.css";
import "../formal-definition/index.css";
import "../formal-syntax/index.css";

/**
 * @param {Fred.Context<Rari.DocPage>} context
 */
export function ReferenceLayout(context) {
  return html`
    <div class="reference-layout">
      <div class="reference-layout__sidebar">${LeftSidebar(context)}</div>
      <div class="reference-layout__content">${Content(context)}</div>
      <div class="reference-layout__toc">${ReferenceToc(context)}</div>
    </div>
  `;
}
