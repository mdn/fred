import assert from "node:assert/strict";

import { readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { afterEach, describe, it } from "node:test";

import DOMPurify from "isomorphic-dompurify";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

const hooks = registerHooks({
  load(url, context, nextLoad) {
    if (url.endsWith(".ftl")) {
      return {
        format: "module",
        source: `export default ${JSON.stringify(readFileSync(new URL(url), "utf8"))};`,
        shortCircuit: true,
      };
    }
    return nextLoad(url, context);
  },
});
const { Fluent } = await import("../../../l10n/fluent.js");
hooks.deregister();

describe("Fluent.sanitize", () => {
  afterEach(() => DOMPurify.removeAllHooks());

  for (const { name, input, expected } of [
    { name: "plain text", input: "Hello", expected: "Hello" },
    {
      name: "allowed formatting",
      input: "<strong>Hello</strong>",
      expected: unsafeHTML("<strong>Hello</strong>"),
    },
  ]) {
    it(`preserves ${name}`, () => {
      assert.deepEqual(Fluent.sanitize(input), expected);
    });
  }
});
