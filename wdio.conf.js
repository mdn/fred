const FRED_PORT = process.env.FRED_PORT || "3000";

/** @type {WebdriverIO.Config} */
export const config = {
  runner: "local",
  specs: ["./test/specs/**/*.js"],
  maxInstances: 10,
  capabilities: [
    {
      browserName: "firefox",
      "moz:firefoxOptions": {
        args: ["-headless"],
      },
    },
  ],
  logLevel: "error",
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60_000,
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
};
