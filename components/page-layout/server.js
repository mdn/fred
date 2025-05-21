import { html } from "lit";

import { A11yMenu } from "../a11y-menu/server.js";
import { BreadcrumbsBar } from "../breadcrumbs-bar/server.js";
import { Footer } from "../footer/server.js";
import { Navigation } from "../navigation/server.js";
import { ServerComponent } from "../server/index.js";

export class PageLayout extends ServerComponent {
  /**
   * @param {import("types/fred.js").Context} context
   * @param {import("types/lit.js").TemplateResult | string | import("types/lit.js").nothing} child
   */
  render(context, child) {
    return html`
      <body class="page-layout">
        ${A11yMenu.render(context)}
        <div class="page-layout__banner">
          <mdn-placement-top></mdn-placement-top>
        </div>
        <header class="page-layout__header">
          ${Navigation.render(context)} ${BreadcrumbsBar.render(context)}
        </header>
        <div class="page-layout__main">${child}</div>
        <div class="page-layout__footer">${Footer.render(context)}</div>
      </body>
    `;
  }
}
