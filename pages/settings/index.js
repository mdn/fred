// @ts-nocheck
import { html } from "lit";
import { Navigation } from "../../components/navigation/index.js";
import { BreadCrumbs } from "../../components/breadcrumbs/index.js";
import { Footer } from "../../components/footer/index.js";

import "./index.css";
import "../../components/index.css";

/**
 * @param {Fred.Context} context
 */
export function SettingsBody(context) {
  return html`
    <body class="page-layout">
      <header class="page-layout__header">
        ${Navigation(context)} ${BreadCrumbs(context)}
      </header>
      <div class="page-layout__main" id="root"></div>
      <div class="page-layout__footer">${Footer(context)}</div>
    </body>
  `;
}
