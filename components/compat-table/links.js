import { ISSUE_METADATA_TEMPLATE } from "./constants.js";

/**
 * Collect link targets without assuming nested features share a source file.
 * @param {import("@bcd").Identifier} data
 * @param {string} query
 * @returns {{ query: string; sourceFile?: string }[]}
 */
export function getFeatureLinkTargets(data, query) {
  /** @type {{ query: string; sourceFile?: string }[]} */
  const targets = data.__compat
    ? [{ query, sourceFile: data.__compat.source_file }]
    : [];
  for (const [name, child] of Object.entries(data)) {
    if (name !== "__compat") {
      targets.push(
        ...getFeatureLinkTargets(
          /** @type {import("@bcd").Identifier} */ (child),
          `${query}.${name}`,
        ),
      );
    }
  }
  return targets;
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
