import { rm } from "node:fs/promises";
import path from "node:path";

import { rariBin } from "@mdn/rari";
import { concurrently } from "concurrently";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const FRED_ROOT = path.join(import.meta.dirname, "..");

const argv = await yargs(hideBin(process.argv))
  .option("lint", {
    describe: "run linters",
    type: "boolean",
    default: true,
  })
  .option("unit", {
    describe: "run unit tests",
    type: "boolean",
    default: true,
  })
  .option("e2e", {
    describe: "run e2e tests",
    type: "boolean",
    default: false,
  })
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
  })
  .parse();

const runs = [];

if (argv.lint) {
  runs.push(
    concurrently([
      {
        command: `npx lefthook run --force pre-push`,
        name: "lint",
        prefixColor: "cyan",
      },
    ]).result,
  );
}

if (argv.unit) {
  runs.push(
    concurrently([
      {
        command: `node --test "**/*.test.js"`,
        name: "unit",
        prefixColor: "yellow",
      },
    ]).result,
  );
}

if (argv.e2e) {
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

  runs.push(
    concurrently(jobs, {
      killOthersOn: ["failure", "success"],
      restartTries: 0,
      successCondition: "first",
    }).result,
  );
}

try {
  await Promise.all(runs);
} catch {
  process.exitCode = 1;
}
