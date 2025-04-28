import { html } from "lit";

import { Section } from "../../components/content/index.js";
import { PageLayout } from "../../components/page-layout/index.js";
import { ServerComponent } from "../../components/server.js";

export class Curriculum extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.CurriculumPage>} context
   */
  render(context) {
    return PageLayout.render(
      context,
      html`
        <h1>${context.doc.title}</h1>
        ${context.doc.body.map((section) => Section(context, section))}
      `,
    );
  }
}
