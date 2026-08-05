#!/usr/bin/env node
console.warn(
  "`fred-ssr` is deprecated and will be removed in a future major; use `fred ssr` (e.g. `npx @mdn/fred ssr`) instead.",
);
await import("../build/ssr.js");
