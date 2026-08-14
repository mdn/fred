import assert from "node:assert/strict";

import { describe, it } from "node:test";

import {
  applyFlags,
  className,
  parseOverrides,
  resolveFlags,
} from "../../../../components/prototype-flags/flags.js";

/** @type {import("../../../../components/prototype-flags/types.js").Flag[]} */
const FLAGS = [
  { id: "on-by-default", name: "On by default", default: true },
  { id: "off-by-default", name: "Off by default", default: false },
];

describe("className", () => {
  it("namespaces the id", () => {
    assert.equal(className("on-by-default"), "prototype-on-by-default");
  });
});

describe("parseOverrides", () => {
  const cases = [
    {
      name: "reads a stored map of booleans",
      stored: '{"a":true,"b":false}',
      expected: { a: true, b: false },
    },
    {
      name: "treats missing storage as no overrides",
      stored: null,
      expected: {},
    },
    {
      name: "treats unparseable storage as no overrides",
      stored: "not json",
      expected: {},
    },
    {
      name: "treats a non-object as no overrides",
      stored: "[1, 2]",
      expected: {},
    },
    {
      name: "drops values which are not booleans",
      stored: '{"a":true,"b":"yes"}',
      expected: { a: true },
    },
  ];

  for (const { name, stored, expected } of cases) {
    it(name, () => {
      assert.deepEqual(parseOverrides(stored), expected);
    });
  }
});

describe("resolveFlags", () => {
  it("falls back to each flag's default", () => {
    assert.deepEqual(resolveFlags(FLAGS, {}), [
      { id: "on-by-default", name: "On by default", enabled: true },
      { id: "off-by-default", name: "Off by default", enabled: false },
    ]);
  });

  it("applies overrides in both directions", () => {
    const overrides = { "on-by-default": false, "off-by-default": true };
    assert.deepEqual(resolveFlags(FLAGS, overrides), [
      { id: "on-by-default", name: "On by default", enabled: false },
      { id: "off-by-default", name: "Off by default", enabled: true },
    ]);
  });

  it("ignores overrides for flags which no longer exist", () => {
    assert.deepEqual(resolveFlags(FLAGS, { gone: true }), [
      { id: "on-by-default", name: "On by default", enabled: true },
      { id: "off-by-default", name: "Off by default", enabled: false },
    ]);
  });
});

describe("applyFlags", () => {
  it("adds a class for each enabled flag and removes it for each disabled one", () => {
    const root = fakeRoot(["prototype-off-by-default"]);

    applyFlags(root, resolveFlags(FLAGS, {}));

    assert.deepEqual([...root.classList.classes], ["prototype-on-by-default"]);
  });

  it("leaves unrelated classes alone", () => {
    const root = fakeRoot(["something-else"]);

    applyFlags(root, []);

    assert.deepEqual([...root.classList.classes], ["something-else"]);
  });
});

/** @param {string[]} initial */
function fakeRoot(initial) {
  const classes = new Set(initial);
  return {
    classList: {
      classes,
      /**
       * @param {string} name
       * @param {boolean} force
       */
      toggle(name, force) {
        if (force) {
          classes.add(name);
        } else {
          classes.delete(name);
        }
      },
    },
  };
}
