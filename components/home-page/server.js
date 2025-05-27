import { html, nothing } from "lit";

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
          <section>
            <h2>${context.l10n`Featured articles`}</h2>
            <ul>
              ${context.hyData.featuredArticles.map(
                (article) =>
                  html`<li>
                    <article>
                      ${article.tag
                        ? html`<a href=${article.tag.uri}
                            >${article.tag.title}</a
                          >`
                        : nothing}
                      <h3><a href=${article.mdn_url}>${article.title}</a></h3>
                      <p>${article.summary}</p>
                    </article>
                  </li>`,
              )}
            </ul>
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
