import { html } from "lit";

import { ContentSection } from "../content-section/server.js";
import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class Generic extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").GenericPage>} context
   */
  render(context) {
    return PageLayout.render(
      context,
      html`
        ${context.hyData.sections.map((section) =>
          ContentSection.render(context, section),
        )}
      `,
    );
  }
}
