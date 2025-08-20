import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const BUILD_OUT_ROOT =
  process.env.BUILD_OUT_ROOT || path.join(__dirname, "..", "out");
