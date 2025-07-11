import { html, nothing } from "lit";

import { Breadcrumbs } from "../breadcrumbs/server.js";

import { ServerComponent } from "../server/index.js";

export class BreadcrumbsBar extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   */
  render(context) {
    const colorScheme = ["Homepage", "SpaPlusLanding"].includes(
      context.renderer,
    )
      ? "dark"
      : "";
    const toggleSidebar = ["Doc", "CurriculumModule", "GenericDoc"].includes(
      context.renderer,
    )
      ? html`<mdn-toggle-sidebar></mdn-toggle-sidebar>`
      : nothing;

    return html`
      <div class="breadcrumbs-bar" data-scheme=${colorScheme}>
        ${toggleSidebar} ${Breadcrumbs.render(context)}
        ${context.renderer === "Doc"
          ? html`<mdn-collection-save-button
              doc-url=${context.doc.mdn_url}
              doc-title=${context.doc.title}
            ></mdn-collection-save-button>`
          : nothing}
        <mdn-color-theme></mdn-color-theme>
        ${this._renderLanguageSwitcher(context)}
      </div>
    `;
  }

  /**
   * @param {import("@fred").Context} context
   */
  _renderLanguageSwitcher(context) {
    const other_translations =
      "other_translations" in context
        ? context.other_translations
        : "doc" in context && "other_translations" in context.doc
          ? context.doc.other_translations
          : [];
    const native = other_translations.find(
      (t) => t.locale === context.locale,
    )?.native;

    if (!native) {
      return nothing;
    }

    return html`<mdn-language-switcher
      locale=${context.locale}
      native=${native}
      translations=${JSON.stringify(other_translations)}
      url=${context.url}
    ></mdn-language-switcher>`;
  }
}
