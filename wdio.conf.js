export const config = {
  runner: "local",
  specs: ["./test/specs/**/*.js"],
  maxInstances: 10,
  capabilities: [
    {
      browserName: "firefox",
    },
  ],
  logLevel: "info",
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60_000,
  },
};
