import { html } from "lit";

import { Section } from "../../components/content/index.js";
import { PageLayout } from "../../components/page-layout/index.js";
import { ServerComponent } from "../server.js";

export class Generic extends ServerComponent {
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
