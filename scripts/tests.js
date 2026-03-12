import { rariBin } from "@mdn/rari";
import { concurrently } from "concurrently";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = await yargs(hideBin(process.argv))
  .option("content", {
    describe: "if specified, run fred from the content repo located here",
    type: "string",
  })
  .parse();

concurrently(
  [
    {
      command: `npm run wdio`,
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
      : [
          {
            command: `npm run preview`,
            name: "server",
            prefixColor: "red",
          },
          {
            command: `"${rariBin}" serve`,
            name: "rari",
            prefixColor: "blue",
          },
        ]),
  ],
  {
    killOthersOn: ["failure", "success"],
    restartTries: 0,
    successCondition: "first",
  },
);
