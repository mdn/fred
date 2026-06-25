import { execSync } from "node:child_process";
import { rm } from "node:fs/promises";
import path from "node:path";

import { rariBin } from "@mdn/rari";
import { concurrently } from "concurrently";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

/**
 * @import { ArgumentsCamelCase, InferredOptionTypes, Options } from "yargs"
 * @typedef {ArgumentsCamelCase<InferredOptionTypes<typeof e2eOptions>>} E2eArgv
 * @typedef {ArgumentsCamelCase<InferredOptionTypes<typeof visualOptions>>} VisualArgv
 */

const FRED_ROOT = path.join(import.meta.dirname, "..");

const MAX_WDIO_RETRIES = 3;

// node bug causing crash in windows, drop when fixed upstream:
// https://github.com/nodejs/node/issues/56645
const WINDOWS_STACK_BUFFER_OVERRUN = 3_221_226_505;

/** @param {unknown} closeEvents */
function isRetryableWdioCrash(closeEvents) {
  return (
    Array.isArray(closeEvents) &&
    closeEvents.some(
      (event) =>
        event?.command?.name === "wdio" &&
        !event.killed &&
        event.exitCode === WINDOWS_STACK_BUFFER_OVERRUN,
    )
  );
}

const e2eOptions = /** @satisfies {Record<string, Options>} */ ({
  rari: { describe: "run rari", type: "boolean", default: false },
  fred: {
    describe: "run fred in this mode",
    type: "string",
    choices: ["preview", "dev"],
  },
  content: {
    describe: "run fred and rari from this content repo",
    type: "string",
  },
});

const visualOptions = /** @satisfies {Record<string, Options>} */ ({
  ...e2eOptions,
  "update-baseline": {
    describe: "update visual diff baseline",
    type: "boolean",
    default: false,
  },
});

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
    (yargs) => yargs.options(e2eOptions).check(checkWdioArgs),
    async (argv) => {
      await runWdio("e2e", argv);
    },
  )
  .command(
    "visual",
    "run visual tests",
    (yargs) => yargs.options(visualOptions).check(checkWdioArgs),
    async (argv) => {
      await runWdio("visual", argv);
    },
  )
  .command(
    "visual-report",
    "manage visual test reports",
    (yargs) =>
      yargs
        .command(
          "generate",
          "generate report",
          (yargs) =>
            yargs.option("serve", {
              describe: "serve report after generation",
              type: "boolean",
              default: false,
            }),
          async (argv) => {
            const jsonOutput = path.join(
              FRED_ROOT,
              "test",
              "tmp",
              "actual",
              "output.json",
            );
            const reportFolder = path.join(FRED_ROOT, "test", "tmp");
            execSync(
              `npx wdio-visual-reporter --jsonOutput="${jsonOutput}" --reportFolder="${reportFolder}"`,
              { stdio: "inherit" },
            );
            if (argv.serve) await serveVisualReport();
          },
        )
        .command("serve", "serve report", () => {}, serveVisualReport)
        .demandCommand(1),
    () => {},
  )
  .demandCommand()
  .parseAsync();

/** @param {E2eArgv} argv */
function checkWdioArgs(argv) {
  if (argv.content && (argv.rari || argv.fred)) {
    throw new Error("--content cannot be used with --rari or --fred");
  }
  return true;
}

/**
 * @param {string} suite
 * @param {E2eArgv} argv
 */
async function runWdio(suite, argv) {
  await rm(path.join(FRED_ROOT, "test", "tmp"), {
    recursive: true,
    force: true,
  });

  if (argv.updateBaseline) {
    await rm(path.join(FRED_ROOT, "test", "baseline"), {
      recursive: true,
      force: true,
    });
  }

  const configFile =
    suite === "visual" ? "wdio.visual.conf.js" : "wdio.conf.js";

  /** @type {import("concurrently").ConcurrentlyCommandInput[]} */
  const jobs = [
    {
      command: `npx wdio run ${configFile}`,
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

  for (let attempt = 0; ; attempt++) {
    try {
      await concurrently(jobs, {
        killOthersOn: ["failure", "success"],
        restartTries: 0,
        successCondition: "first",
      }).result;
      break;
    } catch (error) {
      if (attempt < MAX_WDIO_RETRIES && isRetryableWdioCrash(error)) {
        console.warn(
          `wdio crashed with Windows exit code ${WINDOWS_STACK_BUFFER_OVERRUN} ` +
            `(attempt ${attempt + 1}/${MAX_WDIO_RETRIES + 1}); retrying`,
        );
        continue;
      }
      process.exitCode = 1;
      break;
    }
  }
}

async function serveVisualReport() {
  const { default: express } = await import("express");
  const WDIO_PORT = process.env.WDIO_PORT || "3002";
  const app = express();
  app.use("/", express.static(path.join(FRED_ROOT, "test", "tmp", "report")));
  app.listen(WDIO_PORT, () => {
    console.log(`WebdriverIO visual reporter started on port ${WDIO_PORT}`);
  });
}
