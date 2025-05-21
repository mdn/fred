import { html } from "lit";

import { PageLayout } from "../page-layout/server.js";
import { Section } from "../section/server.js";
import { ServerComponent } from "../server/index.js";

export class Generic extends ServerComponent {
  /**
   * @param {import("types/fred.js").Context<import("types/rari.js").GenericPage>} context
   */
  render(context) {
    return PageLayout.render(
      context,
      html`
        ${context.hyData.sections.map((section) =>
          Section.render(context, section),
        )}
      `,
    );
  }
}
