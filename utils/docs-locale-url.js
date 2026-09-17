/**
 * @param {string} url
 * @param {string} locale
 * @returns {string}
 */
export function changeDocsLocale(url, locale) {
  return replaceDocsLocale(url, [locale]);
}

/**
 * Strips the locale, so the server redirects to the reader's preferred locale.
 * @param {string} url
 * @returns {string}
 */
export function removeDocsLocale(url) {
  return replaceDocsLocale(url, []);
}

/**
 * @param {string} url
 * @param {string[]} localeSegments
 * @returns {string}
 */
function replaceDocsLocale(url, localeSegments) {
  const match = url.match(/^(https?:\/\/[^/]+)?(\/.*)$/);
  if (!match) {
    return url;
  }
  const [, origin = "", path = ""] = match;

  const segments = path.split("/");
  const docsIndex = segments.indexOf("docs");
  if (docsIndex === -1) {
    return url;
  }

  segments.splice(1, docsIndex - 1, ...localeSegments);
  return origin + segments.join("/");
}
