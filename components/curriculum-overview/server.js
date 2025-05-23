import { html } from "lit";

import { PageLayout } from "../page-layout/server.js";
import { Section } from "../section/server.js";
import { ServerComponent } from "../server/index.js";

export class CurriculumOverview extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} context
   */
  render(context) {
    return PageLayout.render(
      context,
      html`
        <h1>OVERVIEW ${context.doc.title}</h1>
        ${context.doc.body.map((section) => Section.render(context, section))}
      `,
    );
  }
}
