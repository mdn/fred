import path from "node:path";

import { config as base } from "./wdio.conf.js";

const FRED_ROOT = import.meta.dirname;

/** @type {WebdriverIO.Config} */
export const config = {
  ...base,
  specs: ["./test/specs/**/*.visual.js"],
  services: [
    ...(base.services ?? []),
    [
      "visual",
      {
        baselineFolder: path.join(FRED_ROOT, "test", "baseline"),
        screenshotPath: path.join(FRED_ROOT, "test", "tmp"),
        createJsonReportFiles: true,
      },
    ],
  ],
};
