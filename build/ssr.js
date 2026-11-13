import { once } from "node:events";
import { availableParallelism } from "node:os";
import { Worker } from "node:worker_threads";

import { RARI_BUILD_ROOT } from "./env.js";
import { crawl } from "./utils.js";

const BATCH_SIZE = 100;

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

/**
 * Renders batches in a worker thread until none are left.
 *
 * @param {Generator<string[]>} batches Shared between all workers.
 * @returns {Promise<number>} Number of rendered documents.
 */
async function runWorker(batches) {
  const worker = new Worker(new URL("ssr-worker.js", import.meta.url));
  const exit = once(worker, "exit");
  let rendered = 0;
  try {
    for (const batch of batches) {
      worker.postMessage(batch);
      const [count] = await Promise.race([
        once(worker, "message"),
        // Without this, a worker exiting early would leave us waiting forever.
        exit.then(([code]) => {
          throw new Error(`SSR worker exited unexpectedly with code ${code}`);
        }),
      ]);
      rendered += count;
    }
  } catch (error) {
    await worker.terminate();
    throw error;
  }
  // `terminate()` would drop console output the worker has not flushed yet.
  worker.postMessage(null);
  await exit;
  return rendered;
}

/**
 * @param {number} batchCount
 * @returns {number}
 */
function workerCount(batchCount) {
  const { SSR_WORKERS } = process.env;
  let max = availableParallelism();
  if (SSR_WORKERS) {
    const parsed = Number(SSR_WORKERS);
    if (Number.isSafeInteger(parsed) && parsed > 0) {
      max = parsed;
    } else {
      console.warn(
        `WARNING: Ignored SSR_WORKERS, expected a positive integer: ${SSR_WORKERS}`,
      );
    }
  }
  return Math.max(1, Math.min(max, batchCount));
}

async function ssrAllDocuments() {
  const files = await crawl(RARI_BUILD_ROOT, (filePath) =>
    filePath.endsWith("/index.json"),
  );

  const start = Date.now();

  const batches = chunks(files, BATCH_SIZE);
  const workers = workerCount(Math.ceil(files.length / BATCH_SIZE));
  const counts = await Promise.all(
    Array.from({ length: workers }, () => runWorker(batches)),
  );
  const count = counts.reduce((sum, n) => sum + n, 0);

  const end = Date.now();

  const seconds = (end - start) / 1000;
  const took = formatDuration(seconds);

  console.log(
    `Rendered ${count.toLocaleString()} of ${files.length.toLocaleString()} pages in ${took} using ${workers} ${workers === 1 ? "worker" : "workers"}, at a rate of ${(
      count / seconds
    ).toFixed(1)} documents per second.`,
  );
}

await ssrAllDocuments();
