import crypto from "node:crypto";

/**
 * @import { Compiler, NormalModule } from "@rspack/core"
 */

export class CSPHashPlugin {
  /**
   * @param {Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.compilation.tap("CSPHashPlugin", (compilation) => {
      compilation.hooks.succeedModule.tap("CSPHashPlugin", (module) => {
        if ("resource" in module) {
          const fileName = /** @type {NormalModule} */ (module).resource;
          if (fileName?.includes("csp=true")) {
            const source = module.originalSource()?.source();
            const algo = "sha256";
            if (source) {
              const hash = crypto
                .createHash(algo)
                .update(source)
                .digest("base64");
              console.log(`CSP hash for ${fileName}: '${algo}-${hash}'`);
            }
          }
        }
      });
    });
  }
}
