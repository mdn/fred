import yargs from "yargs";

import { hideBin } from "yargs/helpers";

import { extract, merge } from "./parser/extractor.js";
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
  .command({
    command: "merge <source> <target>",
    describe:
      "Merges source file into target file, adding strings which the target file doesn't have",
    handler: async ({ source, target }) => {
      await merge(source, target);
    },
  })
  .demandCommand()
  .parse();
