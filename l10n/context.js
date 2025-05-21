import getFluentContext from "./fluent.js";

/**
 * @param {string} locale
 * @returns {Promise<import("types/fred.js").L10nContext>}
 */
export async function addFluent(locale) {
  return {
    locale: locale,
    l10n: getFluentContext(locale),
  };
}
