import { html } from "@lit-labs/ssr";

import { HomepageContributorSpotlight } from "../homepage-contributor-spotlight/server.js";
import { ServerComponent } from "../server/index.js";

export class HomepageFooter extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").HomePage>} context
   */
  render(context) {
    return html`<div class="homepage-footer">
      ${HomepageContributorSpotlight.render(context)}
    </div>`;
  }
}
