import { rariBin } from "@mdn/rari";
import { concurrently } from "concurrently";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

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
  .conflicts({
    content: ["rari", "fred"],
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
  runs.push(
    concurrently(
      [
        {
          command: `npx wdio run ./wdio.conf.js`,
          name: "wdio",
          prefixColor: "green",
        },
        ...(argv.content
          ? [
              {
                cwd: argv.content,
                command: `npm start`,
                name: "content",
                prefixColor: "blue",
              },
            ]
          : []),
        ...(argv.fred === "preview"
          ? [
              {
                command: `npm run preview`,
                name: "server",
                prefixColor: "red",
              },
            ]
          : []),
        ...(argv.fred === "dev"
          ? [
              {
                command: `npm run dev`,
                name: "server",
                prefixColor: "red",
              },
            ]
          : []),
        ...(argv.rari
          ? [
              {
                command: `"${rariBin}" serve`,
                name: "rari",
                prefixColor: "blue",
              },
            ]
          : []),
      ],
      {
        killOthersOn: ["failure", "success"],
        restartTries: 0,
        successCondition: "first",
      },
    ).result,
  );
}

try {
  await Promise.all(runs);
} catch {
  process.exitCode = 1;
}
