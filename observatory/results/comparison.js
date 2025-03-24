import { html } from "lit-html";
import "./grade_svg";

/**
 * @import { TemplateResult } from "lit-html"
 * @import { ObservatoryResult } from "../constants"
 */

/**
 *
 * @param {{result: ObservatoryResult}} result
 * @returns { TemplateResult }
 */
export function Comparison({ result }) {
  return html`
    <h2>Performance trends from the past year</h2>
    <mdn-observatory-comparison-table
      .result=${result}></mdn-observatory-comparison-table>
    <p>
      Refer to this graph to assess the website's current status. By following
      the recommendations provided and rescanning, you can expect an improvement
      in the website's grade.
    </p>
  `;
}
