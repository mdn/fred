import path from "node:path";

const defaultOut = path.join(import.meta.dirname, "..", "out");
const nodeModule = defaultOut.endsWith(
  path.join("node_modules", "@mdn", "fred", "out"),
);

export const RARI_BUILD_ROOT = process.env.BUILD_OUT_ROOT || defaultOut;

// When running from an npm package, this needs to be the default output directory,
// so we can load the pre-built assets
export const FRED_BUILD_ROOT = nodeModule ? defaultOut : RARI_BUILD_ROOT;
