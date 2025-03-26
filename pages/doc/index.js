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
export function DocBody(context) {
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

/**
 * @param {Fred.Context<Rari.DocPage>} context
 */
export function Doc(context) {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>MDN</title>
        <link rel="stylesheet" href="/components/index.css" />
        <script type="module" src="/components/dropdown/index.js"></script>
      </head>
      <body class="page-layout">
        <header class="page-layout__header">
          ${Navigation(context)} ${BreadCrumbs(context)}
        </header>
        <div class="page-layout__main">${ReferenceLayout(context)}</div>
        <div class="page-layout__footer">${Footer(context)}</div>
      </body>
    </html>
  `;
}
