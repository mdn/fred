import { html } from "lit-html";
import { Navigation } from "../../components/navigation/index.js";
import { BreadCrumbs } from "../../components/breadcrumbs/index.js";
import { Footer } from "../../components/footer/index.js";

import "./index.css";
import "../../components/index.css";
import { Landing } from "../../observatory/landing/index.js";
import { Results } from "../../observatory/results/index.js";

export function ObservatoryBody(context) {
  return html`
    <body class="page-layout">
      <header class="page-layout__header">
        ${Navigation(context)} ${BreadCrumbs(context)}
      </header>
      <div class="page-layout__main">${Landing(context)}</div>
      <div class="page-layout__footer">${Footer(context)}</div>
    </body>
  `;
}
export function ObservatoryResults(context) {
  return html`
    <body class="page-layout">
      <header class="page-layout__header">
        ${Navigation(context)} ${BreadCrumbs(context)}
      </header>
      <div class="page-layout__main">${Results(context)}</div>
      <div class="page-layout__footer">${Footer(context)}</div>
    </body>
  `;
}
