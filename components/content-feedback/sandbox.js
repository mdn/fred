import { html } from "lit";

import { SandboxComponent } from "../sandbox/class.js";

export class ContentFeedbackSandbox extends SandboxComponent {
  render() {
    return html`<mdn-content-feedback></mdn-content-feedback>`;
  }
}
