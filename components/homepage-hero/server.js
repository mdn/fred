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
          id: "homepage-hero_title",
          elements: { developers: { tag: "u" } },
        })}
      </h1>
      <p>
        ${context.l10n.raw({
          id: "homepage-hero_description",
          elements: {
            css: {
              tag: "a",
              href: "/en-US/docs/Web/CSS",
              "data-glean": "homepage_hero: css",
            },
            html: {
              tag: "a",
              href: "/en-US/docs/Web/HTML",
              "data-glean": "homepage_hero: html",
            },
            js: {
              tag: "a",
              href: "/en-US/docs/Web/JavaScript",
              "data-glean": "homepage_hero: js",
            },
          },
        })}
      </p>
    </section>`;
  }
}
