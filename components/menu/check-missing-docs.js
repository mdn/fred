import { MISSING_DOCS } from "./constants.js";

for (const [locale, slugs] of Object.entries(MISSING_DOCS)) {
  console.log(`\n=== ${locale} ===`);

  const found = [];
  let checkedCount = 0;

  for (const slug of slugs) {
    const url = `https://developer.mozilla.org/${locale}/docs/${slug}`;
    process.stdout.write(`- ${slug} … `);
    checkedCount++;

    try {
      const res = await fetch(url, { method: "HEAD" });

      if (res.status === 200) {
        console.log(`✅ (${res.status})`);
        found.push(slug);
      } else if (res.status === 404) {
        console.log(`❌ (${res.status})`);
      } else {
        console.log(`⚠️ (${res.status})`);
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  }

  if (found.length > 0) {
    console.log(
      `\n  ${found.length} of ${checkedCount} slugs exist and can be removed from MISSING_DOCS:`,
    );
    for (const slug of found) {
      console.log(`  - ${slug}`);
    }
  } else {
    console.log(
      `\n  All ${checkedCount} slugs are still missing for ${locale}`,
    );
  }
}

console.log(`\n=== Scan complete ===`);
