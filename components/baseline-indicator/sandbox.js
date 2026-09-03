/* eslint-disable lit/prefer-static-styles */
import { html } from "@lit-labs/ssr";

import { SandboxComponent } from "../sandbox/class.js";

import { BaselineIndicator } from "./server.js";

/** @type {import("@rari").Support} */
const SUPPORT_FULL = {
  chrome: "111",
  chrome_android: "111",
  edge: "111",
  firefox: "113",
  firefox_android: "113",
  safari: "15.4",
  safari_ios: "15.4",
};

/** @type {import("@rari").Support} */
const SUPPORT_NO_WEBKIT = {
  chrome: "111",
  chrome_android: "111",
  edge: "111",
  firefox: "113",
  firefox_android: "113",
};

/** @type {import("@rari").Support} */
const SUPPORT_WEBKIT_ONLY = {
  safari: "15.4",
  safari_ios: "15.4",
};

/** @type {import("@rari").Alternative[]} */
const ALTERNATIVES = [
  {
    name: "flexbox",
    description: "CSS flexible box layout",
    mdn_url: "/en-US/docs/Web/CSS/CSS_flexible_box_layout",
  },
  {
    name: "grid",
    description: "CSS grid layout",
    mdn_url: "/en-US/docs/Web/CSS/CSS_grid_layout",
  },
];

const REASON_HTML =
  "It was replaced by a standardised equivalent that browsers implement consistently.";

/**
 * @param {Partial<import("@rari").FeatureData>} [overrides]
 * @returns {import("@rari").FeatureData}
 */
function feature(overrides) {
  return {
    id: "example-feature",
    name: "Example feature",
    description_html: "An example feature.",
    status: { baseline: "high", support: SUPPORT_FULL },
    ...overrides,
  };
}

/**
 * @param {Partial<import("@rari").Baseline>} [overrides]
 * @returns {import("@rari").Baseline}
 */
function notAvailable(overrides) {
  return {
    baseline: false,
    support: SUPPORT_NO_WEBKIT,
    feature: feature(),
    ...overrides,
  };
}

/**
 * @param {"high" | "low"} substatus
 * @param {Partial<import("@rari").Baseline>} [overrides]
 * @returns {import("@rari").Baseline}
 */
function available(substatus, overrides) {
  return notAvailable({
    baseline: substatus,
    baseline_low_date: "2023-05-09",
    support: SUPPORT_FULL,
    ...overrides,
  });
}

/**
 * @param {Partial<import("@rari").Discouraged>} [overrides]
 * @returns {import("@rari").FeatureData}
 */
function discouragedFeature(overrides) {
  return feature({ discouraged: { reason_html: REASON_HTML, ...overrides } });
}

/**
 * @type {{
 *   name: string;
 *   status: import("@rari").BaselineStatus;
 *   baseline?: import("@rari").Baseline;
 * }[]}
 */
const CASES = [
  {
    name: "high",
    status: "high",
    baseline: available("high"),
  },
  {
    name: "high, asterisk",
    status: "high",
    baseline: available("high", { asterisk: true }),
  },
  {
    name: "low",
    status: "low",
    baseline: available("low"),
  },
  {
    name: "low, asterisk",
    status: "low",
    baseline: available("low", { asterisk: true }),
  },
  {
    name: "limited",
    status: "limited",
    baseline: notAvailable(),
  },
  {
    name: "limited, asterisk",
    status: "limited",
    baseline: notAvailable({ support: SUPPORT_WEBKIT_ONLY, asterisk: true }),
  },
  {
    name: "limited, developer signals",
    status: "limited",
    baseline: notAvailable({
      feature: feature({
        developer_signals: { url: "https://example.com/signals", votes: 42 },
      }),
    }),
  },
  {
    name: "discouraged",
    status: "discouraged",
    baseline: notAvailable({ feature: discouragedFeature() }),
  },
  {
    name: "discouraged, one alternative",
    status: "discouraged",
    baseline: notAvailable({
      alternatives: ALTERNATIVES.slice(0, 1),
      feature: discouragedFeature(),
    }),
  },
  {
    name: "discouraged, several alternatives",
    status: "discouraged",
    baseline: notAvailable({
      alternatives: ALTERNATIVES,
      feature: discouragedFeature(),
    }),
  },
  {
    name: "discouraged, no compatibility data",
    status: "discouraged",
  },
  {
    name: "removing",
    status: "removing",
    baseline: notAvailable({ feature: discouragedFeature() }),
  },
  {
    name: "removing, one alternative",
    status: "removing",
    baseline: notAvailable({
      alternatives: ALTERNATIVES.slice(0, 1),
      feature: discouragedFeature(),
    }),
  },
  {
    name: "removing, several alternatives",
    status: "removing",
    baseline: notAvailable({
      alternatives: ALTERNATIVES,
      feature: discouragedFeature(),
    }),
  },
];

export class BaselineIndicatorSandbox extends SandboxComponent {
  /**
   * @param {import("@fred").SandboxContext} context
   */
  render(context) {
    return html`
      <style>
        #host .baseline-indicator {
          max-width: var(--layout-content-max);
        }
      </style>
      ${CASES.map((testCase) => {
        const docContext =
          /** @type {import("./types.js").BaselineContext} */ ({
            ...context,
            doc: {
              status: { baseline: testCase.status },
              baseline: testCase.baseline,
            },
          });
        return html`<h2>${testCase.name}</h2>
          ${BaselineIndicator.render(docContext)}`;
      })}
    `;
  }
}
