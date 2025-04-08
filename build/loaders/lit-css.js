/**
 * @this {import("@rspack/core").LoaderContext}
 * @param {string} source
 */
export default function litCssLoader(source) {
  return `import { css } from "lit";
${source.replace(/export default (.*);/, "export default css([$1]);")}`;
}
