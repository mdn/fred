import { html } from "lit";

import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class Plus extends ServerComponent {
  static legacy = true;

  /**
   * @param {import("@fred").Context} context
   */
  render(context) {
    return PageLayout.render(context, html`<div id="root"></div>`);
  }
}
