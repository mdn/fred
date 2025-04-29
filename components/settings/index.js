import { html } from "lit";

import { Breadcrumbs } from "../../components/breadcrumbs/index.js";
import { Footer } from "../../components/footer/index.js";
import { Navigation } from "../../components/navigation/index.js";
import { ServerComponent } from "../server/index.js";

export class Settings extends ServerComponent {
  /**
   * @param {Fred.Context} context
   */
  render(context) {
    return html`
      <body class="page-layout">
        <header class="page-layout__header">
          ${Navigation.render(context)} ${Breadcrumbs.render(context)}
        </header>
        <div class="page-layout__main" id="root"></div>
        <div class="page-layout__footer">${Footer.render(context)}</div>
      </body>
    `;
  }
}
