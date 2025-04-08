import { html } from "lit";

import { Section } from "../../components/content/index.js";
import { PageLayout } from "../../components/page-layout/index.js";

/**
 * @param {Fred.Context<Rari.CurriculumPage>} context
 */
export function Curriculum(context) {
  return PageLayout(
    context,
    html`
      <h1>${context.doc.title}</h1>
      ${context.doc.body.map((section) => Section(context, section))}
    `,
  );
}
