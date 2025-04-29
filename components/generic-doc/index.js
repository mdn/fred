import { html } from "lit";

import { Section } from "../content/index.js";
import { PageLayout } from "../page-layout/index.js";
import { ServerComponent } from "../server.js";

export class GenericDoc extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.GenericPage>} context
   */
  render(context) {
    return PageLayout.render(
      context,
      html`
        ${context.hyData.sections.map((section) => Section(context, section))}
      `,
    );
  }
}
