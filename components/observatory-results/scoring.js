import { html } from "lit";

import { TEST_NAMES_IN_ORDER } from "../observatory/constants.js";
import { PassIcon, formatMinus } from "../observatory/utils.js";

/**
 * @param {{overallScore: number, scoreModifier: number}} props
 * @returns {import("types/lit.js").TemplateResult}
 */
function ScoreModifier({ overallScore, scoreModifier }) {
  const bonusEligible = overallScore >= 90;
  const formattedScoreModifier = formatMinus(
    `${scoreModifier > 0 ? `+${scoreModifier}` : scoreModifier}`,
  );

  return html`
    <span class=${!bonusEligible && scoreModifier > 0 ? "not-counted" : ""}>
      ${!bonusEligible && scoreModifier > 0
        ? html`0<sup><a href="#bonus-points-explanation">*</a></sup>`
        : formattedScoreModifier}
    </span>
  `;
}

/**
 *
 * @param {{ result: import("types/observatory.js").Result}} result
 * @returns {import("types/lit.js").TemplateResult}
 */
export function Scoring({ result }) {
  const showFootnote =
    (result.scan.score || 0) <= 90 &&
    Object.entries(result.tests).find(([_n, t]) => t.score_modifier > 0);

  // empty case, should not happen
  if (Object.keys(result.tests).length === 0) {
    return html`No tests found.`;
  }

  const rows = TEST_NAMES_IN_ORDER.map((name) => {
    const test = result.tests[name];
    if (!test) return null;

    return html`
      <tr>
        <td data-header="Test">
          <a
            href=${test.link}
            target="_blank"
            rel="noreferrer"
            class=${test.link.startsWith("/") ? "" : "external"}
          >
            ${test.title}
          </a>
        </td>
        ${test.pass === null
          ? html`<td data-header="Score">-</td>`
          : html` <td class="score" data-header="Score">
              <span>
                <span class="obs-score-value">
                  ${ScoreModifier({
                    overallScore: result.scan.score || 0,
                    scoreModifier: test.score_modifier,
                  })}
                </span>
                ${PassIcon({ pass: test.pass })}
              </span>
            </td>`}
        <td data-header="Reason" .innerHTML=${test.score_description}></td>
        <td
          data-header="Advice"
          .innerHTML=${test.recommendation || `<p class="obs-none">None</p>`}
        ></td>
      </tr>
    `;
  });

  return html`
    <table class="tests">
      <thead>
        <tr>
          <th>Test</th>
          <th>Score</th>
          <th>Reason</th>
          <th>Recommendation</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    ${showFootnote
      ? html` <section class="footnote" id="bonus-points-explanation">
          <sup>*</sup> Normally awards bonus points, however, in this case they
          are not included in the overall score (
          <a href="/en-US/observatory/docs/tests_and_scoring" target="_blank">
            find out why
          </a>
          ).
        </section>`
      : null}
  `;
}
