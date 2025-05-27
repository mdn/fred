// @ts-expect-error "Could not find declaration file"
import GleanMetrics from "@mozilla/glean/metrics";

/**
 * Records a click event.
 *
 * Use only if automatic click events are not an option.
 * See: https://mozilla.github.io/glean.js/automatic_instrumentation/click_events/
 *
 * @param {string} id
 * @param {object} options
 * @param {string=} options.type
 * @param {string=} options.label
 */
export function gleanClick(id, { type, label }) {
  GleanMetrics.recordElementClick({
    id,
    type,
    label,
  });
}
