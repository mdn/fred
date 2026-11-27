import assert from "node:assert/strict";

import { browser } from "@wdio/globals";

import DocPage from "../pageobjects/doc.page.js";

const WIDTH = 1280;

/**
 * Loads the compat table and scrolls its middle row to the viewport center.
 * @param {number} height
 */
async function openScrolledTable(height) {
  await browser.setViewport({ width: WIDTH, height });
  await DocPage.open("en-US/docs/MDN/Kitchensink");
  await browser.waitUntil(
    () =>
      browser.execute(() => {
        const lazy = document.querySelector("mdn-compat-table-lazy");
        lazy?.scrollIntoView({ behavior: "instant" });
        const rows = lazy?.shadowRoot
          ?.querySelector("mdn-compat-table")
          ?.shadowRoot?.querySelectorAll("tbody tr");
        return (rows?.length ?? 0) >= 10;
      }),
    { timeoutMsg: "Compat table did not render at least 10 rows" },
  );
  await browser.execute(() => {
    const root = document
      .querySelector("mdn-compat-table-lazy")
      ?.shadowRoot?.querySelector("mdn-compat-table")?.shadowRoot;
    const rows = [...(root?.querySelectorAll("tbody tr") ?? [])];
    const cell = rows[Math.floor(rows.length / 2)]?.querySelector("button");
    if (cell) {
      window.scrollBy({
        top: cell.getBoundingClientRect().top - window.innerHeight / 2,
        behavior: "instant",
      });
    }
  });
}

/** Viewport positions of the page header, table header, and focused element. */
function measure() {
  return browser.execute(() => {
    const root = document
      .querySelector("mdn-compat-table-lazy")
      ?.shadowRoot?.querySelector("mdn-compat-table")?.shadowRoot;
    const thead = root?.querySelector("thead")?.getBoundingClientRect();
    const active = root?.activeElement?.getBoundingClientRect();
    return {
      pageHeaderBottom:
        document.querySelector(".page-layout__header")?.getBoundingClientRect()
          .bottom ?? NaN,
      theadTop: thead?.top ?? NaN,
      theadBottom: thead?.bottom ?? NaN,
      activeBottom: active?.bottom ?? NaN,
    };
  });
}

describe("compat table", () => {
  const cases = [
    { name: "sticks below the page header", height: 800, sticky: true },
    { name: "scrolls away on short viewports", height: 600, sticky: false },
  ];

  for (const { name, height, sticky } of cases) {
    it(`header ${name}`, async () => {
      await openScrolledTable(height);

      const { pageHeaderBottom, theadTop, theadBottom } = await measure();

      if (sticky) {
        assert.ok(
          Math.abs(theadTop - pageHeaderBottom) < 1,
          `header top (${theadTop}) is not at page header bottom (${pageHeaderBottom})`,
        );
      } else {
        assert.ok(
          theadBottom < pageHeaderBottom,
          `header bottom (${theadBottom}) is still below page header bottom (${pageHeaderBottom})`,
        );
      }
    });
  }

  it("never fully hides focus behind the sticky header", async () => {
    await openScrolledTable(800);

    // Start in the first row below the header, then tab backwards under it.
    await browser.execute(() => {
      const root = document
        .querySelector("mdn-compat-table-lazy")
        ?.shadowRoot?.querySelector("mdn-compat-table")?.shadowRoot;
      const theadBottom =
        root?.querySelector("thead")?.getBoundingClientRect().bottom ?? 0;
      const row = [...(root?.querySelectorAll("tbody tr") ?? [])].find(
        (tr) =>
          (tr.querySelector("button")?.getBoundingClientRect().top ?? 0) >=
          theadBottom,
      );
      /** @type {HTMLElement | null | undefined} */
      const first = row?.querySelector("a, button");
      first?.focus({ preventScroll: true });
    });

    // Enough to cross two rows; Firefox leaves partly covered cells in place.
    for (let press = 1; press <= 32; press++) {
      await browser.keys(["Shift", "Tab"]);
      const { activeBottom, theadBottom } = await measure();
      assert.ok(
        activeBottom > theadBottom,
        `focused cell (bottom: ${activeBottom}) is hidden behind header (bottom: ${theadBottom}) after ${press} presses`,
      );
    }
  });
});
