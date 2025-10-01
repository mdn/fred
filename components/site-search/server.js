import { html } from "@lit-labs/ssr";

import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class SiteSearch extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   */
  render(context) {
    return PageLayout.render(
      context,
      html`<div id="content" class="site-search">
        <h1 class="visually-hidden">${context.l10n`Search`}</h1>
        <mdn-site-search></mdn-site-search>
      </div>`,
    );
  }
}
