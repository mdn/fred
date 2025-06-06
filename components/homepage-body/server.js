import { html } from "lit";

import { FeaturedArticles } from "../featured-articles/server.js";

import { LatestNews } from "../latest-news/server.js";
import { RecentContributions } from "../recent-contributions/server.js";
import { ServerComponent } from "../server/index.js";

export class HomepageBody extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").HomePage>} context
   */
  render(context) {
    return html`<div class="homepage-body">
      <section>
        <h2>${context.l10n`Featured articles`}</h2>
        ${FeaturedArticles.render(context.hyData.featuredArticles)}
      </section>
      <section>
        <h2>${context.l10n`Latest news`}</h2>
        ${LatestNews.render(context.hyData.latestNews.items, context.locale)}
      </section>
      <section>
        <h2>${context.l10n`Recent contributions`}</h2>
        ${RecentContributions.render(
          context.hyData.recentContributions.items,
          context.locale,
        )}
      </section>
    </div>`;
  }
}
