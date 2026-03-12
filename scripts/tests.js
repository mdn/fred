import { rariBin } from "@mdn/rari";
import { concurrently } from "concurrently";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = await yargs(hideBin(process.argv))
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
  .option("preview", {
    describe: "run fred preview",
    type: "boolean",
    default: false,
  })
  .option("content", {
    describe: "run fred and rari from this content repo",
    type: "string",
  })
  .conflicts({
    content: ["rari", "preview"],
  })
  .parse();

concurrently(
  [
    ...(argv.e2e
      ? [
          {
            command: `npm run wdio`,
            name: "wdio",
            prefixColor: "green",
          },
        ]
      : []),
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
    ...(argv.preview
      ? [
          {
            command: `npm run preview`,
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
);
