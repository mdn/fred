import crypto from "node:crypto";

/**
 * Adds a per-file identifier to the CSS variables used by the light-dark polyfill,
 * to avoid conflicts between CSS files.
 * @this {import("@rspack/core").LoaderContext}
 * @param {string} source
 */
export default function postCssLightDarkFix(source) {
  const id = hash(this.resourcePath);
  return source.replaceAll(
    "--csstools-light-dark-toggle--",
    `--csstools-light-dark-toggle-${id}-`,
  );
}

/**
 * @param {string} str
 * @returns {string}
 */
function hash(str) {
  return crypto.createHash("sha256").update(str).digest("hex").slice(0, 8);
}
