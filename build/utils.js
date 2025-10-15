import { fdir } from "fdir";

const ACRONYMS = new Set(["MDN", "IX"]);

/** @param {string} name */
export function toPascalCase(name) {
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

/** @param {string} name */
export function toCamelCase(name) {
  return name
    .replaceAll(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replaceAll(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

/**
 * @param {string} root
 * @param {(path: string, isDirectory: boolean) => boolean} filter
 */
export function crawl(root, filter) {
  return new fdir()
    .withPathSeparator("/")
    .withFullPaths()
    .withErrors()
    .filter(filter)
    .crawl(root)
    .withPromise();
}
