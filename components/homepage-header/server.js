import { html } from "@lit-labs/ssr";

import { HomepageHero } from "../homepage-hero/server.js";
import { Mandala } from "../mandala/server.js";
import { ServerComponent } from "../server/index.js";

export class HomepageHeader extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").HomePage>} context
   */
  render(context) {
    return html`
      <div class="homepage-header">
        <div class="homepage-header__copy">${HomepageHero.render(context)}</div>
        <div class="homepage-header__search">
          <mdn-homepage-search></mdn-homepage-search>
        </div>
        <div class="homepage-header__mandala">${Mandala.render()}</div>
      </div>
    `;
  }
}
