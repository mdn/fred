import { html } from "lit";

import { Button } from "../button/server.js";
import feedbackIcon from "../icon/circle-alert.svg?lit";
import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class ObservatoryResults extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").SPAPage>} context
   * @returns {import("@lit").TemplateResult}
   */
  render(context) {
    if (context.parents.length > 0) {
      const lastParent = context.parents.at(-1);
      if (lastParent) {
        lastParent.uri = "#";
      }
    }

    return PageLayout.render(
      context,
      html`
        <main id="content" class="observatory">
          <div class="observatory-results-wrapper">
            <section class="observatory-results">
              <section class="observatory-results__header">
                <h1 class="observatory-results__title">
                  <span class="accent">${context.l10n("obs-title")}</span>
                  ${context.l10n("obs-report")}
                </h1>
                <div class="observatory-results__feedback">
                  ${Button.render(context, {
                    label: context.l10n`Report Feedback`,
                    variant: "plain",
                    icon: feedbackIcon,
                    rel: "noopener",
                    target: "_blank",
                    href: "https://survey.alchemer.com/s3/7897385/MDN-HTTP-Observatory",
                  })}
                </div>
              </section>

              <mdn-observatory-results
                class="observatory-results__mdn-results"
              ></mdn-observatory-results>
            </section>
            <aside class="observatory-results-toc">
              <h2 class="observatory-results-toc__heading">
                ${context.l10n("obs-title")}
              </h2>
              <ul class="observatory-results-toc__list">
                <li class="observatory-results-toc__item">
                  <a
                    href="/en-US/observatory/docs/tests_and_scoring"
                    class="observatory-results-toc__link"
                    >Tests &amp; Scoring</a
                  >
                </li>
                <li class="observatory-results-toc__item">
                  <a href="/en-US/observatory/docs/faq" class="obs-toc__link"
                    >${context.l10n`FAQ`}</a
                  >
                </li>
              </ul>
            </aside>
          </div>
        </main>
      `,
    );
  }
  /**
   * @param {import("@fred").Context<import("@rari").SPAPage>} context
   * @returns {import("@lit").TemplateResult}
   */
  render_old(context) {
    if (context.parents.length > 0) {
      const lastParent = context.parents.at(-1);
      if (lastParent) {
        lastParent.uri = "#";
      }
    }

    return PageLayout.render(
      context,
      html`
        <div class="obs-layout obs-layout--results">
          <div
            id="content"
            class="obs-layout__content obs-layout__content--results"
          >
            <section class="observatory-results">
              <section class="obs-results__header">
                <h1 class="obs-results__title">
                  <span class="obs-results__title-accent"
                    >${context.l10n("obs-title")}</span
                  >
                  ${context.l10n("obs-report")}
                </h1>
                <div class="obs-results__feedback">FEEDBACK</div>
              </section>

              <aside class="obs-toc">
                <h2 class="obs-toc__heading">${context.l10n("obs-title")}</h2>
                <ul class="obs-toc__list">
                  <li class="obs-toc__item">
                    <a
                      href="/en-US/observatory/docs/tests_and_scoring"
                      class="obs-toc__link"
                      >Tests &amp; Scoring</a
                    >
                  </li>
                  <li class="obs-toc__item">
                    <a href="/en-US/observatory/docs/faq" class="obs-toc__link"
                      >FAQ</a
                    >
                  </li>
                </ul>
              </aside>

              <mdn-observatory-results
                class="obs-results__mdn-results"
              ></mdn-observatory-results>
            </section>
          </div>
        </div>
      `,
    );
  }
}
