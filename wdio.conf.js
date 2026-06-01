const FRED_PORT = process.env.FRED_PORT || "3000";

/** Attempt to workaround https://github.com/nodejs/node/issues/56645 */
async function letConnectionsClose() {
  if (process.platform === "win32") {
    // Drain Node's internal fetch (undici) connection pool, then give the
    // remaining handles (BiDi WebSocket, worker IPC) time to finish closing,
    // so nothing is still tearing down when the process exits.
    // @ts-expect-error
    await globalThis[Symbol.for("undici.globalDispatcher.1")]?.close();
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

/** @type {WebdriverIO.Config} */
export const config = {
  runner: "local",
  specs: ["./test/specs/**/*.js"],
  maxInstances: 10,
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
  baseUrl: `http://localhost:${FRED_PORT}/`,
  async before(_, __, browser) {
    console.log("waiting for servers to start");
    await browser.waitUntil(
      async () => {
        try {
          await browser.url(`http://localhost:${FRED_PORT}`);
          await browser.url("http://localhost:8083");
          return true;
        } catch {
          return false;
        }
      },
      {
        timeout: 30_000,
        timeoutMsg: "Server not available after 30 seconds",
        interval: 1000,
      },
    );
  },
  afterSession: letConnectionsClose,
  onComplete: letConnectionsClose,
};
