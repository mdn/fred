/**
 * @this {import("@rspack/core").LoaderContext}
 * @param {string} contents
 */
export default function litSvgLoader(contents) {
  const escaped = contents
    .replaceAll(`\\`, `\\\\`)
    .replaceAll(`$`, `\\$`)
    .replaceAll(`\``, `\\\``);
  return `import { svg as s } from "lit"; const svg = s\`${escaped}\`; export default svg;`;
}
