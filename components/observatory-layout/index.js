import { html } from "lit-html";
import "./index.css";
import { Landing } from "../../observatory/landing";
import { Results } from "../../observatory/results";

/**
 * @import { TemplateResult, nothing } from "lit-html"
 */

/**
 * @param {Fred.Context<Rari.SPAPage>} context
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
 * @param {Fred.Context<Rari.SPAPage>} context
 * @returns {TemplateResult}
 */
export function ObservatoryLayoutResult(context) {
  return html`
    <div class="obs-layout obs-layout--results">
      <div class="obs-layout__content obs-layout__content--results">
        ${Results(context)}
      </div>
      <div class="obs-layout__toc">TODO: toc</div>
    </div>
  `;
}
