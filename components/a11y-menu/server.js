import { html } from "lit";

import { ServerComponent } from "../server/index.js";

export class A11yMenu extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.BuiltPage>} context
   */
  render(context) {
    // TODO Implement "Skip to search"
    return html`<ul class="a11y-menu">
      <li><a href="#content">${context.l10n`Skip to main content`}</a></li>
    </ul>`;
  }
}
