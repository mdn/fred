import { extract } from "./parser/extractor.js";
import { generateQaaLocale } from "./parser/transform.js";

const lint = process.argv.includes("--lint");
await extract({ lint });

const generatePseudo = process.argv.includes("--gen-pseudo");
if (generatePseudo) {
  await generateQaaLocale();
}
