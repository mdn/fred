import { extract } from "../../l10n/parser/extractor.js";

/**
 * @import { Compiler } from "@rspack/core"
 */

export class ExtractL10nPlugin {
  /**
   * @param {Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.beforeCompile.tapPromise("ExtractL10nPlugin", async () => {
      await extract();
    });
  }
}
