import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getInteractiveExampleColorScheme } from "../../../components/interactive-example/color-scheme.js";

describe("interactive example color scheme", () => {
  const cases = [
    { name: "defaults to light", classLists: [], expected: "light" },
    {
      name: "follows the page theme when marked light-dark",
      classLists: [["interactive-example", "light-dark"]],
      expected: "light-dark",
    },
    {
      name: "can be fixed to light",
      classLists: [["interactive-example", "light"]],
      expected: "light",
    },
    {
      name: "can be fixed to dark",
      classLists: [["interactive-example", "dark"]],
      expected: "dark",
    },
    {
      name: "reads the setting from any language block",
      classLists: [
        ["interactive-example", "html"],
        ["interactive-example", "dark"],
      ],
      expected: "dark",
    },
    {
      name: "uses the first setting when language blocks conflict",
      classLists: [
        ["interactive-example", "light"],
        ["interactive-example", "dark"],
      ],
      expected: "light",
    },
  ];

  for (const { name, classLists, expected } of cases) {
    it(name, () => {
      const blocks = classLists.map((classList) => ({
        classList,
      }));
      assert.equal(getInteractiveExampleColorScheme(blocks), expected);
    });
  }
});
