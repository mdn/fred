import { html } from "lit";

import "./results.js";
import { OBSERVATORY_TITLE } from "../constants.js";
import { Feedback } from "../feedback.js";

import "../index.css";

/**
 * @param {Fred.Context<Rari.SpaPage>} context
 * @returns {Lit.TemplateResult}
 */
export function Results(context) {
  return html` <section class="obs-results">
    <section class="obs-results__header">
      <h1 class="obs-results__title">
        <span class="obs-results__title-accent">${OBSERVATORY_TITLE}</span>
        Report
      </h1>
      <div class="obs-results__feedback">${Feedback(context)}</div>
    </section>

    <aside class="obs-toc">
      <h2 class="obs-toc__heading">${OBSERVATORY_TITLE}</h2>
      <ul class="obs-toc__list">
        <li class="obs-toc__item">
          <a
            href="/en-US/observatory/docs/tests_and_scoring"
            class="obs-toc__link"
            >Tests &amp; Scoring</a
          >
        </li>
        <li class="obs-toc__item">
          <a href="/en-US/observatory/docs/faq" class="obs-toc__link">FAQ</a>
        </li>
      </ul>
    </aside>

    <mdn-observatory-results
      class="obs-results__mdn-results"
    ></mdn-observatory-results>
  </section>`;
}
