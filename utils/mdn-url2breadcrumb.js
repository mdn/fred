/**
 *
 * @param {string} url
 * @param {string} locale
 * @returns {string}
 */
export function mdnUrl2Breadcrumb(url, locale) {
  return url
    .replaceAll("_", " ")
    .split("/")
    .slice(1)
    .filter((p) => ![locale, "docs", "Web"].includes(p))
    .join(" / ");
}
