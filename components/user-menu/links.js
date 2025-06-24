/**
 * @param {string} locale - The current locale
 * @param {Function} l10n - The localization function
 * @returns {Array<{href: string, label: string, external?: boolean}>} Array of navigation links for the user menu
 */
export function getLinks(locale, l10n) {
  return [
    {
      href: `/${locale}/plus/ai-help`,
      label: l10n`AI Help`,
    },
    {
      href: `/${locale}/plus/collections`,
      label: l10n`Collections`,
    },
    {
      href: `/${locale}/plus/updates`,
      label: l10n`Updates`,
    },
    {
      href: `/${locale}/plus/settings`,
      label: l10n("settings"),
    },
    {
      href: "https://support.mozilla.org/products/mdn-plus",
      label: l10n`Help`,
      external: true,
    },
    {
      href: "https://github.com/mdn/MDN-feedback",
      label: l10n`Feedback`,
      external: true,
    },
  ];
}
