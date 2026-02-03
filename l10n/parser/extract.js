import { extract } from "./extractor.js";

const lint = process.argv.includes("--lint");
await extract({ lint });
