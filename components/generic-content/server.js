import { html } from "lit";

import { ContentSection } from "../content-section/server.js";
import { ServerComponent } from "../server/index.js";

export class GenericContent extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").GenericPage>} context
   * @returns {import("@lit").TemplateResult}
   */
  render(context) {
    return html`<div id="content" class="content">
      ${context.hyData.sections.map((section) =>
        ContentSection.render(context, section),
      )}
    </div>`;
  }
}
