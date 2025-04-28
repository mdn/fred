import { html, nothing } from "lit";

import bookmarkSvg from "../icon/bookmark.svg?lit";

import { ServerComponent } from "../server.js";

import dividerSvg from "./divider.svg?lit";

export class Breadcrumbs extends ServerComponent {
  /**
   * @param {Fred.Context} context
   */
  render(context) {
    const isDoc = context.renderer === "Doc";
    const colorScheme = context.renderer === "Homepage" ? "dark" : "";

    const path = isDoc
      ? html`
          <ul class="breadcrumbs__path">
            ${context.doc.parents.map(
              ({ uri, title }, index) => html`
                <li>
                  ${index > 0 ? dividerSvg : nothing}
                  <a href=${uri}>${title}</a>
                </li>
              `,
            )}
          </ul>
        `
      : nothing;

    return html`
      <div class="breadcrumbs" data-scheme=${colorScheme}>
        ${path}
        <mdn-color-theme></mdn-color-theme>
        <button class="breadcrumbs__component">${bookmarkSvg} Save</button>
        <mdn-language-switcher
          locale=${context.locale}
          translations=${JSON.stringify(
            "doc" in context && "other_translations" in context.doc
              ? context.doc.other_translations
              : [],
          )}
          url=${context.url}
        ></mdn-language-switcher>
      </div>
    `;
  }
}
