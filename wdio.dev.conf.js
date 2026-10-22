import { config as baseConfig } from "./wdio.conf.js";

/** @type {WebdriverIO.Config} */
export const config = {
  ...baseConfig,
  specs: ["./test/specs-dev/**/*.js"],
  maxInstances: 1,
};
