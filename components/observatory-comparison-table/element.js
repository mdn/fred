import { Task } from "@lit/task";
import { LitElement, css, html, nothing, svg } from "lit";

import { OBSERVATORY_API_URL } from "../observatory/constants.js";
import { formatMinus } from "../observatory/utils.js";

export class MDNObservatoryComparisonTable extends LitElement {
  static properties = {
    result: { type: Object },
  };

  static styles = css`
    .visually-hidden {
      border: 0 !important;
      clip: rect(1px, 1px, 1px, 1px) !important;
      -webkit-clip-path: inset(50%) !important;
      clip-path: inset(50%) !important;
      height: 1px !important;
      margin: -1px !important;
      overflow: hidden !important;
      padding: 0 !important;
      position: absolute !important;
      white-space: nowrap !important;
      width: 1px !important;
    }
    .grade {
      background: var(--grade-bg);
      border: 1px solid var(--grade-border);
      border-radius: 0.2em;
      color: var(--grade-border);
      display: inline-block;
      font-size: 1.7rem;
      font-weight: 600;
      height: 5rem;
      line-height: 5rem;
      text-align: center;
      width: 5rem;
    }

    .grade-a {
      --grade-bg: var(--observatory-grade-a-bg);
      --grade-border: var(--observatory-grade-a-border);
    }

    .grade-b {
      --grade-bg: var(--observatory-grade-b-bg);
      --grade-border: var(--observatory-grade-b-border);
    }

    .grade-c {
      --grade-bg: var(--observatory-grade-c-bg);
      --grade-border: var(--observatory-grade-c-border);
    }

    .grade-d {
      --grade-bg: var(--observatory-grade-d-bg);
      --grade-border: var(--observatory-grade-d-border);
    }

    .grade-f {
      --grade-bg: var(--observatory-grade-f-bg);
      --grade-border: var(--observatory-grade-f-border);
    }

    .chart {
      background-color: var(--color-background-primary);
      border-radius: var(--border-radius);
    }

    .tick text {
      fill: var(--color-text-secondary);
      font-family: var(--font-body);
      font-size: 1rem;
      font-weight: 300;
      transform: scale(1);
    }
    .tick text.x-labels {
      text-anchor: middle;

      &.current {
        fill: var(--grade-border);
      }
    }

    .tick text.y-labels {
      text-anchor: end;
    }

    .tick line {
      color: var(--color-text-secondary);
      opacity: 0.9;
      stroke: var(--color-border-primary);
      stroke-dasharray: 5, 5;
      stroke-width: 1px;
    }

    .bar {
      fill: var(--grade-bg);
      stroke: var(--grade-bg);
      stroke-width: 1;

      &.current-grade {
        stroke: var(--grade-border);
      }
    }

    .you-are-here {
      & polyline {
        fill: var(--color-background-primary);
        filter: drop-shadow(0 0 3px rgb(170 170 170));
        z-index: 9;
      }

      & text {
        fill: var(--color-text-primary);
        font-family: var(--font-body);
        font-size: 0.85rem;
        font-weight: 300;
      }
    }
  `;

  constructor() {
    super();
    /** @type {Observatory.Result | null} */
    this.result = null;
  }

  _gradeDistributionTask = new Task(this, {
    task: async () => {
      try {
        const url = new URL(OBSERVATORY_API_URL + "/api/v2/grade_distribution");
        const res = await fetch(url);
        if (!res.ok) {
          let message = `${res.status}: ${res.statusText}`;
          try {
            const data = await res.json();
            if (data.error) {
              message = data.message;
            }
          } catch {
            // Ignore.
          }
          throw new Error(message);
        }
        return await res.json();
      } catch (error) {
        console.log(error);
        throw new Error("Observatory API request for comparison data failed");
      }
    },
    args: () => [],
  });

