import { writeFile } from "node:fs/promises";
import path from "node:path";

import { TABS, TRANSLATED_LOCALES } from "./constants.js";

// Locales.
const locales = [...TRANSLATED_LOCALES].toSorted();

// Slugs.
/** @type {string[]} */
const slugs = TABS.flatMap((tab) => {
  const slugs = [];
  if (
    "panelTitle" in tab &&
    "slug" in tab.panelTitle &&
    typeof tab.panelTitle.slug === "string"
  ) {
    slugs.push(tab.panelTitle.slug);
  }

  if ("panelGroups" in tab) {
    for (const group of tab.panelGroups) {
      for (const item of group.items) {
        if ("slug" in item) {
          slugs.push(item.slug);
        }
      }
    }
  }

  return slugs;
}).toSorted();

console.log(`Checking ${slugs.length} slugs in ${locales.length} locales…`);

/** @type {Record<string, string[]>} */
const result = {};
for (const locale of locales) {
  console.log(`\n=== ${locale} ===`);
  result[locale] = [];

  for (const slug of slugs) {
    const url = `https://developer.mozilla.org/${locale}/docs/${slug}`;
    process.stdout.write(`.`);

    try {
      const res = await fetch(url, { method: "HEAD" });

      if (res.status === 200) {
        // All good.
        continue;
      } else if (res.status === 404) {
        // Not found.
      } else {
        console.log(`\n⚠️ HTTP ${res.status} [${url}]`);
      }
    } catch (error) {
      console.log(`\n🔥 ERROR: ${error} [${url}]`);
    }

    result[locale].push(slug);
  }
}

const file = path.join(import.meta.dirname, "missing-docs.json");
await writeFile(file, JSON.stringify(result, null, 2) + "\n", "utf8");
