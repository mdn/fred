import { Task } from "@lit/task";
import { LitElement, html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { L10nMixin } from "../../l10n/mixin.js";
import { OBSERVATORY_API_URL } from "../env/index.js";

import styles from "./element.css?lit";

export class MDNObservatoryTestsAndScores extends L10nMixin(LitElement) {
  static styles = styles;
  static ssr = false;

  _fetchMatrixTask = new Task(this, {
    task: async () => {
      const response = await fetch(
        `${OBSERVATORY_API_URL}/api/v2/recommendation_matrix`,
      );

      if (!response.ok) {
        return [];
      }

      /**
       * @type {import("@observatory").ScoringResponse}
       */
      const data = await response.json();

      const ret = data.map((entry) => ({
        ...entry,
        results: entry.results.map((result) => ({
          ...result,
          description_html: result.description,
        })),
      }));
      return ret;
    },
    args: () => [],
  });

  render() {
    return this._fetchMatrixTask.render({
      pending: () =>
        html`<div class="loading">
          ${this.l10n`Loading tests and scoring data...`}
        </div>`,
      complete: (data) =>
        data.map(
          (entry) => html`
            <section>
              <h3 id=${entry.name}>${entry.title}</h3>
              <p>
                ${this.l10n`See`}
                <a href=${entry.mdnLink}>${entry.title}</a>
                ${this.l10n`for guidance.`}
              </p>
              <figure class="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>${this.l10n`Test result`}</th>
                      <th>${this.l10n`Description`}</th>
                      <th align="center">${this.l10n`Modifier`}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${entry.results.map(
                      (result) => html`
                        <tr>
                          <td>${result.name}</td>
                          <td>${unsafeHTML(result.description_html)}</td>
                          <td>${result.scoreModifier}</td>
                        </tr>
                      `,
                    )}
                  </tbody>
                </table>
              </figure>
            </section>
          `,
        ),
      error: (error) => html`
        <div class="error">
          ${this
            .l10n`Failed to load tests and scoring data. Please try again later.`}
          ${console.error("Observatory matrix fetch error:", error)}
        </div>
      `,
    });
  }
}

customElements.define(
  "mdn-observatory-tests-and-scores",
  MDNObservatoryTestsAndScores,
);
