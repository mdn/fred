import { html } from "@lit-labs/ssr";
import { nothing } from "lit";

import { WRITER_MODE } from "../env/index.js";
import { Logo } from "../logo/server.js";
import { Menu } from "../menu/server.js";

import { ServerComponent } from "../server/index.js";

export class Navigation extends ServerComponent {
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
      <nav class="navigation" data-scheme=${colorScheme} data-open="false">
        <div class="navigation__logo">${Logo.render(context)}</div>
        <div class="navigation__search" data-view="mobile">
          <mdn-search-button></mdn-search-button>
        </div>
        <button
          class="navigation__button"
          type="button"
          aria-expanded="false"
          aria-controls="navigation__popup"
          aria-label=${context.l10n`Toggle navigation`}
        ></button>
        <div class="navigation__popup" id="navigation__popup">
          <div class="navigation__menu">${Menu.render(context)}</div>
          <div class="navigation__search" data-view="desktop">
            <mdn-search-button></mdn-search-button>
          </div>
          ${WRITER_MODE
            ? nothing
            : html`<mdn-user-menu locale=${context.locale}></mdn-user-menu>`}
        </div>
      </nav>
      <mdn-search-modal id="search"></mdn-search-modal>
    `;
  }
}
