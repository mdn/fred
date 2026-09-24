import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { render } from "@lit-labs/ssr";
import { collectResultSync } from "@lit-labs/ssr/lib/render-result.js";
import { svg } from "lit";

import { addAttrs } from "../../../../components/curriculum/add-attrs.js";

describe("addAttrs", () => {
  it("adds attributes to the root `<svg>` element", () => {
    const icon = svg`<svg viewBox="0 0 1 1"><path d="M0"/></svg>`;

    assert.match(
      collectResultSync(render(addAttrs(icon, { role: "none", class: "x" }))),
      /<svg viewBox="0 0 1 1" role="none" class="x"><path d="M0"\/><\/svg>/,
    );
  });

  it("does not mutate the original template", () => {
    const icon = svg`<svg viewBox="0 0 1 1"></svg>`;
    const { strings } = icon;

    addAttrs(icon, { class: "x" });

    assert.equal(icon.strings, strings);
    assert.deepEqual([...icon.strings], ['<svg viewBox="0 0 1 1"></svg>']);
  });

  it("renders identically when called repeatedly", () => {
    const icon = svg`<svg viewBox="0 0 1 1"></svg>`;

    assert.equal(
      collectResultSync(render(addAttrs(icon, { class: "x" }))),
      collectResultSync(render(addAttrs(icon, { class: "x" }))),
    );
  });

  describe("reuses strings arrays", () => {
    const icon = svg`<svg viewBox="0 0 1 1"></svg>`;
    const cases = [
      {
        name: "for the same attributes",
        a: addAttrs(icon, { class: "x" }),
        b: addAttrs(icon, { class: "x" }),
        expected: true,
      },
      {
        name: "for fresh results of the same template",
        a: addAttrs(icon, { class: "x" }),
        b: addAttrs({ ...icon }, { class: "x" }),
        expected: true,
      },
      {
        name: "not for different attributes",
        a: addAttrs(icon, { class: "x" }),
        b: addAttrs(icon, { class: "y" }),
        expected: false,
      },
    ];

    for (const { name, a, b, expected } of cases) {
      it(name, () => {
        assert.equal(a.strings === b.strings, expected);
      });
    }
  });
});
