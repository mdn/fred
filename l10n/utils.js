import djb2a from "./djb2a.js";

/**
 * @param {string} str
 */
export function generateIdFromString(str) {
  const hash = djb2a(str).toString(36).slice(0, 4);
  const slug = str
    .slice(0, 32)
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, " ")
    .trim()
    .replaceAll(" ", "-");
  return `${slug}-${hash}`;
}
