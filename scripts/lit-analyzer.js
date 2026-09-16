import { concurrently } from "concurrently";

/** @type {import("concurrently").ConcurrentlyCommandInput[]} */
const jobs = [
  {
    command: `npx @jackolope/lit-analyzer 'components/**/!(server|sandbox).js'`,
    name: "client",
    prefixColor: "green",
  },
  // `server.js`/`sandbox.js` are server-rendered and the client loads elements by
  // tag name, so they don't import the elements they reference; `no-missing-import`
  // is disabled for them. The `element.js` files are included only so their
  // custom-element definitions are in scope, which keeps `no-unknown-tag-name` able
  // to catch genuine typos rather than flag every `mdn-*` tag as unknown (their own
  // diagnostics come from the client pass).
  {
    command: `npx @jackolope/lit-analyzer --rules.no-missing-import off 'components/**/@(server|sandbox|element).js'`,
    name: "ssr",
    prefixColor: "blue",
  },
];

try {
  await concurrently(jobs, { group: true }).result;
} catch {
  process.exitCode = 1;
}
