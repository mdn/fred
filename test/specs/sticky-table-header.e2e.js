import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { browser } from "@wdio/globals";

const hook = await readFile(
  new URL("../../hooks/sticky-table-header.js", import.meta.url),
  "utf8",
);
const styles = await readFile(
  new URL("../../components/table-container/global.css", import.meta.url),
  "utf8",
);

/** @param {string} direction */
async function openTable(direction) {
  await browser.url(
    `data:text/html,${encodeURIComponent(`
      <style>
        ${styles}
        * { box-sizing: border-box; }
        [hidden] { display: none !important; }
        body { margin: 0; padding: 150px 20px 1000px; }
        .page-layout__header { position: fixed; top: 0; height: 50px; }
        .content-section { width: 400px; }
        .table-container { direction: ${direction}; }
        table { border-collapse: collapse; width: 800px; direction: ${direction}; }
        th, td { border: 1px solid; padding: 8px; }
        td:nth-child(1) { width: 100px; }
        td:nth-child(2) { width: 200px; }
        td:nth-child(3) { width: 500px; }
      </style>
      <header class="page-layout__header"></header>
      <section class="content-section">
        <figure class="table-container">
          <table>
            <thead>
              <tr><th rowspan="2">Name</th><th colspan="2">Details</th></tr>
              <tr><th>Short</th><th>Long</th></tr>
            </thead>
            <tbody>${"<tr><td>Item</td><td>Value</td><td>Description</td></tr>".repeat(12)}</tbody>
          </table>
        </figure>
      </section>
      <script>${hook}</script>
    `)}`,
  );
}

async function assertAligned() {
  await browser.waitUntil(async () =>
    browser.execute(() => {
      const overlay = document.querySelector(".sticky-table-header");
      if (!(overlay instanceof HTMLElement) || overlay.hidden) {
        return false;
      }
      const source = document.querySelectorAll(".table-container thead th");
      const cloned = overlay.querySelectorAll("th");
      return [...source].every((cell, i) => {
        const actual = cloned[i]?.getBoundingClientRect();
        const expected = cell.getBoundingClientRect();
        return (
          actual &&
          Math.abs(actual.left - expected.left) < 1 &&
          Math.abs(actual.right - expected.right) < 1
        );
      });
    }),
  );
}

describe("sticky table header", () => {
  for (const direction of ["ltr", "rtl"]) {
    it(`aligns grouped headers in ${direction} after scrolling and resizing`, async () => {
      await openTable(direction);
      await browser.execute(() => window.scrollTo(0, 220));
      await assertAligned();
      await browser.execute((direction) => {
        const container = document.querySelector(".table-container");
        if (!(container instanceof HTMLElement)) {
          throw new TypeError("Missing table container");
        }
        container.scrollLeft = direction === "rtl" ? -150 : 150;
      }, direction);
      await assertAligned();
      await browser.execute(() => {
        const table = document.querySelector(".table-container table");
        if (!(table instanceof HTMLTableElement)) {
          throw new TypeError("Missing table");
        }
        table.style.width = "1000px";
      });
      await assertAligned();
    });
  }

  it("waits for the original header to pass the sticky boundary below a caption", async () => {
    await openTable("ltr");
    await browser.execute(() => {
      const table = document.querySelector(".table-container table");
      if (!(table instanceof HTMLTableElement)) {
        throw new TypeError("Missing table");
      }
      const caption = table.createCaption();
      caption.textContent = "Table caption";
      caption.style.height = "100px";
      window.scrollTo(0, 150);
    });
    await browser.executeAsync((done) => {
      requestAnimationFrame(() => requestAnimationFrame(() => done()));
    });
    assert.equal(
      await browser.execute(() =>
        document.querySelector(".sticky-table-header")?.hasAttribute("hidden"),
      ),
      true,
      "The clone must stay hidden while the original header is below the boundary",
    );
    await browser.execute(() => window.scrollTo(0, 260));
    await browser.waitUntil(async () =>
      browser.execute(() => {
        const overlay = document.querySelector(".sticky-table-header");
        return overlay instanceof HTMLElement && !overlay.hidden;
      }),
    );
  });
});
