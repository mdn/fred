/**
 * @param {string} url
 * @param {string} locale
 * @returns {string}
 */
export function changeDocsLocale(url, locale) {
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

  segments.splice(1, docsIndex - 1, locale);
  return origin + segments.join("/");
}
