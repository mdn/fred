import { execSync } from "node:child_process";

import { rariBin } from "@mdn/rari";
import { concurrently } from "concurrently";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

await yargs(hideBin(process.argv))
  .command("lint", "run linters", {}, () => {
    try {
      execSync(`npx lefthook run --force pre-push`, { stdio: "inherit" });
    } catch {
      process.exitCode = 1;
    }
  })
  .command("unit", "run unit tests", {}, () => {
    try {
      execSync(`node --test "**/*.test.js"`, { stdio: "inherit" });
    } catch {
      process.exitCode = 1;
    }
  })
  .command(
    "e2e",
    "run e2e tests",
    (yargs) =>
      yargs
        .option("rari", {
          describe: "run rari",
          type: "boolean",
          default: false,
        })
        .option("fred", {
          describe: "run fred in this mode",
          type: "string",
          choices: ["preview", "dev"],
        })
        .option("content", {
          describe: "run fred and rari from this content repo",
          type: "string",
        })
        .check((argv) => {
          if (argv.content && (argv.rari || argv.fred)) {
            throw new Error("--content cannot be used with --rari or --fred");
          }
          return true;
        }),
    async (argv) => {
      /** @type {import("concurrently").ConcurrentlyCommandInput[]} */
      const jobs = [
        {
          command: `npx wdio run wdio.conf.js`,
          name: "wdio",
          prefixColor: "green",
        },
      ];

      if (argv.content) {
        jobs.push({
          cwd: argv.content,
          command: `npm start`,
          name: "content",
          prefixColor: "blue",
        });
      }

      if (argv.fred === "preview") {
        jobs.push({
          command: `npm run preview`,
          name: "server",
          prefixColor: "red",
        });
      }

      if (argv.fred === "dev") {
        jobs.push({
          command: `npm run dev`,
          name: "server",
          prefixColor: "red",
        });
      }

      if (argv.rari) {
        jobs.push({
          command: `"${rariBin}" serve`,
          name: "rari",
          prefixColor: "blue",
        });
      }

      try {
        await concurrently(jobs, {
          killOthersOn: ["failure", "success"],
          restartTries: 0,
          successCondition: "first",
        }).result;
      } catch {
        process.exitCode = 1;
      }
    },
  )
  .demandCommand()
  .parseAsync();
