import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { VALID_LOCALES } from "../constants.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const root = path.join(dirname, "..", "..");

function buildRedirects() {
  const redirectMap = new Map();

  for (const envvar of ["CONTENT_ROOT", "CONTENT_TRANSLATED_ROOT"]) {
    if (!process.env[envvar]) {
      console.error(`Missing ENV variable: ${envvar}`);
      continue;
    }

    const base = process.env[envvar];
    console.log(`${envvar} = ${base}`);

    for (const locale of VALID_LOCALES.keys()) {
      const path = [
        // Absolute path.
        `${base}/${locale}/_redirects.txt`,
        `${base}/files/${locale}/_redirects.txt`,
        // Relative path.
        `${root}/${base}/${locale}/_redirects.txt`,
        `${root}/${base}/files/${locale}/_redirects.txt`,
      ].find((path) => fs.existsSync(path));

      if (path) {
        const content = fs.readFileSync(path, "utf8");
        const lines = content.split("\n");
        const redirectLines = lines.filter(
          (line) => line.startsWith("/") && line.includes("\t"),
        );
        for (const redirectLine of redirectLines) {
          const [source, target] = redirectLine.split("\t", 2);
          if (source && target) {
            redirectMap.set(source.toLowerCase(), target);
          }
        }
        console.log(`- ${path}: ${redirectLines.length} redirects`);
      }
    }
  }

  const output = "redirects.json";

  fs.writeFileSync(output, JSON.stringify(Object.fromEntries(redirectMap)));

  const count = redirectMap.size;
  const kb = Math.round(fs.statSync(output).size / 1024);
  console.log(`Wrote ${count} redirects in ${kb} KB.`);
}

buildRedirects();
