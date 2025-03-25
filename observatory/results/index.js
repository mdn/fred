import { html } from "lit";
import "./results.js";
import { OBSERVATORY_TITLE } from "../constants.js";
import { Feedback } from "../feedback.js";

import "../index.css";

/**
 * @typedef {import("lit").TemplateResult} TemplateResult
 */

/**
 * @param {Fred.Context<Rari.SPAPage>} context
 * @returns {TemplateResult}
 */
export function Results(context) {
  return html` <section class="main">
    <section class="heading">
      <h1><span class="accent">${OBSERVATORY_TITLE}</span> Report</h1>
      <div class="feedback">${Feedback(context)}</div>
    </section>
    <aside class="toc">
      <h2 class="toc-heading">${OBSERVATORY_TITLE}</h2>
      <ul class="toc-list">
        <li class="toc-item">
          <a href="/en-US/observatory/docs/tests_and_scoring" class="toc-link"
            >Tests &amp; Scoring</a
          >
        </li>
        <li class="toc-item">
          <a href="/en-US/observatory/docs/faq" class="toc-link">FAQ</a>
        </li>
      </ul>
    </aside>
    <mdn-observatory-results></mdn-observatory-results>
  </section>`;
}
