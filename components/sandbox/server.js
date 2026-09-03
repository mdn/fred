import { html } from "@lit-labs/ssr";

import { ServerComponent } from "../server/index.js";

import { SandboxComponent } from "./class.js";

/**
 * @param {unknown} value
 * @returns {value is typeof SandboxComponent}
 */
function isSandboxComponent(value) {
  return Object.getPrototypeOf(value) === SandboxComponent;
}

export class Sandbox extends ServerComponent {
  /**
   * @param {import("@fred").SandboxContext} context
   */
  render(context) {
    const modules = /** @type {Record<string, Record<string, unknown>>} */ (
      import.meta.glob("../**/sandbox.js", { eager: true })
    );
    const componentMap = new Map(
      Object.entries(modules).flatMap(([key, module]) => {
        const component = Object.values(module).find(isSandboxComponent);
        const name = key.split("/").at(-2);
        return name && component ? [[name, component]] : [];
      }),
    );

    const componentNames = [...componentMap.keys()].toSorted();
    const selectedName = context.sandbox.component;
    const selectedComponent = selectedName
      ? componentMap.get(selectedName)
      : undefined;

    return html`
      <body class="sandbox">
        <div class="sandbox__sidebar">
          <mdn-color-theme></mdn-color-theme>
          <ul>
            ${componentNames.map(
              (name) =>
                html`<li>
                  <a href=${`/${context.locale}/sandbox/${name}`}>${name}</a>
                </li>`,
            )}
          </ul>
        </div>
        <main id="host">
          ${
            selectedComponent
              ? html`<h1>${selectedName}</h1>
                  ${selectedComponent.render(context)}`
              : selectedName
                ? html`<h1>Sandbox not found</h1>
                    <p>
                      No sandbox named <code>${selectedName}</code> exists.
                    </p>`
                : html`<h1>Fred sandbox</h1>
                    <p>Select a component to render its sandbox.</p>`
          }
        </main>
      </body>
    `;
  }
}
