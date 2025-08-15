import { html } from "lit";

import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class Playground extends ServerComponent {
  /** @param {import("@fred").Context} context  */
  render(context) {
    return PageLayout.render(
      context,
      html`
        <main class="playground">
          <mdn-playground></mdn-playground>
          <mdn-placement-sidebar></mdn-placement-sidebar>
        </main>
      `,
    );
  }
}
