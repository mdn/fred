import { html } from "lit";

import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class NotFound extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   */
  render(context) {
    return PageLayout.render(
      context,
      html`<main id="content" class="not-found">
        <h1>${context.l10n("not_found_title")}</h1>
        <mdn-not-found></mdn-not-found>
        <p>
          <a href="/">${context.l10n("not_found_back")}</a>
        </p>
      </main>`,
    );
  }
}
