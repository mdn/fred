const ACRONYMS = new Set(["MDN", "IX"]);

/**
 * Converts a kebab-case string to PascalCase,
 * useful for converting a web component tag name to its
 * associated class name.
 *
 * e.g. `mdn-custom-element` -> `MDNCustomElement`
 *
 * @param {string} name kebab-case string
 * @returns {string} PascalCase string
 */
export function kebabToPascalCase(name) {
  return name
    .split("-")
    .map((word) => {
      if (ACRONYMS.has(word.toUpperCase())) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
}

/**
 * Converts a camelCase or PascalCase string to kebab-case,
 * useful for converting a web component class name to its
 * associated tag name.
 *
 * e.g. `MDNCustomElement` -> `mdn-custom-element`
 *
 * @param {string} name camelCase or PascalCase string
 * @returns {string} kebab-case string
 */
export function camelToKebabCase(name) {
  return name
    .replaceAll(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replaceAll(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}
