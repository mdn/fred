import { html } from "lit";

import "./index.css";

import { Banner } from "../banner/index.js";
import { BreadCrumbs } from "../breadcrumbs/index.js";
import { Footer } from "../footer/index.js";
import { Navigation } from "../navigation/index.js";

/**
 * @param {Fred.Context} context
 * @param {Lit.TemplateResult | string} child
 */
export function PageLayout(context, child) {
  return html`
    <body class="page-layout">
      <div class="page-layout__banner">${Banner()}</div>
      <header class="page-layout__header">
        ${Navigation(context)} ${BreadCrumbs(context)}
      </header>
      <div class="page-layout__main">${child}</div>
      <div class="page-layout__footer">${Footer(context)}</div>
    </body>
  `;
}
