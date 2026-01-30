/**
 * @param {string} str
 * @param {string} componentName
 */
export function generateIdFromString(str, componentName) {
  const slug = str
    .slice(0, 32)
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, " ")
    .trim()
    .replaceAll(" ", "-");
  return `${componentName}-${slug}`;
}
