/* eslint-disable lit/prefer-static-styles */
import { html } from "lit";

import { ifDefined } from "lit/directives/if-defined.js";

import icon from "../icon/thumbs-up.svg?lit";
import { SandboxComponent } from "../sandbox/class.js";

import { Button } from "./server.js";

export class ButtonSandbox extends SandboxComponent {
  render() {
    const hrefs = [undefined, "http://example.com"];
    const variants = [undefined, "primary", "secondary", "plain"];
    const actions = [undefined, "positive", "negative"];
    const icons = [
      { icon: undefined, iconOnly: undefined },
      { icon, iconOnly: false },
      { icon, iconOnly: true },
    ];

    return html`
      <style>
        #Button {
          section {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .manual-size > * {
            width: 300px;
            height: 50px;
          }
        }
      </style>
      <h2>Custom element</h2>
      <div class="manual-size">
        <mdn-button> manually set width/height </mdn-button>
      </div>
      <p>Button in <mdn-button>the middle</mdn-button> of text.</p>
      <p>
        Button in <mdn-button .icon=${icon}>the middle</mdn-button> of text with
        icon.
      </p>
      ${hrefs.map(
        (href) => html`
          <h3><code>${href ? "<a>" : "<button>"}</code></h3>
          <section>
            ${variants.map((variant) =>
              actions.map((action) =>
                icons.map(
                  ({ icon, iconOnly }) => html`
                    <mdn-button
                      href=${ifDefined(href)}
                      variant=${ifDefined(variant)}
                      action=${ifDefined(action)}
                      .icon=${icon}
                      ?icon-only=${iconOnly}
                    >
                      ${variant || "no variant"} ${action} ${icon ? "icon" : ""}
                    </mdn-button>
                  `,
                ),
              ),
            )}
          </section>
        `,
      )}
      <h2>Server component</h2>
      <div class="manual-size">
        ${Button.render(
          // @ts-expect-error
          {},
          {
            label: "manually set width/height",
          },
        )}
      </div>
      <p>
        Button in
        ${Button.render(
          // @ts-expect-error
          {},
          {
            label: "the middle",
          },
        )}
        of text.
      </p>
      <p>
        Button in
        ${Button.render(
          // @ts-expect-error
          {},
          {
            label: "the middle",
            icon,
          },
        )}
        of text with icon.
      </p>
      ${hrefs.map(
        (href) => html`
          <h3><code>${href ? "<a>" : "<button>"}</code></h3>
          <section>
            ${variants.map((variant) =>
              actions.map((action) =>
                icons.map(({ icon, iconOnly }) =>
                  Button.render(
                    // @ts-expect-error
                    {},
                    {
                      label: `${variant || "no variant"} ${action || ""} ${icon ? "icon" : ""}`,
                      href,
                      variant,
                      action,
                      icon,
                      iconOnly,
                    },
                  ),
                ),
              ),
            )}
          </section>
        `,
      )}
    `;
  }
}
