import { html } from "lit";

import { PageLayout } from "../page-layout/index.js";
import { ServerComponent } from "../server.js";

export class NotFound extends ServerComponent {
  /**
   * @param {Fred.Context} context
   */
  render(context) {
    return PageLayout.render(
      context,
      html` <h1>${context.l10n`Page not found`}</h1> `,
    );
  }
}
