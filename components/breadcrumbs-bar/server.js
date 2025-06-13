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
    const toggleSidebar = ["Doc", "CurriculumModule"].includes(context.renderer)
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
        ${"doc" in context
          ? html`<mdn-language-switcher
              locale=${context.locale}
              native=${context.doc.native}
              translations=${JSON.stringify(
                "other_translations" in context.doc
                  ? context.doc.other_translations
                  : [],
              )}
              url=${context.url}
            ></mdn-language-switcher>`
          : nothing}
      </div>
    `;
  }
}
