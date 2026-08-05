#!/usr/bin/env node
console.warn(
  "`fred-server` is deprecated and will be removed in a future major; use `fred server` (e.g. `npx @mdn/fred server`) instead.",
);
await import("../scripts/server.js");
