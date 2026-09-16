#!/usr/bin/env node
// Drop the subcommand so the remaining arguments are exposed to the
// delegated script as if it had been invoked directly.
const [command] = process.argv.splice(2, 1);

const usage = "Usage: fred <server|ssr>";

switch (command) {
  case "server":
    await import("../scripts/server.js");
    break;
  case "ssr":
    await import("../build/ssr.js");
    break;
  case "--help":
  case "-h":
    console.log(usage);
    break;
  default:
    console.error(
      command
        ? `fred: unknown command ${JSON.stringify(command)}`
        : "fred: missing command",
    );
    console.error(usage);
    process.exitCode = 1;
}
