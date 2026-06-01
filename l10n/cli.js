import yargs from "yargs";

import { hideBin } from "yargs/helpers";

import { extract } from "./parser/extractor.js";
import { generateQaaLocale } from "./parser/transform.js";

await yargs(hideBin(process.argv))
  .command({
    command: "extract",
    describe:
      "Generates template.ftl by combining en-US.ftl and inline l10n tagged strings",
    builder: (yargs) =>
      yargs
        .option("lint", {
          describe: "Don't write the file, just check if it needs updating",
          type: "boolean",
          default: false,
        })
        .option("gen-pseudo", {
          describe: "Generate pseudo-locales for QA",
          type: "boolean",
          default: false,
        }),
    handler: async ({ lint, genPseudo }) => {
      await extract({ lint });
      if (genPseudo) {
        await generateQaaLocale();
      }
    },
  })
  .demandCommand()
  .parse();