  render() {
    if (!this.result) {
      return nothing;
    }
    return this._gradeDistributionTask.render({
      pending: () => html`<progress></progress>`,

      complete: (gradeDistribution) => {
        if (!this.result) {
          return nothing;
        }

        return GradeSVG({ gradeDistribution, result: this.result });
      },

      error: (e) => html`<div class="error">${e}</div>`,
    });
  }
}

customElements.define(
  "mdn-observatory-comparison-table",
  MDNObservatoryComparisonTable,
);

/**
 *
 * @param {{gradeDistribution: Observatory.GradeDistribution[], result: Observatory.Result}} props
 * @returns {Lit.TemplateResult}
 */
function GradeSVG({ gradeDistribution, result }) {
  const width = 1200;
  const height = 380;
  const leftSpace = 100; // left edge to left edge of first bar
  const rightSpace = 80; // right edge to tight edge of last bar
  const bottomSpace = 60; // bottom edge to bottom edge of bars
  const topSpace = 60; // top padding
  const itemCount = gradeDistribution.length;
  const barWidth = 60;

  // The x-axis has the different grades from "A+" to "D-".
  const xTickIncr =
    (width - leftSpace - rightSpace - barWidth) / (itemCount - 1);
  const xTickOffset = leftSpace + xTickIncr / 2;

  // The y-axis has ticks according to the maximum value of all grades.
  const yMarks = calculateTicks(gradeDistribution);
  const yTickOffset = height - bottomSpace;
  const yTickIncr = (height - bottomSpace - topSpace) / (yMarks.length - 1);
  const yTickMax = Math.max(...yMarks);

  const rows = gradeDistribution.map(
    (item) =>
      html` <tr>
        <th>
          ${formatMinus(item.grade)}
          ${item.grade === result.scan.grade ? "(Current grade)" : ""}
        </th>
        <td>${item.count} sites</td>
      </tr>`,
  );

  return html`
    <table id="grade-svg-a11y-table" class="visually-hidden">
      <caption>
        Number of sites by grade
      </caption>
      <thead>
        <tr>
          <th scope="col">Grade</th>
          <th scope="col">Sites</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    ${svg`
    <svg
      class="chart"
      viewBox="0 0 1200 380"
      aria-labelledby="grade-svg-title"
      aria-describedby="grade-svg-a11y-table"
    >
      <title id="grade-svg-title">Number of sites by grade</title>
      <g class="axes-g"> </g>
        <g
          class="x-axis"
          transform="translate(${xTickOffset}, ${height - bottomSpace})"
        >
          ${gradeDistribution.map((item, index) => {
            return svg` <g
              class="tick tick-x"
              transform="${`translate(${index * xTickIncr}, 0)`}"
            >
              <text
                fill="currentColor"
                y="6"
                dy="1em"
                class="${[
                  "x-labels",
                  item.grade === result.scan.grade
                    ? `current grade-${item.grade[0]?.toLowerCase()}`
                    : undefined,
                ]
                  .filter(Boolean)
                  .join(" ")}"
              >
                ${formatMinus(item.grade)}
              </text>
            </g>`;
          })}
        </g>
        <g>
          ${gradeDistribution.map((item, index) => {
            const barHeight =
              (height - bottomSpace - topSpace) * (item.count / yTickMax);
            return svg` <rect
              class="bar grade-${item.grade
                .replace(/[+-]/, "")
                .toLowerCase()} ${
                item.grade === result.scan.grade ? "current-grade" : ""
              }"
              x="${xTickOffset + index * xTickIncr - barWidth / 2}"
              y="${yTickOffset - barHeight - 1}"
              rx="4"
              ry="4"
              width="${barWidth}"
              height="${barHeight}"
            ></rect>`;
          })}
        </g>
        <g
          class="y-axis"
          fill="none"
          textAnchor="end"
          transform="translate(${leftSpace}, 0)"
        >
          ${yMarks.map(
            (item, index) => svg` <g
              class="tick tick-y"
              transform="translate(0, ${yTickOffset - yTickIncr * index})"
            >
              <line
                stroke="currentColor"
                x2="${width - leftSpace - rightSpace + barWidth / 2}"
              ></line>
              <text class="y-labels" fill="currentColor" x="-25" dy="0.32em">
                ${item / 1000}k
              </text>
            </g>`,
          )}
        </g>
      </g>
      <g>
        ${gradeDistribution.map((item, index) => {
          if (item.grade === result.scan.grade) {
            const barHeight =
              (height - bottomSpace - topSpace) * (item.count / yTickMax);
            return svg` <g
              key="you-are-here"
              class="you-are-here"
              transform="translate(${xTickOffset + index * xTickIncr}, ${
                height - bottomSpace - barHeight - 50
              })"
            >
              <polyline
                points="-60,0 60,0 60,36 7,36 0,48 -7,36 -60,36"
              ></polyline>
              <text
                x="0"
                y="0"
                text-anchor="middle"
                transform="translate(0, 24)"
              >
                Current grade
              </text>
            </g>`;
          } else {
            return [];
          }
        })}
      </g>
    </svg>
  `}
  `;
}

