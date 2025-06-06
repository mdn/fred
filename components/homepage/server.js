import { html } from "lit";

import { HomepageBody } from "../homepage-body/server.js";
import { HomepageHeader } from "../homepage-header/server.js";
import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class Homepage extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").HomePage>} context
   */
  render(context) {
    return PageLayout.render(
      context,
      html`
        <div class="homepage homepage--dark">
          ${HomepageHeader.render(context)}
        </div>
        <div class="homepage">
          <mdn-placement-hp-main></mdn-placement-hp-main>
          ${HomepageBody.render(context)}
        </div>
      `,
    );
  }
}
