import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { mdnUrl2Breadcrumb } from "../../../utils/mdn-url2breadcrumb.js";

describe("mdnUrl2Breadcrumb", () => {
  it("relabels API to Web APIs for the correct paths", () => {
    strictEqual(
      mdnUrl2Breadcrumb(
        "/en-US/docs/Web/API/History_API/Working_with_the_History_API",
        "en-US",
      ),
      "Web APIs / History API",
    );
    strictEqual(
      mdnUrl2Breadcrumb(
        "/en-US/docs/Mozilla/Add-ons/WebExtensions/API/action/onClicked",
        "en-US",
      ),
      "Mozilla / Add-ons / WebExtensions / API / action",
    );
  });
});
