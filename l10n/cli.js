import { extract } from "./parser/extractor.js";
import { generateQaaLocale } from "./parser/transform.js";

const help = process.argv.includes("--help");
if (help) {
  console.log(`Generates template.ftl by combining en-US.ftl and inline l10n tagged strings

Usage:
--lint          Don't write the file, just check if it needs updating
--gen-pseudo    Generate pseudo-locales for QA
`);
} else {
  const lint = process.argv.includes("--lint");
  await extract({ lint });

  const generatePseudo = process.argv.includes("--gen-pseudo");
  if (generatePseudo) {
    await generateQaaLocale();
  }
}
