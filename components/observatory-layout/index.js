import { html } from "lit";

import "./index.css";
import { Landing } from "../../observatory/landing/index";
import { Results } from "../../observatory/results/index";

/**
 * @import { TemplateResult } from "lit"
 */

/**
 * @param {Fred.Context<Rari.SpaPage>} context
 * @returns {TemplateResult}
 */
export function ObservatoryLayoutLanding(context) {
  return html`
    <div class="obs-layout obs-layout--landing">
      <div class="obs-layout__content obs-layout__content--landing">
        ${Landing(context)}
      </div>
    </div>
  `;
}

/**
 * @param {Fred.Context<Rari.SpaPage>} context
 * @returns {TemplateResult}
 */
export function ObservatoryLayoutResult(context) {
  return html`
    <div class="obs-layout obs-layout--results">
      <div class="obs-layout__content obs-layout__content--results">
        ${Results(context)}
      </div>
    </div>
  `;
}
