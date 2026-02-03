import { html } from "@lit-labs/ssr";
import { nothing } from "lit";

import { WRITER_MODE } from "../env/index.js";
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
      ${WRITER_MODE && context.localServer
        ? html`<mdn-recently-visited></mdn-recently-visited>`
        : nothing}
      <section>
        <h2>
          ${context.l10n("homepage-body-featured-articles")`Featured articles`}
        </h2>
        ${FeaturedArticles.render(context.hyData.featuredArticles)}
      </section>
      <section>
        <h2>${context.l10n("homepage-body-latest-news")`Latest news`}</h2>
        ${LatestNews.render(context.hyData.latestNews.items, context.locale)}
      </section>
      <section>
        <h2>
          ${context.l10n(
            "homepage-body-recent-contributions",
          )`Recent contributions`}
        </h2>
        ${RecentContributions.render(
          context.hyData.recentContributions.items,
          context.locale,
        )}
      </section>
    </div>`;
  }
}
