import { MISSING_DOCS, TABS } from "./constants.js";

const menuSlugs = new Set();
for (const tab of TABS) {
  if ("panelTitle" in tab && "slug" in tab.panelTitle) {
    menuSlugs.add(tab.panelTitle.slug);
  }

  if ("panelGroups" in tab) {
    for (const group of tab.panelGroups) {
      for (const item of group.items) {
        if ("slug" in item) {
          menuSlugs.add(item.slug);
        }
      }
    }
  }
}

for (const [locale, slugs] of Object.entries(MISSING_DOCS)) {
  console.log(`\n=== ${locale} ===`);

  for (const slug of slugs) {
    if (!menuSlugs.has(slug)) {
      console.log(`\n🗑️ Obsolete: ${slug}`);
      continue;
    }
  }

  for (const slug of menuSlugs.values()) {
    const actualMissing = slugs.includes(slug);
    let expectedMissing;

    const url = `https://developer.mozilla.org/${locale}/docs/${slug}`;
    process.stdout.write(`.`);

    try {
      const res = await fetch(url, { method: "HEAD" });

      if (res.status === 200) {
        expectedMissing = false;
      } else if (res.status === 404) {
        expectedMissing = true;
      } else {
        console.log(`\n⚠️ HTTP ${res.status} [${url}]`);
        continue;
      }
    } catch (error) {
      console.log(`\n🔥 ERROR: ${error} [${url}]`);
      continue;
    }

    if (actualMissing !== expectedMissing) {
      if (expectedMissing) {
        console.log(`\n❌ Missing: ${slug}`);
      } else {
        console.log(`\n✅ Found: ${slug}`);
      }
    }
  }
}

console.log(`\n=== Scan complete ===`);
