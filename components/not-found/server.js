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
      html` <h1>${context.l10n`Page not found`}</h1> `,
    );
  }
}
