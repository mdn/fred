import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";

import { browser, expect } from "@wdio/globals";

describe("Development server", () => {
  it("renders a page and automatically reloads when a source file changes", async () => {
    await browser.url("/en-US/sandbox");
    await expect(browser.$("#host h1")).toHaveText("Fred sandbox");
    await browser.waitUntil(
      () =>
        browser.execute(() => Boolean(customElements.get("mdn-color-theme"))),
      { timeoutMsg: "Sandbox client code did not load" },
    );
    const sourceFile = new URL(
      "../../components/sandbox/server.js",
      import.meta.url,
    );
    const original = await readFile(sourceFile, "utf8");
    const updated = original.replace("Fred sandbox", "Fred sandbox (reloaded)");
    assert.notEqual(
      updated,
      original,
      "Sandbox heading was not found in source",
    );

    try {
      await writeFile(sourceFile, updated);
      // Do not navigate or refresh: the dev server must trigger the reload.
      await expect(browser.$("#host h1")).toHaveText("Fred sandbox (reloaded)");
    } finally {
      await writeFile(sourceFile, original);
    }

    await expect(browser.$("#host h1")).toHaveText("Fred sandbox");
  });
});
