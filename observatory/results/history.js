import { html } from "lit-html";
import { formatDateTime, formatMinus } from "../utils";

/**
 * @import { TemplateResult } from "lit-html"
 * @import { ObservatoryResult } from "../constants"
 */

/**
 *
 * @param {{result: ObservatoryResult}} props
 * @returns { TemplateResult }
 */
export function History({ result }) {
  if (!result.history.length) {
    return html``;
  }

  return html`
    <h2>Changes in score over time</h2>
    <table class="history">
      <thead>
        <tr>
          <th>Date</th>
          <th>Score</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        ${[...result.history].reverse().map(
          ({ scanned_at, score, grade }) => html`
            <tr>
              <td data-header="Date">
                ${formatDateTime(new Date(scanned_at))}
              </td>
              <td data-header="Score">${score}</td>
              <td data-header="Grade">${formatMinus(grade)}</td>
            </tr>
          `
        )}
      </tbody>
    </table>
  `;
}
