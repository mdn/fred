import { fdir } from "fdir";

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
