import { expect } from "@wdio/globals";

import DocPage from "../pageobjects/doc.page.js";
import { captureLogs } from "../utils.js";

describe("Kitchensink", () => {
  it("shouldn't have unknown console error messages", async () => {
    const { messages } = await captureLogs();
    await DocPage.open("en-US/docs/MDN/Kitchensink");
    await expect(
      messages.filter((message) => {
        !(
          message.includes("Bad Gateway") ||
          message.includes('Permission denied to access property "length"')
        );
      }),
    ).toEqual([]);
  });

  it("should have correct title", async () => {
    await DocPage.open("en-US/docs/MDN/Kitchensink");
    await expect(DocPage.title).toBeExisting();
    await expect(DocPage.title).toHaveText("The MDN Content Kitchensink");
  });
});
