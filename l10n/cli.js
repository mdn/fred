import { extract } from "./parser/extractor.js";

const lint = process.argv.includes("--lint");
await extract({ lint });
