import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isCurrentPageLink } from "../../../../components/compat-table/utils.js";

describe("isCurrentPageLink", () => {
  const cases = [
    {
      name: "matches the current page",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/foo",
      pathname: "/en-US/docs/Web/CSS/foo",
      expected: true,
    },
    {
      name: "does not match another page",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/bar",
      pathname: "/en-US/docs/Web/CSS/foo",
      expected: false,
    },
    {
      name: "keeps links to sections on the current page",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/foo#syntax",
      pathname: "/en-US/docs/Web/CSS/foo",
      expected: false,
    },
    {
      name: "matches a relative URL",
      url: "/en-US/docs/Web/CSS/foo",
      pathname: "/en-US/docs/Web/CSS/foo",
      expected: true,
    },
    {
      name: "ignores a query string when matching the page",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/foo?plain=1",
      pathname: "/en-US/docs/Web/CSS/foo",
      expected: true,
    },
    {
      name: "keeps a fragment-only link",
      url: "#syntax",
      pathname: "/en-US/docs/Web/CSS/foo",
      expected: false,
    },
    {
      name: "does not match a page differing by trailing slash",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/foo/",
      pathname: "/en-US/docs/Web/CSS/foo",
      expected: false,
    },
  ];

  for (const { name, url, pathname, expected } of cases) {
    it(name, () => {
      assert.equal(isCurrentPageLink(url, pathname), expected);
    });
  }
});
