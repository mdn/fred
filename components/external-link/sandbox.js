import { html } from "lit";

import { SandboxComponent } from "../sandbox/class.js";

export class ExternalLinkSandbox extends SandboxComponent {
  render() {
    return html`<a class="external" href="https://example.com"
      >example link</a
    >`;
  }
}
