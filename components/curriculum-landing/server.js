import { html } from "lit";

import { Section } from "../content/server.js";
import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class CurriculumLanding extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.CurriculumPage>} context
   */
  render(context) {
    console.log(context);
    return PageLayout.render(
      context,
      html`
        <h1>LANDING ${context.doc.title}</h1>
        ${context.doc.body.map((section) => Section(context, section))}
      `,
    );
  }
}
