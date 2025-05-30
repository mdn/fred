import { html, nothing } from "lit";

import { Breadcrumbs } from "../breadcrumbs/server.js";
import bookmarkSvg from "../icon/bookmark.svg?lit";

import { ServerComponent } from "../server/index.js";

export class BreadcrumbsBar extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   */
  render(context) {
    const colorScheme = context.renderer === "Homepage" ? "dark" : "";
    const toggleSidebar =
      context.renderer === "Doc"
        ? html`<mdn-toggle-sidebar></mdn-toggle-sidebar>`
        : nothing;

    return html`
      <div class="breadcrumbs-bar" data-scheme=${colorScheme}>
        ${toggleSidebar} ${Breadcrumbs.render(context)}
        <mdn-color-theme></mdn-color-theme>
        <button
          class="breadcrumbs-bar__component"
          title=${context.l10n`Save in Collection`}
        >
          ${bookmarkSvg} <span>${context.l10n`Save`}</span>
        </button>
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
