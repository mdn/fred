import { html, nothing } from "lit";

import { formatDateTime, formatMinus } from "../utils";

/**
 *
 * @param {{result: Observatory.Result}} props
 * @returns { Lit.TemplateResult | nothing }
 */
export function History({ result }) {
  if (result.history.length === 0) {
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
