import { html } from "lit";

import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class SiteSearch extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   */
  render(context) {
    return PageLayout.render(
      context,
      html`<div class="site-search">
        <mdn-site-search></mdn-site-search>
      </div>`,
    );
  }
}
