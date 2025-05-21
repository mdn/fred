import { html } from "lit";

import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class Playground extends ServerComponent {
  /** @param {import("types/fred.js").Context} context  */
  render(context) {
    return PageLayout.render(
      context,
      html`
        <main class="playground">
          <mdn-playground></mdn-playground>
        </main>
      `,
    );
  }
}
