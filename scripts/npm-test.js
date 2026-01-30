import { concurrently } from "concurrently";

concurrently(
  [
    {
      command: `npm run wdio`,
      name: "wdio",
      prefixColor: "green",
    },
    {
      cwd: process.env.CONTENT_REPO_ROOT,
      command: `npm start`,
      name: "content",
      prefixColor: "blue",
    },
  ],
  {
    killOthersOn: ["failure", "success"],
    restartTries: 0,
    successCondition: "first",
  },
);
