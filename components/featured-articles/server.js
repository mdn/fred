import { html } from "@lit-labs/ssr";
import { nothing } from "lit";

import { ServerComponent } from "../server/index.js";

export class FeaturedArticles extends ServerComponent {
  /**
   * @param {import("@rari").HomePageFeaturedArticle[]} articles
   */
  render(articles) {
    return html`<ul class="featured-articles">
      ${articles.map(
        (article) =>
          html`<li>
            <article class="featured-articles__article">
              ${article.tag
                ? html`<a class="featured-articles__tag" href=${article.tag.uri}
                    >${article.tag.title}</a
                  >`
                : nothing}
              <h3 class="featured-articles__title">
                <a href=${article.mdn_url}>${article.title}</a>
              </h3>
              <p class="featured-articles__summary">${article.summary}</p>
            </article>
          </li>`,
      )}
    </ul>`;
  }
}
