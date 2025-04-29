import { html } from "lit";

import { Section } from "../content/server.js";
import { ServerComponent } from "../server/index.js";

export class GenericContent extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.GenericPage>} context
   * @returns {Lit.TemplateResult}
   */
  render(context) {
    return html`<div class="content">
      ${context.hyData.sections.map((section) => Section(context, section))}
    </div>`;
  }
}
