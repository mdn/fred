import { html } from "lit";

import { FeaturedArticles } from "../featured-articles/server.js";
import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class HomePage extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").HomePage>} context
   */
  render(context) {
    return PageLayout.render(
      context,
      html`
        <div class="homepage">
          <mdn-placement-hp-main></mdn-placement-hp-main>
          <section class="homepage-section">
            <h2>${context.l10n`Featured articles`}</h2>
            ${FeaturedArticles.render(context.hyData.featuredArticles)}
          </section>
          <section>
            <h2>${context.l10n`Recent contributions`}</h2>
            <ul>
              ${context.hyData.recentContributions.items.map(
                (contribution) =>
                  html`<li>
                    <a href=${contribution.url}>${contribution.title}</a>
                  </li>`,
              )}
            </ul>
          </section>
        </div>
      `,
    );
  }
}
