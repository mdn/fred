import getFluentContext from "./fluent.js";

/**
 * @template {Rari.BuiltPage} PageType
 * @param {string} locale
 * @param {PageType} page
 * @returns {Promise<Fred.Context<PageType>>}
 */
export async function addFluent(locale, page) {
  return {
    ...page,
    locale: locale,
    l10n: getFluentContext(locale),
  };
}
