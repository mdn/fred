import { ISSUE_METADATA_TEMPLATE } from "./constants.js";
import { listFeatures } from "./utils.js";

/**
 * Collect link targets without assuming nested features share a source file.
 * @param {import("@bcd").Identifier} data
 * @param {string} query
 * @returns {{ query: string; sourceFile?: string }[]}
 */
export function getFeatureLinkTargets(data, query) {
  const visible = new Set(
    getVisibleFeatures(data, query.split(".").at(-1) || "").map(
      (feature) => feature.compat,
    ),
  );
  return collectLinkTargets(data, query, visible);
}

/**
 * @param {import("@bcd").Identifier} data
 * @param {string} query
 * @param {Set<import("@bcd").CompatStatement>} visible
 * @returns {{ query: string; sourceFile?: string }[]}
 */
function collectLinkTargets(data, query, visible) {
  /** @type {{ query: string; sourceFile?: string }[]} */
  const targets =
    data.__compat && visible.has(data.__compat)
      ? [{ query, sourceFile: data.__compat.source_file }]
      : [];
  for (const [name, child] of Object.entries(data)) {
    if (name !== "__compat") {
      targets.push(
        ...collectLinkTargets(
          /** @type {import("@bcd").Identifier} */ (child),
          `${query}.${name}`,
          visible,
        ),
      );
    }
  }
  return targets;
}

/**
 * Apply the same row limits to the table and its feature selector.
 * @param {import("@bcd").Identifier} data
 * @param {string} name
 * @returns {import("@compat").Feature[]}
 */
export function getVisibleFeatures(data, name) {
  let features = listFeatures(data, "", name);

  const MAX_FEATURES = 100;

  // If there are too many features, hide nested features.
  if (features.length > MAX_FEATURES) {
    features = features.filter(({ depth }) => depth < 2);
  }

  // If there are still too many features, hide non-standard features.
  if (features.length > MAX_FEATURES) {
    features = features.filter(
      ({ compat: { status } }) => status?.standard_track,
    );
  }

  // If there are still too many features, hide deprecated features.
  if (features.length > MAX_FEATURES) {
    features = features.filter(({ compat: { status } }) => !status?.deprecated);
  }

  // If there are still too many features, hide experimental features.
  if (features.length > MAX_FEATURES) {
    features = features.filter(
      ({ compat: { status } }) => !status?.experimental,
    );
  }

  // At this point, we did all we can to reduce the number of features shown.
  if (features.length > MAX_FEATURES) {
    features = features.slice(0, MAX_FEATURES);
  }

  return features;
}

/**
 * @param {string} query
 * @param {string} pathname
 * @returns {string}
 */
export function getIssueUrl(query, pathname) {
  const sp = new URLSearchParams();
  const metadata = ISSUE_METADATA_TEMPLATE.replaceAll(
    "$DATE",
    new Date().toISOString(),
  )
    .replaceAll("$QUERY_ID", query)
    .trim();
  sp.set("mdn-url", `https://developer.mozilla.org${pathname}`);
  sp.set("metadata", metadata);
  sp.set("title", `${query} - <SUMMARIZE THE PROBLEM>`);
  sp.set("template", "data-problem.yml");
  return `https://github.com/mdn/browser-compat-data/issues/new?${sp}`;
}
