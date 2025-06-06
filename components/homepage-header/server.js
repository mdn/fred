import { html } from "lit";

import { HomepageHero } from "../homepage-hero/server.js";
import { Mandala } from "../mandala/server.js";
import { ServerComponent } from "../server/index.js";

export class HomepageHeader extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").HomePage>} context
   */
  render(context) {
    return html`<div class="homepage-header">
      <section class="homepage-header__copy">
        ${HomepageHero.render(context)}
      </section>
      <section class="homepage-header__search">
        <mdn-homepage-search></mdn-homepage-search>
      </section>
      <section class="homepage-header__mandala">${Mandala.render()}</section>
    </div>`;
  }
}
