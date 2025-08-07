import { html, nothing } from "lit";

import { Breadcrumbs } from "../breadcrumbs/server.js";

import { GenericSidebar } from "../generic-sidebar/server.js";
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
    return html`
      <div class="breadcrumbs-bar" data-scheme=${colorScheme}>
        ${this._renderToggleSidebar(context)} ${Breadcrumbs.render(context)}
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
  _renderToggleSidebar(context) {
    const sidebar = Boolean(
      (() => {
        switch (context.renderer) {
          case "Doc":
            return context.doc.sidebarHTML;
          case "CurriculumModule":
          case "CurriculumAbout":
          case "CurriculumDefault":
          case "CurriculumOverview":
            return context.doc.sidebar;
          case "GenericDoc":
            return GenericSidebar.sidebarName(context);
          default:
            return;
        }
      })(),
    );
    return sidebar ? html`<mdn-toggle-sidebar></mdn-toggle-sidebar>` : nothing;
  }

  /**
   * @param {import("@fred").Context} context
   */
  _renderLanguageSwitcher(context) {
    const translations =
      "other_translations" in context
        ? context.other_translations
        : "doc" in context && "other_translations" in context.doc
          ? context.doc.other_translations
          : [];
    const native = translations.find(
      (t) => t.locale === context.locale,
    )?.native;

    if (!native) {
      return nothing;
    }

    const notFound = context.renderer === "SpaNotFound";

    return html`<mdn-language-switcher
      locale=${context.locale}
      native=${native}
      translations=${JSON.stringify(translations)}
      url=${notFound ? context.path : context.url}
      ?not-found=${notFound}
    ></mdn-language-switcher>`;
  }
}
