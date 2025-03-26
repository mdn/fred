import { html } from "lit";

import starsSvg from "../assets/stars.svg?mdnsvg";
import arrowSvg from "../assets/tooltip-arrow.svg?mdnsvg";
import { SCORING_TABLE } from "../constants";
import { formatMinus } from "../utils";

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
