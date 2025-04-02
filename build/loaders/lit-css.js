import escape from "./escape.js";

/**
 * @this {import("@rspack/core").LoaderContext}
 * @param {string} contents
 */
export default function litCssLoader(contents) {
  return `import { css } from "lit"; export default css\`${escape(contents)}\`;`;
}
