import { expect } from "@wdio/globals";

import DocPage from "../pageobjects/doc.page.js";

describe("Kitchensink", () => {
  it("should have correct title", async () => {
    await DocPage.open("en-US/docs/MDN/Kitchensink");

    await expect(DocPage.title).toBeExisting();
    await expect(DocPage.title).toHaveText("The MDN Content Kitchensink");
  });
});