/**
 * Calculate
 * @param {Observatory.GradeDistribution[]} gradeDistribution
 * @returns {number[]}
 */
function calculateTicks(gradeDistribution) {
  const maxValue = Math.max(...gradeDistribution.map((item) => item.count));
  const tickTargetCount = 7; // Target number of ticks between 5 and 10
  const range = rangeForValue(maxValue, false); // Get a nice range
  const tickInterval = rangeForValue(range / tickTargetCount, true); // Determine a nice tick interval
  const niceMaxValue = Math.ceil(maxValue / tickInterval) * tickInterval; // Adjust max value to a nice number
  const tickCount = Math.ceil(niceMaxValue / tickInterval) + 1; // Calculate the number of ticks

  /** @type {number[]} */
  const ticks = [];
  for (let i = 0; i < tickCount; i++) {
    ticks.push(i * tickInterval);
  }
  return ticks;
}

/**
 * This returns values to construct proper axis measurements in
 * diagrams. The returned value is 1|2|5 * 10^x.
 *
 * If `round` is `true`, the returned value can be also rounded down,
 * useful for calculating ticks on an axis.
 *
 * Examples:
 *
 * |range    |rounded=false|rounded=true|
 * |---------|-------------|------------|
 * |  1      |  1          |  1         |
 * |  2      |  2          |  2         |
 * |  3      |  5          |  5         |
 * |  4      |  5          |  5         |
 * |  5      |  5          |  5         |
 * |  6      |  10         |  5         |
 * |  7      |  10         |  10        |
 * |  8      |  10         |  10        |
 * |  9      |  10         |  10        |
 * |  10     |  10         |  10        |
 * |  34     |  50         |  50        |
 * |  450    |  500        |  500       |
 * |  560    |  1000       |  500       |
 * |  6780   |  10000      |  5000      |
 * |  10     |  10         |  10        |
 * |  100    |  100        |  100       |
 * |  1000   |  1000       |  1000      |
 * |  10000  |  10000      |  10000     |
 * @param {number} range The input value
 * @param {boolean} round If false, the returned value will always be greater than `range`, otherwise it can be rounded off
 * @returns {number} a number according to `1|2|5 * 10^x`, where x is derived from `range` to be in the same order of magnitude
 */

function rangeForValue(range, round) {
  const exponent = Math.floor(Math.log10(range));
  const fraction = range / Math.pow(10, exponent);

  /** @type {number} */
  let niceFraction;
  if (round) {
    if (fraction < 1.5) {
      niceFraction = 1;
    } else if (fraction < 3) {
      niceFraction = 2;
    } else if (fraction < 7) {
      niceFraction = 5;
    } else {
      niceFraction = 10;
    }
  } else {
    if (fraction <= 1) {
      niceFraction = 1;
    } else if (fraction <= 2) {
      niceFraction = 2;
    } else if (fraction <= 5) {
      niceFraction = 5;
    } else {
      niceFraction = 10;
    }
  }
  return niceFraction * Math.pow(10, exponent);
}
