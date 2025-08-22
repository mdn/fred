import path from "node:path";
export const BUILD_OUT_ROOT =
  process.env.BUILD_OUT_ROOT || path.join(import.meta.dirname, "..", "out");
