import { html, nothing } from "lit";

import { ServerComponent } from "../server/index.js";

export class Breadcrumbs extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   */
  render(context) {
    if (
      !["Doc", "CurriculumModule", "CurriculumLanding"].includes(
        context.renderer,
      )
    ) {
      return nothing;
    }

    return html`
      <ul class="breadcrumbs">
        ${
          // @ts-expect-error
          context.doc.parents.map(
            // @ts-expect-error
            ({ uri, title }) => html`
              <li>
                <a href=${uri}>${title}</a>
              </li>
            `,
          )
        }
      </ul>
    `;
  }
}
