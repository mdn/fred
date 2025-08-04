import { html } from "lit";

import { ServerComponent } from "../server/index.js";

import { SandboxComponent } from "./class.js";

export class Sandbox extends ServerComponent {
  render() {
    // @ts-expect-error
    // eslint-disable-next-line no-undef
    const modulesContext = require.context("../", true, /\/sandbox\.js$/);
    // @ts-expect-error
    const modules = modulesContext.keys().map((key) => modulesContext(key));

    /** @type {(typeof SandboxComponent)[]} */
    // @ts-expect-error
    const components = modules.flatMap((module) =>
      Object.values(module).filter(
        (exported) => Object.getPrototypeOf(exported) === SandboxComponent,
      ),
    );
    const componentMap = Object.fromEntries(
      components.map((component) => [
        component.name.replace(/Sandbox$/, ""),
        component,
      ]),
    );

    return html`
      <body class="sandbox">
        <div class="sandbox__sidebar">
          <mdn-color-theme></mdn-color-theme>
          <ul>
            ${Object.keys(componentMap).map(
              (name) => html`<li><a href=${`#${name}`}>${name}</a></li>`,
            )}
          </ul>
        </div>
        ${Object.entries(componentMap).map(
          ([name, component]) =>
            html`<section class="sandbox__section" id=${name}>
              <h1>${name}</h1>
              ${component.render()}
            </section>`,
        )}
      </body>
    `;
  }
}
