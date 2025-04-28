import { html } from "lit";

import starsSvg from "../observatory/assets/stars.svg?lit";
import arrowSvg from "../observatory/assets/tooltip-arrow.svg?lit";
import { SCORING_TABLE } from "../observatory/constants.js";
import { formatMinus } from "../observatory/utils.js";

/**
 */

/**
 *
 * @param {Observatory.Result} result
 */
export function Tooltip(result) {
  const rows = SCORING_TABLE.map((st) => {
    return html`
      <tr class=${result.scan.grade === st.grade ? "current" : ""}>
        <td>${formatMinus(st.grade)}</td>
        <td>
          ${st.scoreText}
          ${result.scan.grade === st.grade && st.stars ? starsSvg : ""}
        </td>
      </tr>
    `;
  });

  return html`
    <span
      popover
      id="grade-popover"
      aria-describedby="grade-table"
      class="tooltip-popup"
    >
      ${arrowSvg}
      <table class="grade-tooltip" id="grades-table" role="tooltip">
        <thead>
          <tr>
            <th>Grade</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </span>
  `;
}
