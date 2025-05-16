import { html } from "lit";

import { Section } from "../section/server.js";
import { ServerComponent } from "../server/index.js";

export class GenericContent extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.GenericPage>} context
   * @returns {Lit.TemplateResult}
   */
  render(context) {
    return html`<div id="content" class="content">
      ${context.hyData.sections.map((section) =>
        Section.render(context, section),
      )}
    </div>`;
  }
}
