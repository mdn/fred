import path from "node:path";

const defaultOut = path.join(import.meta.dirname, "..", "out");
const nodeModule = defaultOut.endsWith(
  path.join("node_modules", "@mdn", "fred", "out"),
);

export const BUILD_OUT_ROOT =
  (nodeModule && defaultOut) || process.env.BUILD_OUT_ROOT || defaultOut;
