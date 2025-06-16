import { html } from "lit";

import icon from "../icon/thumbs-up.svg?lit";
import { SandboxComponent } from "../sandbox/class.js";

import { Button } from "./server.js";

export class ButtonSandbox extends SandboxComponent {
  render() {
    const variants = ["primary", "secondary", "invisible"];
    return html`
      <h2>Custom element</h2>
      <ul class="sandbox__list">
        ${variants.map(
          (variant) => html`
            <li>
              <mdn-button variant=${variant}> ${variant} </mdn-button>
            </li>
            <li>
              <mdn-button variant=${variant} .icon=${icon}>
                ${variant} with icon
              </mdn-button>
            </li>
            <li>
              <mdn-button variant=${variant} .icon=${icon} icon-only="true">
                ${variant} icon only
              </mdn-button>
            </li>
          `,
        )}
        <li>
          <mdn-button style="width: 300px; height: 50px;"
            >manually set width/height</mdn-button
          >
        </li>
      </ul>
      <h2>Server component</h2>
      <ul class="sandbox__list">
        ${variants.map(
          (variant) => html`
            <li>
              ${Button.render(
                // @ts-expect-error
                {},
                {
                  label: variant,
                  variant,
                },
              )}
            </li>
            <li>
              ${Button.render(
                // @ts-expect-error
                {},
                {
                  label: variant,
                  variant,
                  icon,
                },
              )}
            </li>
            <li>
              ${Button.render(
                // @ts-expect-error
                {},
                {
                  label: variant,
                  variant,
                  icon,
                  iconOnly: true,
                },
              )}
            </li>
          `,
        )}
      </ul>
    `;
  }
}
