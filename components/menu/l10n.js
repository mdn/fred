import { TABS } from "./tabs.js";

/**
 * All localizable menu strings, derived from tabs.js.
 * Used by the l10n extractor only — not imported at runtime.
 *
 * @type {Map<string, string>}
 */
export const strings = new Map(
  TABS.flatMap((tab) => {
    /** @type {[string, string][]} */
    const entries = [];

    if (typeof tab.buttonL10nId === "string") {
      entries.push([tab.buttonL10nId, /** @type {string} */ (tab.buttonText)]);
    } else {
      entries.push([tab.buttonL10nId.long, tab.buttonText.long], [tab.buttonL10nId.short, tab.buttonText.short]);
    }

    if (!("panelTitle" in tab)) return entries;

    entries.push([tab.panelTitle.l10nId, tab.panelTitle.text]);

    for (const group of tab.panelGroups) {
      if (group.titleL10nId) {
        entries.push([group.titleL10nId, /** @type {string} */ (group.title)]);
      }
      for (const item of group.items) {
        if (!("l10nId" in item)) continue;
        entries.push([item.l10nId, item.text]);
        if (item.labelL10nId) {
          entries.push([item.labelL10nId, /** @type {string} */ (item.label)]);
        }
      }
    }

    return entries;
  }),
);
