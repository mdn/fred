import path from "node:path";
import { parentPort, workerData } from "node:worker_threads";

import "source-map-support/register.js";

/** @type {import("./types.js").WorkerData} */
const { reqPath, page, compilationStats } = workerData;

const ssrStats = compilationStats.find((x) => x.name === "ssr");
if (!ssrStats) {
  throw new Error(
    "cannot find the ssr rspack config, did you change its name?",
  );
}
const { outputPath, entrypoints } = ssrStats;
const outputName = entrypoints?.index?.assets?.find(
  ({ name }) => name.startsWith("index.") && name.endsWith(".js"),
)?.name;
const indexModulePath =
  outputPath && outputName && path.join(outputPath, outputName);
if (!indexModulePath) {
  throw new Error(
    "cannot find ssr entrypoint, did you change output.path or output.name in the rspack config?",
  );
}

try {
  /** @type {import("../entry.ssr.js")} */
  const indexModule = await import(indexModulePath);
  const html = await indexModule?.render(reqPath, page, {
    client: compilationStats.find((x) => x.name === "client") || {},
    legacy: compilationStats.find((x) => x.name === "legacy") || {},
  });
  parentPort?.postMessage({ html });
} catch (error) {
  parentPort?.postMessage({ error });
}
