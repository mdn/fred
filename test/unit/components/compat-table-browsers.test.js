import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { gatherPlatformsAndBrowsers } from "../../../components/compat-table/browsers.js";

/**
 * @param {string} type
 * @param {boolean} [accepts_webextensions]
 */
const browser = (type, accepts_webextensions = false) =>
  /** @type {import("@bcd").BrowserStatement} */ (
    /** @type {unknown} */ ({ name: type, type, accepts_webextensions })
  );

/** @type {Partial<import("@bcd").Browsers>} */
const browserInfo = {
  chrome: browser("desktop", true),
  firefox: browser("desktop", true),
  ie: browser("desktop"),
  chrome_android: browser("mobile"),
  deno: browser("server"),
  nodejs: browser("server"),
  oculus: browser("xr"),
};

/**
 * @param {string[]} supportedBrowsers
 * @returns {import("@bcd").Identifier}
 */
const compatDataWithSupportFor = (supportedBrowsers) =>
  /** @type {import("@bcd").Identifier} */ (
    /** @type {unknown} */ ({
      __compat: {
        support: Object.fromEntries(
          supportedBrowsers.map((name) => [name, {}]),
        ),
      },
    })
  );

describe("gatherPlatformsAndBrowsers", () => {
  const cases = [
    {
      name: "defaults show desktop and mobile only",
      category: "css",
      data: compatDataWithSupportFor(["chrome"]),
      visibility: {},
      expected: {
        platforms: ["desktop", "mobile"],
        browsers: ["chrome", "firefox", "chrome_android"],
        hidden: { deno: "no-data", nodejs: "no-data" },
      },
    },
    {
      name: "runtime with data adds the server platform, the other is hidden",
      category: "api",
      data: compatDataWithSupportFor(["chrome", "nodejs"]),
      visibility: {},
      expected: {
        platforms: ["desktop", "mobile", "server"],
        browsers: ["chrome", "firefox", "chrome_android", "nodejs"],
        hidden: { deno: "no-data" },
      },
    },
    {
      name: "javascript shows runtimes regardless of data",
      category: "javascript",
      data: compatDataWithSupportFor(["chrome"]),
      visibility: {},
      expected: {
        platforms: ["desktop", "mobile", "server"],
        browsers: ["chrome", "firefox", "chrome_android", "deno", "nodejs"],
        hidden: {},
      },
    },
    {
      name: "webextensions mark non-accepting browsers as not applicable",
      category: "webextensions",
      data: compatDataWithSupportFor(["chrome"]),
      visibility: {},
      expected: {
        platforms: ["desktop"],
        browsers: ["chrome", "firefox"],
        hidden: {
          ie: "not-applicable",
          chrome_android: "not-applicable",
          deno: "not-applicable",
          nodejs: "not-applicable",
          oculus: "not-applicable",
        },
      },
    },
    {
      name: "saved choice shows a non-default browser",
      category: "css",
      data: compatDataWithSupportFor(["chrome"]),
      visibility: { ie: true },
      expected: {
        platforms: ["desktop", "mobile"],
        browsers: ["chrome", "firefox", "ie", "chrome_android"],
        hidden: { deno: "no-data", nodejs: "no-data" },
      },
    },
    {
      name: "visible browser on another platform adds that platform",
      category: "css",
      data: compatDataWithSupportFor(["chrome"]),
      visibility: { oculus: true },
      expected: {
        platforms: ["desktop", "mobile", "xr"],
        browsers: ["chrome", "firefox", "chrome_android", "oculus"],
        hidden: { deno: "no-data", nodejs: "no-data" },
      },
    },
    {
      name: "platform without visible browsers is dropped",
      category: "css",
      data: compatDataWithSupportFor(["chrome"]),
      visibility: { chrome_android: false },
      expected: {
        platforms: ["desktop"],
        browsers: ["chrome", "firefox"],
        hidden: { deno: "no-data", nodejs: "no-data" },
      },
    },
    {
      name: "hidden browser stays hidden even if made visible",
      category: "api",
      data: compatDataWithSupportFor(["chrome"]),
      visibility: { nodejs: true },
      expected: {
        platforms: ["desktop", "mobile"],
        browsers: ["chrome", "firefox", "chrome_android"],
        hidden: { deno: "no-data", nodejs: "no-data" },
      },
    },
    {
      name: "no visible browsers yields empty platforms",
      category: "css",
      data: compatDataWithSupportFor(["chrome"]),
      visibility: { chrome: false, firefox: false, chrome_android: false },
      expected: {
        platforms: [],
        browsers: [],
        hidden: { deno: "no-data", nodejs: "no-data" },
      },
    },
  ];

  for (const { name, category, data, visibility, expected } of cases) {
    it(name, () => {
      const [platforms, browsers, hidden] = gatherPlatformsAndBrowsers(
        category,
        data,
        browserInfo,
        /** @type {import("../../../components/compat-table/settings.js").BrowserVisibility} */ (
          visibility
        ),
      );
      assert.deepEqual({ platforms, browsers, hidden }, expected);
    });
  }
});
