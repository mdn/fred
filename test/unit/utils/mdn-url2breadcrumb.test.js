import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { mdnUrl2Breadcrumb } from "../../../utils/mdn-url2breadcrumb.js";

describe("mdnUrl2Breadcrumb", () => {
  it("strips Web segment when unnecessary", () => {
    strictEqual(mdnUrl2Breadcrumb("/en-US/docs/Web/HTML", "en-US"), "HTML");
    strictEqual(mdnUrl2Breadcrumb("/en-US/docs/Web", "en-US"), "Web");
  });

  it("strips Web segment cross-locale", () => {
    strictEqual(
      mdnUrl2Breadcrumb("/en-US/docs/Web/HTML", "fr"),
      "en-US / HTML",
    );
    strictEqual(mdnUrl2Breadcrumb("/en-US/docs/Web", "fr"), "en-US / Web");
  });

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

  it("relabels API to Web APIs cross-locale", () => {
    strictEqual(
      mdnUrl2Breadcrumb(
        "/en-US/docs/Web/API/History_API/Working_with_the_History_API",
        "fr",
      ),
      "en-US / Web APIs / History API",
    );
  });

  describe("keeps the page for fragment URLs", () => {
    const cases = [
      {
        name: "top-level Web page",
        url: "/en-US/docs/Web/HTML#beginners_tutorials",
        locale: "en-US",
        expected: "HTML",
      },
      {
        name: "nested page",
        url: "/en-US/docs/Web/HTML/Reference/Elements/a#attributes",
        locale: "en-US",
        expected: "HTML / Reference / Elements / a",
      },
      {
        name: "Web API page",
        url: "/en-US/docs/Web/API/Element/append#examples",
        locale: "en-US",
        expected: "Web APIs / Element / append",
      },
      {
        name: "cross-locale",
        url: "/en-US/docs/Web/HTML#beginners_tutorials",
        locale: "fr",
        expected: "en-US / HTML",
      },
    ];

    for (const { name, url, locale, expected } of cases) {
      it(name, () => {
        strictEqual(mdnUrl2Breadcrumb(url, locale), expected);
      });
    }
  });
});
