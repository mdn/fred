import { $, browser, expect } from "@wdio/globals";

import DocPage from "../pageobjects/doc.page.js";

describe("Playground", () => {
  describe("copy data url", () => {
    beforeEach(async () => {
      await DocPage.open("en-US/play");
      // remove sticky header so we don't click on it instead of the playground
      await browser.execute(() => document.querySelector("header")?.remove());
    });

    afterEach(async () => {
      // clear session storage so next text gets a fresh playground
      await browser.execute(() => sessionStorage.clear());
    });

    it("should copy playground contents to clipboard", async () => {
      await $(`mdn-play-editor[language="html"]`).click();
      await browser.keys("html-contents");
      await $(`mdn-play-editor[language="css"]`).click();
      await browser.keys("css-contents");
      await $(`mdn-play-editor[language="js"]`).click();
      await browser.keys("js-contents");

      await $(`[data-id="share"]:not([disabled])`).click();
      await $(`[data-glean-id="playground: copy-data-url"]`).click();

      // will cause a webdriver error about permissions, but we've set them in firefox through about:config
      await expect(browser).toHaveClipboardText(
        expect.stringContaining("data:text/html"),
      );
      await expect(browser).toHaveClipboardText(
        expect.stringContaining("html-contents"),
      );
      await expect(browser).toHaveClipboardText(
        expect.stringContaining("css-contents"),
      );
      await expect(browser).toHaveClipboardText(
        expect.stringContaining("js-contents"),
      );
    });

    it("should only uri-encode non-space whitespace", async () => {
      await $(`mdn-play-editor[language="html"]`).click();
      await browser.keys("@\n@ @");
      await $(`mdn-play-editor[language="css"]`).click();
      await browser.keys("body {\n  font-size: 5em;\n}");

      await $(`[data-id="share"]:not([disabled])`).click();
      await $(`[data-glean-id="playground: copy-data-url"]`).click();

      // will cause a webdriver error about permissions, but we've set them in firefox through about:config
      await expect(browser).toHaveClipboardText(
        expect.stringContaining("@%0A@ @"),
      );
      await expect(browser).toHaveClipboardText(
        expect.stringContaining(
          "<style>body {%0A  font-size: 5em;%0A}</style>",
        ),
      );
    });
  });
});
