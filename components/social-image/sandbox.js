/* eslint-disable lit/prefer-static-styles */
import { html } from "@lit-labs/ssr";

import { SandboxComponent } from "../sandbox/class.js";

import { SocialImage } from "./server.js";

export class SocialImageSandbox extends SandboxComponent {
  render() {
    // @ts-expect-error Can't provide context in sandbox yet
    // but we don't need it for a static image
    const image = SocialImage.render({});

    return html`
      <style>
        .social-image:nth-of-type(2) {
          --social-image-size: 1024px;
        }
      </style>
      144px: ${image} 1024px: ${image}
    `;
  }
}
