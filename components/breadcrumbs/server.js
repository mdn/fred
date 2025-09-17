import { html, nothing } from "lit";

import { ServerComponent } from "../server/index.js";

export class Breadcrumbs extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   */
  render(context) {
    let parents;
    if ("doc" in context && "parents" in context.doc) {
      parents = context.doc.parents;
    } else if ("parents" in context) {
      parents = context.parents;
    }
    if (!parents) {
      return nothing;
    }

    return html`
      <ol
        class="breadcrumbs"
        vocab="https://schema.org/"
        typeof="BreadcrumbList"
      >
        ${parents.map(
          ({ uri, title }, index) => html`
            <li property="itemListElement" typeof="ListItem">
              <a href=${uri} property="item" typeof="WebPage"
                ><span property="name">${title}</span></a
              >
              <meta property="position" content=${index + 1} />
            </li>
          `,
        )}
      </ol>
    `;
  }
}
