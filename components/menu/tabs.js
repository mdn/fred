import tabsDataRaw from "./tabs.json" with { type: "json" };

/** @type {Readonly<import("./types.d.ts").RawTab[]>} */
const RAW_TABS = Object.freeze(tabsDataRaw);

/**
 * Converts a string to a kebab-case slug for use in l10n IDs.
 * @param {string} str
 */
const slugify = (str) =>
  str
    .toLowerCase()
    .replaceAll(/[^\p{L}\p{N}]+/gu, "-")
    .replaceAll(/^-|-$/g, "");

/**
 * Menu tabs enriched with l10n IDs.
 *
 * @type {ReadonlyArray<import("./types.js").MenuTab>}
 */
export const TABS = Object.freeze(
  /** @type {import("./types.js").MenuTab[]} */ (
    RAW_TABS.map((tab) => {
      const buttonL10nId =
        typeof tab.buttonText === "string"
          ? `menu-${tab.id}`
          : {
              long: `menu-${tab.id}`,
              short: `menu-${tab.id}-short`,
            };

      if (!("panelTitle" in tab)) {
        return { ...tab, buttonL10nId };
      }

      return {
        ...tab,
        buttonL10nId,
        panelTitle: {
          ...tab.panelTitle,
          l10nId: `menu-${tab.id}-panel-title`,
        },
        panelGroups: (tab.panelGroups ?? []).map((group, gi) => {
          const groupSlug = group.title ? slugify(group.title) : String(gi);
          return {
            ...group,
            titleL10nId: group.title
              ? `menu-${tab.id}-${groupSlug}`
              : undefined,
            items: group.items.map((item) => {
              if ("render" in item) return item;
              const l10nId = `menu-${tab.id}-${groupSlug}-${slugify(item.text)}`;
              return {
                ...item,
                l10nId,
                labelL10nId: item.label ? `${l10nId}-label` : undefined,
              };
            }),
          };
        }),
      };
    })
  ),
);
