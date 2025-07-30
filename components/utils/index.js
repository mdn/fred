/**
 * Used to generate a random element id by combining a prefix with a random string.
 *
 * @param {string} prefix
 * @returns {string}
 */
export function randomIdString(prefix = "id-") {
  return Math.random().toString(36).replace("0.", prefix);
}
