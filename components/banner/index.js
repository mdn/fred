import { html } from "lit";

import { ServerComponent } from "../server.js";

export class Banner extends ServerComponent {
  render() {
    return html`<div class="banner">Banner</div>`;
  }
}
