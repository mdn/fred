import { html } from "lit";

import { Comparison } from "./comparison.js";
import { Cookies } from "./cookies.js";
import { CSP } from "./csp.js";
import { History } from "./history.js";
import { RawHeaders } from "./raw-headers.js";
import { Scoring } from "./scoring.js";

/**
 * @param {{
 *   result: import("@observatory").Result,
 *   selectedTab: number,
 *   onTabSelect: (index: number, key: string) => void
 * }} props
 * @returns {import("@lit").TemplateResult}
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
      element: html`${CSP({ result })}`,
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

  const tabElements = tabs.map((tab, i) => {
    const onChange = () => onTabSelect(i, tab.key);
    return html`
      <li id="tabs-${i}" class="tabs-list-item">
        <input
          class="visually-hidden"
          id="tab-${i}"
          name="selected"
          type="radio"
          role="tab"
          .checked=${i === selectedTab}
          aria-controls="tab-container-${i}"
          @change=${onChange}
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
    `;
  });

  return html`
    <section class="scan-results">
      <h2 class="result" id="scan-results-header">Scan results</h2>
      <ol
        class="tabs-list"
        role="tablist"
        aria-labelledby="scan-results-header"
      >
        ${tabElements}
      </ol>
    </section>
  `;
}
