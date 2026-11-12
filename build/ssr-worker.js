import { readFile, writeFile } from "node:fs/promises";
import { parentPort } from "node:worker_threads";

import { render } from "./render.js";

// Rendering is CPU-bound, so this only overlaps file I/O.
const IO_CONCURRENCY = 8;

/**
 * @param {string} file
 * @returns {Promise<boolean>} Whether the document was rendered.
 */
async function ssrSingleDocument(file) {
  const context = JSON.parse(await readFile(file, "utf8"));
  if (!context?.url) {
    console.warn(
      `WARNING: Skipped rendering HTML. Document is missing url: ${file}`,
    );
    return false;
  }
  try {
    const html = await render(context);
    const outputFile = file.replace(/.json$/, ".html");
    await writeFile(outputFile, html);
    return true;
  } catch (error) {
    console.error(`ERROR: Failed to render ${context.url}: ${error}`);
    return false;
  }
}

parentPort?.on("message", async (/** @type {string[] | null} */ files) => {
  if (files === null) {
    // No more batches: closing the port lets the thread exit on its own.
    parentPort?.close();
    return;
  }
  const queue = files.values();
  let rendered = 0;
  await Promise.all(
    Array.from({ length: IO_CONCURRENCY }, async () => {
      for (const file of queue) {
        if (await ssrSingleDocument(file)) {
          rendered++;
        }
      }
    }),
  );
  parentPort?.postMessage(rendered);
});
