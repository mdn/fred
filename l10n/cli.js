import { extract } from "./parser/extractor.js";
import { lintMarkup } from "./parser/lint.js";
import { generateQaaLocale } from "./parser/transform.js";

const help = process.argv.includes("--help");
if (help) {
  console.log(`Generates template.ftl by combining en-US.ftl and inline l10n tagged strings

Usage:
--lint          Don't write the file, just check if it needs updating,
                and check the markup of all strings
--gen-pseudo    Generate pseudo-locales for QA
`);
} else {
  const lint = process.argv.includes("--lint");
  await extract({ lint });

  if (lint) {
    const errors = await lintMarkup();
    if (errors.length > 0) {
      console.error(errors.join("\n"));
      console.error(`\nl10n: found ${errors.length} markup error(s).`);
      process.exitCode = 1;
    }
  }

  const generatePseudo = process.argv.includes("--gen-pseudo");
  if (generatePseudo) {
    await generateQaaLocale();
  }
}
