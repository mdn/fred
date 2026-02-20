import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const file = path.join(import.meta.dirname, "tabs.json");
const tabs = JSON.parse(await readFile(file, "utf8"));

// Collect all slug entries with a reference to their parent object.
/** @type {{ obj: Record<string, string>, slug: string }[]} */
const entries = [];

for (const tab of tabs) {
  if ("panelTitle" in tab && "slug" in tab.panelTitle) {
    entries.push({ obj: tab.panelTitle, slug: tab.panelTitle.slug });
  }

  if ("panelGroups" in tab) {
    for (const group of tab.panelGroups) {
      for (const item of group.items) {
        if ("slug" in item) {
          entries.push({ obj: item, slug: item.slug });
        }
      }
    }
  }
}

console.log(`Checking ${entries.length} slugs…`);

let updated = 0;

await Promise.all(
  entries.map(async (entry) => {
    const url = `https://developer.mozilla.org/en-US/docs/${entry.slug}`;

    try {
      const res = await fetch(url, { redirect: "follow" });
      process.stdout.write(".");

      if (!res.ok) {
        console.log(`\n⚠️ HTTP ${res.status} [${url}]`);
        return;
      }

      const finalUrl = new URL(res.url);
      const prefix = "/en-US/docs/";
      if (!finalUrl.pathname.startsWith(prefix)) {
        return;
      }

      const newSlug = decodeURIComponent(
        finalUrl.pathname.slice(prefix.length),
      );
      if (newSlug !== entry.slug) {
        console.log(`\n✏️ ${entry.slug} → ${newSlug}`);
        entry.obj.slug = newSlug;
        updated++;
      }
    } catch (error) {
      console.log(`\n🔥 ERROR: ${error} [${url}]`);
    }
  }),
);

console.log(`\n\nDone. ${updated} slug(s) updated.`);

if (updated > 0) {
  await writeFile(file, JSON.stringify(tabs, null, 2) + "\n", "utf8");
  console.log(`Written to ${file}`);
}
