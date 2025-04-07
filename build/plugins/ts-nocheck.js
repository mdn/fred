import fs from "node:fs/promises";
import path from "node:path";

/** @returns {import("@rsbuild/core").RsbuildPlugin} */
export const pluginTsNocheck = () => ({
  name: "mdn-ts-nocheck-plugin",
  setup(api) {
    api.onAfterBuild(async () => {
      const ssrOutput = path.join("dist", "ssr", "index.js");
      try {
        const content = await fs.readFile(ssrOutput, "utf8");
        await fs.writeFile(
          ssrOutput,
          `// @ts-nocheck
${content}`,
          "utf8",
        );
      } catch (error) {
        console.error(
          `Failed to add banner to ${ssrOutput}, did you change the location of the ssr output bundle?`,
          error,
        );
      }
    });
  },
});
