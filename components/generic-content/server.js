import { html } from "lit";

import { Section } from "../section/server.js";
import { ServerComponent } from "../server/index.js";

export class GenericContent extends ServerComponent {
  /**
   * @param {import("types/fred.js").Context<import("types/rari.js").GenericPage>} context
   * @returns {import("types/lit.js").TemplateResult}
   */
  render(context) {
    return html`<div id="content" class="content">
      ${context.hyData.sections.map((section) =>
        Section.render(context, section),
      )}
    </div>`;
  }
}
