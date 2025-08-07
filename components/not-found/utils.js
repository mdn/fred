/**
 * Returns the locale from a path, if it contains one.
 *
 * @param {string} pathname - absolute path, e.g. "/en-US/docs/Web/HTML".
 * @returns {string} - the locale in that path, or else "en-US".
 */
export function pathToLocale(pathname) {
  const maybeLocale = pathname.split("/").at(1);

  if (
    maybeLocale &&
    /^(de|en-US|es|fr|ja|ko|pt-BR|ru|zh-CN|zh-TW)$/.test(maybeLocale)
  ) {
    return maybeLocale;
  }

  return "en-US";
}

/**
 * @param {string} pathname
 */
export async function getEnglishDoc(pathname) {
  if (
    pathname &&
    pathname.includes("/docs/") &&
    !pathname.startsWith("/en-US/")
  ) {
    const enUSURL =
      "/en-US/" + pathname.split("/").slice(2).join("/") + "/index.json";

    const response = await fetch(enUSURL);
    if (response.ok) {
      /** @type {{ doc: import("@rari").Doc}} */
      const { doc } = await response.json();
      return doc;
    }
  }
  return;
}
