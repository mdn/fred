import { Task } from "@lit/task";
import { LitElement, html, nothing } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { OBSERVATORY_API_URL } from "../observatory/constants.js";

import styles from "./element.css?lit";

export class MDNObservatoryTestsAndScores extends LitElement {
  static styles = styles;

  constructor() {
    super();
    this._hasHydrated = false;
  }

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
    autoRun: false,
  });

  firstUpdated() {
    // Mark as hydrated and start the task
    this._hasHydrated = true;
    this._fetchMatrixTask.run();
  }

  render() {
    if (!this._hasHydrated) {
      return nothing;
    }
    return this._fetchMatrixTask.render({
      pending: () =>
        html`<div class="loading">Loading tests and scoring data...</div>`,
      complete: (data) =>
        data.map(
          (entry) => html`
            <section>
              <h3 id=${entry.name}>${entry.title}</h2>
              <p>
                See <a href=${entry.mdnLink}>${entry.title}</a> for guidance.
              </p>
              <figure class="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Test result</th>
                      <th>Description</th>
                      <th align="center">Modifier</th>
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
          Failed to load tests and scoring data. Please try again later.
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
