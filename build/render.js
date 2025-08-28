import { readFile } from "node:fs/promises";

import path from "node:path";

import { FRED_BUILD_ROOT } from "./env.js";

const { render: distRender } = /** @type {import("../entry.ssr.js")} */ (
  await import(path.resolve(FRED_BUILD_ROOT, "static", "ssr", "index.js"))
);

/** @type {import("@rspack/core").StatsCompilation} */
const clientManifest = JSON.parse(
  await readFile(
    path.join(FRED_BUILD_ROOT, "static", "client", "stats.json"),
    "utf8",
  ),
);
/** @type {import("@rspack/core").StatsCompilation} */
const legacyManifest = JSON.parse(
  await readFile(
    path.join(FRED_BUILD_ROOT, "static", "legacy", "stats.json"),
    "utf8",
  ),
);

/**
 * @param {import("@fred").PartialContext} context
 */
export async function render(context) {
  return await distRender(context.url, context, {
    client: clientManifest,
    legacy: legacyManifest,
  });
}
