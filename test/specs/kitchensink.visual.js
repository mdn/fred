import { $, browser, expect } from "@wdio/globals";

import DocPage from "../pageobjects/doc.page.js";

describe("Kitchensink", () => {
  it("should look the same", async () => {
    await DocPage.open("en-US/docs/MDN/Kitchensink");
    await expect(browser).toMatchFullPageSnapshot("kitchensink-full", 0, {
      hideElements: [
        await $("mdn-placement-top"),
        await $("mdn-placement-sidebar"),
      ],
    });
  });
});
