import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { resolvePreferredLocale } from "../../../utils/preferred-locale.js";

describe("resolvePreferredLocale", () => {
  const cases = [
    {
      name: "prefers a valid cookie over Accept-Language",
      preferredLocale: "de",
      acceptLanguage: "fr",
      expected: "de",
    },
    {
      name: "matches a cookie case-insensitively",
      preferredLocale: "PT-br",
      expected: "pt-BR",
    },
    {
      name: "ignores an unsupported cookie",
      preferredLocale: "it",
      acceptLanguage: "fr",
      expected: "fr",
    },
    {
      name: "does not apply Accept-Language aliases to the cookie",
      preferredLocale: "pt",
      acceptLanguage: "de",
      expected: "de",
    },
    {
      name: "matches the highest-quality language",
      acceptLanguage: "de;q=0.7, fr;q=0.9",
      expected: "fr",
    },
    {
      name: "prefers an exact regional match before a loose match",
      acceptLanguage: "zh-TW, zh;q=0.9",
      expected: "zh-TW",
    },
    {
      name: "matches a language to its supported region",
      acceptLanguage: "en-GB, de;q=0.8",
      expected: "en-US",
    },
    {
      name: "matches Chinese script aliases",
      acceptLanguage: "zh-Hant, en;q=0.8",
      expected: "zh-TW",
    },
    {
      name: "ignores languages with zero quality",
      acceptLanguage: "fr;q=0, de;q=0.5",
      expected: "de",
    },
    {
      name: "falls back when no language matches",
      acceptLanguage: "it, nl;q=0.8",
      expected: "en-US",
    },
    {
      name: "falls back when no preferences are present",
      expected: "en-US",
    },
  ];

  for (const { name, expected, ...options } of cases) {
    it(name, () => {
      strictEqual(resolvePreferredLocale(options), expected);
    });
  }
});
