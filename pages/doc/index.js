import { html } from "lit";

import { BreadCrumbs } from "../../components/breadcrumbs/index.js";
import { Footer } from "../../components/footer/index.js";
import { Navigation } from "../../components/navigation/index.js";
import { ReferenceLayout } from "../../components/reference-layout/index.js";

import "./index.css";
import "../../components/index.css";

/**
 * @param {Fred.Context<Rari.DocPage>} context
 */
export function Doc(context) {
  return html`
    <body class="page-layout">
      <header class="page-layout__header">
        ${Navigation(context)} ${BreadCrumbs(context)}
      </header>
      <div class="page-layout__main">${ReferenceLayout(context)}</div>
      <div class="page-layout__footer">${Footer(context)}</div>
    </body>
  `;
}
