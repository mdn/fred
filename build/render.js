import { readFile } from "node:fs/promises";

import { render as distRender } from "../dist/ssr/index.js";

/** @type {import("@rspack/core").StatsCompilation} */
// TODO: use proper node path
const clientManifest = JSON.parse(
  await readFile("./dist/client/stats.json", "utf8"),
);
/** @type {import("@rspack/core").StatsCompilation} */
const legacyManifest = JSON.parse(
  await readFile("./dist/legacy/stats.json", "utf8"),
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
