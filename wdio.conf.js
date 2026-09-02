import { setTimeout as sleep } from "node:timers/promises";

import { SevereServiceError } from "webdriverio";

const FRED_PORT = process.env.FRED_PORT || "3000";

const baseUrl = `http://localhost:${FRED_PORT}/`;

const READY_TIMEOUT = 60_000;
const READY_INTERVAL = 1000;
const READY_URL = `${baseUrl}en-US/docs/MDN/Kitchensink`;

const windowsCI = process.env.CI && process.platform === "win32";

/** @type {WebdriverIO.Config} */
export const config = {
  runner: "local",
  specs: ["./test/specs/**/*.js"],
  maxInstances: 10,
  specFileRetries: windowsCI ? 1 : 0,
  capabilities: [
    {
      browserName: "firefox",
      browserVersion: "stable",
      "moz:firefoxOptions": {
        args: ["-headless"],
      },
    },
  ],
  services: [
    [
      "firefox-profile",
      {
        // Give the test framework permissions to read the clipboard:
        "dom.events.testing.asyncClipboard": true,
        "dom.events.testing.asyncClipboard.readText": true,
      },
    ],
  ],
  logLevel: "error",
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 120_000,
  },
  baseUrl,
  async onPrepare() {
    console.log("waiting for servers to start");
    const deadline = Date.now() + READY_TIMEOUT;
    while (Date.now() < deadline) {
      try {
        const res = await fetch(READY_URL, {
          signal: AbortSignal.timeout(deadline - Date.now()),
        });
        await res.text();
        if (res.ok) {
          return;
        }
      } catch {
        // no-op
      }
      await sleep(READY_INTERVAL);
    }
    // wdio ignores anything but a SevereServiceError
    throw new SevereServiceError(
      `server not ready after ${READY_TIMEOUT}ms: ${READY_URL}`,
    );
  },
};
