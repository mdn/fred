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

  it("does not reuse attributes from earlier translations", () => {
    Fluent.sanitize('<a data-l10n-name="link">First</a>', {
      link: { tag: "a", href: "https://example.com/first" },
    });
    assert.deepEqual(
      Fluent.sanitize('<a data-l10n-name="link">Second</a>', {
        link: { tag: "a", title: "Second" },
      }),
      unsafeHTML('<a data-l10n-name="link" title="Second">Second</a>'),
    );
  });

  it("removes its hook when sanitization throws", () => {
    const input = '<a data-l10n-name="link">Link</a>';
    assert.throws(() =>
      Fluent.sanitize(input, { link: { tag: "a", "invalid attribute": "x" } }),
    );
    assert.deepEqual(
      Fluent.sanitize(input, { link: { tag: "a" } }),
      unsafeHTML(input),
    );
  });
});
