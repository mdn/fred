/**
 * @import { RunnerColorScheme } from "../play-runner/types.js";
 */

/** @type {ReadonlySet<string>} */
const COLOR_SCHEMES = new Set(["light-dark", "light", "dark"]);

/**
 * @param {string} name
 * @returns {name is RunnerColorScheme}
 */
const isColorScheme = (name) => COLOR_SCHEMES.has(name);

/**
 * @param {Iterable<{ classList: Iterable<string> }>} preElements
 * @returns {RunnerColorScheme}
 */
export function getInteractiveExampleColorScheme(preElements) {
  for (const pre of preElements) {
    const colorScheme = [...pre.classList].find(isColorScheme);
    if (colorScheme) {
      return colorScheme;
    }
  }
  return "light";
}
