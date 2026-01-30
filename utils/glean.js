import GleanMetrics from "@mozilla/glean/metrics";

/**
 * Records a click event.
 *
 * Use only if automatic click events are not an option.
 * See: https://mozilla.github.io/glean.js/automatic_instrumentation/click_events/
 *
 * @param {string} source
 */
export function gleanClick(source) {
  GleanMetrics.recordElementClick({
    id: source,
    url: globalThis.location.href,
    referrer: document.referrer,
    title: document.title,
  });
}
