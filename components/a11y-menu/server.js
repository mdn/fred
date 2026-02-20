import { html } from "@lit-labs/ssr";

import { ServerComponent } from "../server/index.js";

export class A11yMenu extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").BuiltPage>} context
   */
  render(context) {
    return html`<ul class="a11y-menu">
      <li>
        <a href="#content" data-glean-id="a11y_menu: click #content"
          >${context.l10n`Skip to main content`}</a
        >
      </li>
      <li>
        <a href="#search" data-glean-id="a11y_menu: click #search"
          >${context.l10n`Skip to search`}</a
        >
      </li>
    </ul>`;
  }
}
