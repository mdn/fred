import { html } from "lit";

import Button from "../button/pure.js";
import { formatMinus, hostAsRedirectChain } from "../observatory/utils.js";

import { Tooltip } from "./tooltip.js";
import { Trend } from "./trend.js";

import "../observatory-rescan-button/element.js";

/**
 *
 * @param {{result: import("types/observatory.js").Result, host: string, rescan: Function}} props
 * @returns {import("types/lit.js").TemplateResult}
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
          <button
            popovertarget="grade-popover"
            aria-label="show info tooltip"
            class="info-tooltip"
            tabindex="0"
          >
            <div
              class=${`grade grade-${result.scan.grade?.[0]?.toLowerCase()}`}
            >
              ${formatMinus(result.scan.grade)}
            </div>
            ${Tooltip(result)}
          </button>
        </div>
        ${Trend({ result })}
      </section>
      <section class="data">
        <div>
          <a href="/en-US/observatory/docs/tests_and_scoring" target="_blank">
            <span class="label">Score</span></a
          >: ${result.scan.score}&thinsp;/&thinsp;100
        </div>
        <div>
          <a href="#history"> <span class="label">Scan Time</span></a
          >:
          <mdn-observatory-human-duration
            .date=${new Date(result.scan.scanned_at)}
          ></mdn-observatory-human-duration>
        </div>
        <a href="/en-US/observatory/docs/tests_and_scoring" target="_blank">
          <span class="label">Tests Passed</span></a
        >: ${result.scan.tests_passed}&thinsp;/&thinsp;
        ${result.scan.tests_quantity}
      </section>
      <section class="actions">
        <mdn-observatory-rescan-button
          .from=${new Date(result.scan.scanned_at)}
          .duration=${60}
          @click=${rescan}
        ></mdn-observatory-rescan-button>
        <div class="scan-another">
          ${Button({
            label: "Scan another website",
            href: "/en-US/observatory",
          })}
        </div>
      </section>
    </section>
  `;
}
