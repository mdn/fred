import { readFile, writeFile } from "node:fs/promises";

import { fdir } from "fdir";

import { RARI_BUILD_ROOT } from "./env.js";
import { render } from "./render.js";

/**
 * @template T
 * @param {T[]} array
 * @param {number} size
 * @yields {T[]}
 * @returns {Generator<T[]>}
 */
function* chunks(array, size) {
  for (let i = 0; i < array.length; i += size) {
    yield array.slice(i, i + size);
  }
}

/**
 * @param {number} seconds
 * @returns {string}
 */
function formatDuration(seconds) {
  return seconds > 60
    ? `${(seconds / 60).toFixed(1)} minutes`
    : `${seconds.toFixed(1)} seconds`;
}

async function ssrAllDocuments() {
  const files = await findDocuments();

  const start = Date.now();

  const renderedFiles = [];
  for (const chunk of chunks(files, 1000)) {
    const out = await Promise.all(
      chunk.map((file) => ssrSingleDocument(file)).filter(Boolean),
    );
    renderedFiles.push(...out);
  }

  const end = Date.now();

  const count = renderedFiles.length;
  const seconds = (end - start) / 1000;
  const took = formatDuration(seconds);

  console.log(
    `Rendered ${count.toLocaleString()} pages in ${took}, at a rate of ${(
      count / seconds
    ).toFixed(1)} documents per second.`,
  );
}

async function findDocuments() {
  const api = new fdir()
    .withFullPaths()
    .withErrors()
    .filter((filePath) => filePath.endsWith("/index.json"))
    .crawl(RARI_BUILD_ROOT);
  const docs = await api.withPromise();
  return docs;
}

/**
 * @param {string} file
 * @returns {Promise<string | undefined>}
 */
async function ssrSingleDocument(file) {
  const context = JSON.parse(await readFile(file, "utf8"));
  if (!context?.url) {
    console.warn(
      `WARNING: Skipped rendering HTML. Document is missing url: ${file}`,
    );
    return;
  }
  try {
    const html = await render(context);
    const outputFile = file.replace(/.json$/, ".html");
    await writeFile(outputFile, html);
    return outputFile;
  } catch (error) {
    console.error(`ERROR: Failed to render ${context.url}: ${error}`);
    return;
  }
}

await ssrAllDocuments();
