/**
 * Returns an MDN URL into a Breadcrumb-like string representation.
 *
 * @param {string} url - the full MDN URL (e.g. "/en-US/docs/Web/HTML/Reference/Elements/a").
 * @param {string} locale - the locale (to omit)
 * @returns {string} the breadcrumb-like string for the URL.
 */
export function mdnUrl2Breadcrumb(url, locale) {
  let parents = url
    .replaceAll("_", " ")
    .split("/")
    .filter((p) => !["", locale, "docs"].includes(p));

  // Replace "API" for clarity.
  parents = parents.map((p) => (p === "API" ? "Web APIs" : p));

  if (parents.length > 1 && parents.at(0) === "Web") {
    // Remove virtual "Web" path.
    parents.splice(0, 1);
  }

  if (parents.length > 1) {
    // Remove current item.
    parents.splice(-1, 1);
  }

  return parents.join(" / ");
}
