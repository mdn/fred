import { html } from "@lit-labs/ssr";

import { ServerComponent } from "../server/index.js";

export class Banner extends ServerComponent {
  render() {
    return html`<div class="banner">Banner</div>`;
  }
}
