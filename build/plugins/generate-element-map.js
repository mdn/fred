import fs from "node:fs/promises";
import path from "node:path";

import fg from "fast-glob";

/**
 * @import { Compiler } from "@rspack/core"
 */

const ACRONYMS = new Set(["MDN"]);

export class GenerateElementMapPlugin {
  /**
   * @param {Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.beforeCompile.tapPromise(
      "GenerateElementMapPlugin",
      async () => {
        const files = await fg("components/*/element.js", {
          cwd: compiler.context,
          absolute: false,
        });

        const mapping = files.map((filePath) => {
          const relPath = "../" + filePath.replaceAll("\\", "/");
          const folderName = relPath.split("/").at(-2);
          const tagName = `mdn-${folderName}`;
          const className = tagName
            .split("-")
            .map((x) => toPascalCase(x))
            .join("");
          return `"${tagName}": import("${relPath}").${className};`;
        });

        const content = `
// WARNING: do not edit this file, it's automatically generated by GenerateElementMapPlugin

declare global {
  interface HTMLElementTagNameMap {
    ${mapping.join(`
    `)}
  }
}

export {}`;

        const outPath = path.resolve(
          compiler.context,
          "types",
          "element-map.d.ts",
        );
        fs.writeFile(outPath, content);
      },
    );
  }
}

/** @param {string} word */
function toPascalCase(word) {
  if (ACRONYMS.has(word.toUpperCase())) {
    return word.toUpperCase();
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}
