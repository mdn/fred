import { readFile } from "node:fs/promises";

import path from "node:path";

// TODO: this should respect process.env.BUILD_OUT_ROOT at runtime
// but when we package it into an npm package, it needs to be a relative path
// based on the value of BUILD_OUT_ROOT at that point in time
// https://github.com/mdn/fred/issues/594
const BUILD_OUT_ROOT = path.resolve(import.meta.dirname, "..", "out");

const { render: distRender } = /** @type {import("../entry.ssr.js")} */ (
  await import(path.resolve(BUILD_OUT_ROOT, "static", "ssr", "index.js"))
);

/** @type {import("@rspack/core").StatsCompilation} */
const clientManifest = JSON.parse(
  await readFile(
    path.join(BUILD_OUT_ROOT, "static", "client", "stats.json"),
    "utf8",
  ),
);
/** @type {import("@rspack/core").StatsCompilation} */
const legacyManifest = JSON.parse(
  await readFile(
    path.join(BUILD_OUT_ROOT, "static", "legacy", "stats.json"),
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
