import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  DEFAULT_BROWSERS,
  isBrowserVisible,
} from "../../../components/compat-table/settings.js";

describe("isBrowserVisible", () => {
  const cases = [
    {
      name: "default browser without saved choice is visible",
      browser: "firefox",
      visibility: {},
      expected: true,
    },
    {
      name: "non-default browser without saved choice is hidden",
      browser: "ie",
      visibility: {},
      expected: false,
    },
    {
      name: "saved choice hides a default browser",
      browser: "firefox",
      visibility: { firefox: false },
      expected: false,
    },
    {
      name: "saved choice shows a non-default browser",
      browser: "ie",
      visibility: { ie: true },
      expected: true,
    },
    {
      name: "browser added after saving follows the default (visible)",
      browser: "chrome",
      visibility: { firefox: false, ie: true },
      expected: true,
    },
    {
      name: "unknown browser added after saving is hidden",
      browser: "newbrowser",
      visibility: { firefox: false },
      expected: false,
    },
  ];

  for (const { name, browser, visibility, expected } of cases) {
    it(name, () => {
      assert.equal(
        isBrowserVisible(
          /** @type {import("@bcd").BrowserName} */ (browser),
          visibility,
        ),
        expected,
      );
    });
  }

  it("defaults are a plain allowlist", () => {
    assert.ok(DEFAULT_BROWSERS.includes("chrome"));
    assert.ok(!DEFAULT_BROWSERS.includes("ie"));
  });
});
