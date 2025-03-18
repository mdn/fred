import { html } from "lit-html";
import "./results.js";
import { OBSERVATORY_TITLE } from "../constants.js";
import { Feedback } from "../feedback.js";

import "./index.css";

export function Results() {
  return html` <section class="main">
    <section class="heading">
      <h1><span class="accent">${OBSERVATORY_TITLE}</span> Report</h1>
      <div class="feedback">${Feedback()}</div>
    </section>
    <aside class="toc">
        <h2 class="toc-heading">${OBSERVATORY_TITLE}</h2>
        <ul class="toc-list">
          <li class="toc-item">
            <a href="/en-US/observatory/docs/tests_and_scoring" class="toc-link">Tests &amp; Scoring</a>
          </li>
          <li class="toc-item">
            <a href="/en-US/observatory/docs/faq" class="toc-link">FAQ</a>
          </li>
        </ul>
      </section>
    </aside>

    </section>

    <mdn-observatory-results></mdn-observatory-results>
  </section>`;
}
