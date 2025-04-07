import { html, nothing } from "lit";

/**
 *
 * @param {{result: Observatory.Result}} props
 * @returns {Lit.TemplateResult | nothing}
 */
export function Trend({ result }) {
  switch (arrowState(result)) {
    case "up": {
      return html`
        <div class="trend">
          <span class="arrow-up" aria-hidden="true"> ↗︎ </span>
          since last scan
        </div>
      `;
    }
    case "down": {
      return html`
        <div class="trend">
          <span class="arrow-down" aria-hidden="true"> ↘︎ </span>
          since last scan
        </div>
      `;
    }
    default: {
      return nothing;
    }
  }
}

/**
 *
 * @param {Observatory.Result} result
 * @returns {"up" | "down" | "none"}
 */
function arrowState(result) {
  const [oldScore, oldGrade] =
    result.history.length > 0
      ? [result.history.at(-2)?.score, result.history.at(-2)?.grade]
      : [undefined, undefined];
  const newScore = result.scan.score;
  const newGrade = result.scan.grade;
  if (
    typeof newScore === "number" &&
    typeof oldScore === "number" &&
    newGrade !== oldGrade &&
    newScore !== oldScore
  ) {
    return oldScore < newScore ? "up" : "down";
  } else {
    return "none";
  }
}
