import { html } from "lit";

import { Banner } from "../banner/index.js";
import { Breadcrumbs } from "../breadcrumbs/index.js";
import { Footer } from "../footer/index.js";
import { Navigation } from "../navigation/index.js";
import { ServerComponent } from "../server/index.js";

export class PageLayout extends ServerComponent {
  /**
   * @param {Fred.Context} context
   * @param {Lit.TemplateResult | string | import("lit").nothing} child
   */
  render(context, child) {
    return html`
      <body class="page-layout">
        <div class="page-layout__banner">${Banner.render()}</div>
        <header class="page-layout__header">
          ${Navigation.render(context)} ${Breadcrumbs.render(context)}
        </header>
        <div class="page-layout__main">${child}</div>
        <div class="page-layout__footer">${Footer.render(context)}</div>
      </body>
    `;
  }
}
