import l10n from "./fluent.js";

/**
 * @param {Rari.BuiltPage} page
 * @returns {Promise<Fred.Context>}
 */
export async function addFluent(locale, page) {
  return {
    ...page,
    l10n: await l10n(locale)
  }
}