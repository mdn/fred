import { rariBin } from "@mdn/rari";
import { concurrently } from "concurrently";

concurrently(
  [
    {
      command: `npm run wdio`,
      name: "wdio",
      prefixColor: "green",
    },
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
  ],
  {
    killOthersOn: ["failure", "success"],
    restartTries: 0,
    successCondition: "first",
  },
);
