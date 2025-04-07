import { html } from "lit";

import { Section } from "../../components/content/index.js";
import { PageLayout } from "../../components/page-layout/index.js";

/**
 * @param {Fred.Context<Rari.GenericPage>} context
 */
export function Generic(context) {
  return PageLayout(
    context,
    html`
      ${context.hyData.sections.map((section) => Section(context, section))}
    `,
  );
}
