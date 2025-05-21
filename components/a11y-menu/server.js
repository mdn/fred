import { html } from "lit";

import { ServerComponent } from "../server/index.js";

export class A11yMenu extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").BuiltPage>} context
   */
  render(context) {
    return html`<ul class="a11y-menu">
      <li><a href="#content">${context.l10n`Skip to main content`}</a></li>
      <li><a href="#search">${context.l10n`Skip to search`}</a></li>
    </ul>`;
  }
}
