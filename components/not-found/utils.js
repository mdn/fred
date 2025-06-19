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
