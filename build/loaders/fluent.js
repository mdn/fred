import escape from "./escape.js";

/**
 * @this {import("@rspack/core").LoaderContext}
 * @param {string} contents
 */
export default function fluentLoader(contents) {
  return `export default \`${escape(contents)}\`;`;
}
