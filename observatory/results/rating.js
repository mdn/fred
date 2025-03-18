import { html } from "lit-html";

import { formatMinus, hostAsRedirectChain } from "../utils";

import { Trend } from "./trend";
import { Tooltip } from "./tooltip";
import "./human_duration";
import "./rescan_button";

/**
 * @typedef {import("lit").TemplateResult} TemplateResult
 * @typedef {import('../constants').ObservatoryResult} ObservatoryResult
 */

/**
 *
 * @param {{result: ObservatoryResult, host: string, rescan: function}} props
 * @returns {TemplateResult}
 */
export function Rating({ result, host, rescan }) {
  return html`
    <h2 class="summary">
      Scan summary:
      <span class="host">${hostAsRedirectChain(host, result)}</span>
    </h2>
    <section class="scan-result">
      <section class="grade-trend">
        <div class="overall">
          <button popovertarget="grade-popover" aria-label="show info tooltip" class="info-tooltip" tabIndex="0">
            <div class="${`grade grade-${result.scan.grade?.[0]?.toLowerCase()}`}">
                ${formatMinus(result.scan.grade)}
            <div>
            ${Tooltip(result)}
          </button>
        </div>
        ${Trend({ result })}
      </section>
      <section class="data">
        <div>
          <a href="/en-US/observatory/docs/tests_and_scoring" target="_blank">
            <span class="label">Score</span>
          </a>
          : ${result.scan.score}&thinsp;/&thinsp;100
        </div>
        <div>
          <a href="#history">
            <span class="label">Scan Time</span>
          </a>
          <mdn-observatory-human-duration .date=${new Date(
            result.scan.scanned_at
          )}></mdn-observatory-human-duration>
        </div>
        <a href="/en-US/observatory/docs/tests_and_scoring" target="_blank">
          <span class="label">Tests Passed</span>
        </a>
        : ${result.scan.tests_passed}&thinsp;/&thinsp;
        ${result.scan.tests_quantity}
      </section>
      <section class="actions">
        <mdn-observatory-rescan-button .from=${new Date(
          result.scan.scanned_at
        )} .duration=${60} @click=${rescan}></mdn-observatory-rescan-button>
        <div class="scan-another">
          <a href="/en-US/observatory/" data-discover="true">Scan another website</a>
        </div>
      </section>

    </section>
  `;
}
