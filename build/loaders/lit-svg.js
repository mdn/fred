import escape from "./escape.js";

/**
 * @this {import("@rspack/core").LoaderContext}
 * @param {string} contents
 */
export default function litSvgLoader(contents) {
  return `import { svg } from "lit"; export default svg\`${escape(contents)}\`;`;
}
