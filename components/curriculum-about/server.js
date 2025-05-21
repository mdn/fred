import { html } from "lit";

import { PageLayout } from "../page-layout/server.js";
import { Section } from "../section/server.js";
import { ServerComponent } from "../server/index.js";

export class CurriculumAbout extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.CurriculumPage>} context
   */
  render(context) {
    return PageLayout.render(
      context,
      html`
        <h1>${context.doc.title}</h1>
        ${context.doc.body.map((section) => Section.render(context, section))}
      `,
    );
  }
}
