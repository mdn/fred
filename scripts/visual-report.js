import { execSync } from "node:child_process";
import path from "node:path";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const FRED_ROOT = path.join(import.meta.dirname, "..");

await yargs(hideBin(process.argv))
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
      if (argv.serve) await serve();
    },
  )
  .command("serve", "serve report", () => {}, serve)
  .demandCommand(1)
  .parse();

async function serve() {
  const { default: express } = await import("express");
  const WDIO_PORT = process.env.WDIO_PORT || "3002";
  const app = express();
  app.use("/", express.static(path.join(FRED_ROOT, "test", "tmp", "report")));
  app.listen(WDIO_PORT, () => {
    console.log(`WebdriverIO visual reporter started on port ${WDIO_PORT}`);
  });
}
