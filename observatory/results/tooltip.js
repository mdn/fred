import { html } from "lit-html";

import { SCORING_TABLE } from "../constants";
import { formatMinus } from "../utils";
import starsSvg from "../assets/stars.svg?mdnsvg";
import arrowSvg from "../assets/tooltip-arrow.svg?mdnsvg";

/**
 * @import { ObservatoryResult } from "../constants"
 */

/**
 *
 * @param {ObservatoryResult} result
 */
export function Tooltip(result) {
  return html`
    <span
      popover
      id="grade-popover"
      aria-describedby="grade-table"
      class="tooltip-popup">
      ${arrowSvg}
      <table class="grade-tooltip" id="grades-table" role="tooltip">
        <thead>
          <tr>
            <th>Grade</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          ${SCORING_TABLE.map((st) => {
            return html`
              <tr class="${result.scan.grade === st.grade ? "current" : ""}">
                <td>${formatMinus(st.grade)}</td>
                <td>
                  ${st.scoreText}
                  ${result.scan.grade === st.grade && st.stars ? starsSvg : ""}
                </td>
              </tr>
            `;
          })}
        </tbody>
      </table>
    </span>
  `;
}
