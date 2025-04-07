import { html, nothing } from "lit";

import { PageLayout } from "../../components/page-layout/index.js";

/**
 * @param {Fred.Context<Rari.HomePage>} context
 */
export function HomePage(context) {
  return PageLayout(
    context,
    html`
      <section>
        <h2>${context.l10n`Featured articles`}</h2>
        <ul>
          ${context.hyData.featuredArticles.map(
            (article) =>
              html`<li>
                <article>
                  ${article.tag
                    ? html`<a href=${article.tag.uri}>${article.tag.title}</a>`
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
    `,
  );
}
