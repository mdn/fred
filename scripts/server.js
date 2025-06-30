#!/usr/bin/env node
import { fileURLToPath } from "node:url";

import { rariBin } from "@mdn/rari";
import { concurrently } from "concurrently";

export const server = fileURLToPath(import.meta.resolve("../server.js"));

const { commands, result } = concurrently(
  [
    {
      command: `node ${server}`,
      name: "server",
      env: {
        ...process.env,
      },
      prefixColor: "red",
    },
    {
      command: `"${rariBin}" serve -vv`,
      name: "rari",
      prefixColor: "blue",
    },
  ],
  {
    killOthersOn: ["failure", "success"],
    restartTries: 0,
    handleInput: true,
    inputStream: process.stdin,
  },
);

const stop = new Promise((resolve, reject) => {
  process.on("SIGINT", () => {
    for (const cmd of commands) cmd.kill(); // Terminate all concurrently-run processes
    reject();
  });
  result.finally(() => resolve(null));
});
try {
  await stop;
  console.log("All tasks completed successfully.");
} catch {
  console.log("Killed ☠️");
}
