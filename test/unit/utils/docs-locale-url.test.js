import assert from "node:assert/strict";

import { describe, it } from "node:test";

import { changeDocsLocale } from "../../../utils/docs-locale-url.js";

describe("changeDocsLocale", () => {
  const cases = [
    {
      name: "replaces the locale in a relative docs path",
      url: "/en-US/docs/Web/foo",
      locale: "fr",
      expected: "/fr/docs/Web/foo",
    },
    {
      name: "replaces the locale in a full URL",
      url: "https://developer.mozilla.org/en-US/docs/Web/foo",
      locale: "fr",
      expected: "https://developer.mozilla.org/fr/docs/Web/foo",
    },
    {
      name: "inserts the locale into a locale-less relative path",
      url: "/docs/Web/foo",
      locale: "fr",
      expected: "/fr/docs/Web/foo",
    },
    {
      name: "inserts the locale into a locale-less full URL",
      url: "https://developer.mozilla.org/docs/Web/foo",
      locale: "fr",
      expected: "https://developer.mozilla.org/fr/docs/Web/foo",
    },
    {
      name: "handles a bare docs root with no further path",
      url: "/docs",
      locale: "fr",
      expected: "/fr/docs",
    },
    {
      name: "handles short locale codes",
      url: "/de/docs/Web/foo",
      locale: "en-US",
      expected: "/en-US/docs/Web/foo",
    },
    {
      name: "passes non-/docs urls through unchanged",
      url: "/plus/settings",
      locale: "fr",
      expected: "/plus/settings",
    },
  ];

  for (const { name, url, locale, expected } of cases) {
    it(name, () => {
      assert.equal(changeDocsLocale(url, locale), expected);
    });
  }
});
