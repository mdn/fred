import { html } from "lit";

import { A11yMenu } from "../a11y-menu/server.js";
import { Breadcrumbs } from "../breadcrumbs/server.js";
import { Footer } from "../footer/server.js";
import { Navigation } from "../navigation/server.js";
import { ServerComponent } from "../server/index.js";

export class PageLayout extends ServerComponent {
  /**
   * @param {Fred.Context} context
   * @param {Lit.TemplateResult | string} child
   */
  render(context, child) {
    return html`
      <body class="page-layout">
        ${A11yMenu.render(context)}
        <div class="page-layout__banner">
          <mdn-placement-top></mdn-placement-top>
        </div>
        <header class="page-layout__header">
          ${Navigation.render(context)} ${Breadcrumbs.render(context)}
        </header>
        <div class="page-layout__main">${child}</div>
        <div class="page-layout__footer">${Footer.render(context)}</div>
      </body>
    `;
  }
}
