import missingDocs from "./missing-docs.json" with { type: "json" };

export { TABS } from "./tabs.js";

/**
 * Lists untranslated menu pages per locale.
 *
 * Tip: Run `node update-missing-docs.js` to update.
 */
/** @type {Record<string, string[]>} */
export const MISSING_DOCS = Object.freeze(missingDocs);

export const TRANSLATED_LOCALES = [
  "es",
  "fr",
  "ja",
  "ko",
  "pt-BR",
  "ru",
  "zh-CN",
  "zh-TW",
];
