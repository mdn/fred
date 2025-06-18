import { readFile } from "node:fs/promises";

import path from "node:path";
import { fileURLToPath } from "node:url";

import { render as distRender } from "../dist/ssr/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("@rspack/core").StatsCompilation} */
const clientManifest = JSON.parse(
  await readFile(
    path.join(__dirname, "..", "dist", "client", "stats.json"),
    "utf8",
  ),
);
/** @type {import("@rspack/core").StatsCompilation} */
const legacyManifest = JSON.parse(
  await readFile(
    path.join(__dirname, "..", "dist", "legacy", "stats.json"),
    "utf8",
  ),
);

/**
 * @param {import("@rari").BuiltPage} page
 */
export async function render(page) {
  return await distRender(page.url, page, {
    client: clientManifest,
    legacy: legacyManifest,
  });
}
