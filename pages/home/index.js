import { html, nothing } from "lit";

import { BreadCrumbs } from "../../components/breadcrumbs/index.js";
import { Footer } from "../../components/footer/index.js";
import { Navigation } from "../../components/navigation/index.js";

/**
 * @param {Fred.Context<Rari.HomePage>} context
 */
export function HomePage(context) {
  return html`
    <body class="page-layout">
      <header class="page-layout__header">
        ${Navigation(context)} ${BreadCrumbs(context)}
      </header>
      <div class="page-layout__main">
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
      <div class="page-layout__footer">${Footer(context)}</div>
    </body>
  `;
}
