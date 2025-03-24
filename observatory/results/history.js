import { html, nothing } from "lit";
import { formatDateTime, formatMinus } from "../utils";

/**
 * @typedef {import("lit").TemplateResult} TemplateResult
 * @typedef {import("../constants").ObservatoryResult} ObservatoryResult
 */

/**
 *
 * @param {{result: ObservatoryResult}} props
 * @returns { TemplateResult | nothing }
 */
export function History({ result }) {
  if (!result.history.length) {
    return nothing;
  }

  const rows = [...result.history].reverse().map(
    ({ scanned_at, score, grade }) => html`
      <tr>
        <td data-header="Date">${formatDateTime(new Date(scanned_at))}</td>
        <td data-header="Score">${score}</td>
        <td data-header="Grade">${formatMinus(grade)}</td>
      </tr>
    `,
  );

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
        ${rows}
      </tbody>
    </table>
  `;
}
