import { html } from "lit-html";
import { Scoring } from "./scoring";
import { Csp } from "./csp";
import { Cookies } from "./cookies";
import { RawHeaders } from "./raw_headers";
import { History } from "./history";
import { Comparison } from "./comparison";

/**
 * @typedef {import('../constants').ObservatoryResult} ObservatoryResult
 * @typedef {import('lit').TemplateResult} TemplateResult
 */

/**
 * @param {{
 *   result: ObservatoryResult,
 *   selectedTab: number,
 *   onTabSelect: (index: number, key: string) => void
 * }} props
 * @returns {TemplateResult}
 */
export function Tabs({ result, selectedTab = 0, onTabSelect }) {
  const tabs = [
    {
      label: "Scoring",
      key: "scoring",
      element: html`${Scoring({ result })}`,
    },
    {
      label: "CSP analysis",
      key: "csp",
      element: html`${Csp({ result })}`,
    },
    {
      label: "Cookies",
      key: "cookies",
      element: html`${Cookies({ result })}`,
    },
    {
      label: "Raw server headers",
      key: "headers",
      element: html`${RawHeaders({ result })}`,
    },
    {
      label: "Scan history",
      key: "history",
      element: html`${History({ result })}`,
    },
    {
      label: "Benchmark comparison",
      key: "benchmark",
      element: html`${Comparison({ result })}`,
    },
  ];

  return html`
    <section class="scan-results">
      <h2 class="result" id="scan-results-header">Scan results</h2>
      <ol
        class="tabs-list"
        role="tablist"
        aria-labelledby="scan-results-header"
      >
        ${tabs.map(
          (tab, i) => html`
            <li id="tabs-${i}" class="tabs-list-item">
              <input
                class="visually-hidden"
                id="tab-${i}"
                name="selected"
                type="radio"
                role="tab"
                .checked=${i === selectedTab}
                aria-controls="tab-container-${i}"
                @change=${() => onTabSelect(i, tab.key)}
              />
              <label for="tab-${i}" id="tab-label-${i}">${tab.label}</label>
              <section
                class="tab-content"
                role="tabpanel"
                aria-labelledby="tab-label-${i}"
                id="tab-container-${i}"
              >
                <div class="scroll-container">${tab.element}</div>
              </section>
            </li>
          `
        )}
      </ol>
    </section>
  `;
}
