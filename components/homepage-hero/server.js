import { html } from "lit";

import { ServerComponent } from "../server/index.js";

export class HomepageHero extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   */
  render(context) {
    return html`<section class="homepage-hero">
      <h1>
        ${context.l10n.raw({
          id: "homepage-hero-title",
        })}
      </h1>
      <p>
        ${context.l10n.raw({
          id: "homepage-hero-description",
          elements: {
            css: {
              tag: "a",
              href: `/${context.locale}/docs/Web/CSS`,
              "data-glean": "homepage_hero: css",
            },
            html: {
              tag: "a",
              href: `/${context.locale}/docs/Web/HTML`,
              "data-glean": "homepage_hero: html",
            },
            js: {
              tag: "a",
              href: `/${context.locale}/docs/Web/JavaScript`,
              "data-glean": "homepage_hero: js",
            },
          },
        })}
      </p>
    </section>`;
  }
}
