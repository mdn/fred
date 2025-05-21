import { html } from "lit";

import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class Settings extends ServerComponent {
  static legacy = true;

  /**
   * @param {import("types/fred.js").Context} context
   */
  render(context) {
    return PageLayout.render(context, html`<div id="root"></div>`);
  }
}
