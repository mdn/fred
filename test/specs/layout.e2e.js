import assert from "node:assert/strict";

import { browser } from "@wdio/globals";

import DocPage from "../pageobjects/doc.page.js";

describe("layout", () => {
  it("shouldn't overflow horizontally", async () => {
    await DocPage.open("en-US/docs/MDN/Kitchensink");

    /** @type {number[][]} */
    const ranges = [];

    for (let width = 320; width <= 1440; width++) {
      await browser.setViewport({ width, height: 768 });

      const overflows = await browser.execute(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
      );

      if (overflows) {
        const current = ranges.at(-1);
        if (current && current[1] === width - 1) {
          current[1] = width;
        } else {
          ranges.push([width, width]);
        }
      }
    }

    assert.deepEqual(
      ranges,
      [],
      "page overflows at: " +
        ranges
          .map(([from, to]) => (from === to ? `${from}px` : `${from}-${to}px`))
          .join(", "),
    );
  });
});
