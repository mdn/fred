import { html, nothing } from "lit";

import { ServerComponent } from "../server/index.js";

export class Breadcrumbs extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   */
  render(context) {
    let parents;
    if (
      [
        "Doc",
        "CurriculumModule",
        "CurriculumLanding",
        "CurriculumOverview",
        "CurriculumAbout",
        "CurriculumDefault",
      ].includes(context.renderer)
    ) {
      // @ts-expect-error
      parents = context.doc.parents;
    } else if (
      [
        "GenericDoc",
        "SpaObservatoryLanding",
        "SpaObservatoryAnalyze",
        "GenericAbout",
        "GenericCommunity",
      ].includes(context.renderer)
    ) {
      // @ts-expect-error
      parents = context.parents;
    } else {
      return nothing;
    }

    return html`
      <ul class="breadcrumbs">
        ${parents.map(
          // @ts-expect-error
          ({ uri, title }) => html`
            <li>
              <a href=${uri}>${title}</a>
            </li>
          `,
        )}
      </ul>
    `;
  }
}
