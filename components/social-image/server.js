import { html } from "@lit-labs/ssr";

import { Logo } from "../logo/server.js";
import { ServerComponent } from "../server/index.js";

export class SocialImage extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   */
  render(context) {
    return html` <div class="social-image">${Logo.render(context)}</div> `;
  }
}
