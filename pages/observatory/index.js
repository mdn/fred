import { PageLayout } from "../../components/page-layout/index.js";
import { Landing } from "../../observatory/landing/index.js";
import { Results } from "../../observatory/results/index.js";

/**
 *
 * @param {Fred.Context<Rari.SpaPage>} context
 * @returns {Lit.TemplateResult}
 */
export function ObservatoryLanding(context) {
  return PageLayout(context, Landing(context));
}

/**
 *
 * @param {Fred.Context<Rari.SpaPage>} context
 * @returns {Lit.TemplateResult}
 */
export function ObservatoryResults(context) {
  return PageLayout(context, Results(context));
}
