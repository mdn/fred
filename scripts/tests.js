import { execSync } from "node:child_process";
import { rm } from "node:fs/promises";
import path from "node:path";

import { rariBin } from "@mdn/rari";
import { concurrently } from "concurrently";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const FRED_ROOT = path.join(import.meta.dirname, "..");

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
        .option("update-visual-baseline", {
          describe: "update visual diff baseline",
          type: "boolean",
          default: false,
        })
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
          if (argv["update-visual-baseline"] && !argv.e2e) {
            throw new Error("--update-visual-baseline requires --e2e");
          }
          return true;
        }),
    async (argv) => {
      await rm(path.join(FRED_ROOT, "test", "tmp"), {
        recursive: true,
        force: true,
      });

      if (argv["update-visual-baseline"]) {
        await rm(path.join(FRED_ROOT, "test", "baseline"), {
          recursive: true,
          force: true,
        });
      }

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
