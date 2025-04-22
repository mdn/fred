import { Worker } from "node:worker_threads";

import { rspack } from "@rspack/core";
import express from "express";

import { createProxyMiddleware } from "http-proxy-middleware";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

import rspackConfig from "./rspack.config.js";

/**
 * @import { Request, Response } from "express";
 * @import { Stats } from "@rspack/core";
 */

if (process.env.NODE_ENV === "production") {
  throw new Error(
    "dev server doesn't support running with NODE_ENV=production",
  );
  // this is because when NODE_ENV=production we don't add a hash to the ssr output file
  // we need it to cachebust importing it in dev, but in prod we want a common name across builds
}

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Rari.BuiltPage} page
 */
async function serverRenderMiddleware(req, res, page) {
  try {
    /** @type {Stats} */
    const stats = res.locals.webpack.devMiddleware.stats;

    const compliationStats = stats.toJson().children;
    if (!compliationStats) {
      throw new Error("cannot parse the rspack config, did you modify it?");
    }

    const html = await new Promise((resolve, reject) => {
      // use worker so we have a fresh esm cache each page load
      const worker = new Worker(
        new URL("build/server-worker.js", import.meta.url),
        {
          /** @type {import("./build/types.js").WorkerData} */
          workerData: {
            reqPath: req.path,
            page,
            compliationStats,
          },
        },
      );

      worker.on("message", ({ html, error }) => {
        error ? reject(error) : resolve(html);
      });
    });

    res.writeHead(res.statusCode, {
      "Content-Type": "text/html",
    });
    res.end(html);
  } catch (error) {
    console.error("SSR render error:", error);
    res.writeHead(500).end();
  }
}

/**
 * @param {import("http").IncomingMessage} stream
 * @returns {Promise<Buffer>}
 */
const streamToBuffer = (stream) =>
  new Promise((resolve, reject) => {
    /** @type {Buffer[]} */
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });

export async function startDevServer() {
  const app = express();

  const rspackCompiler = rspack(rspackConfig);

  app.use(
    // @ts-expect-error
    webpackDevMiddleware(rspackCompiler, {
      serverSideRender: true,
      writeToDisk: true,
    }),
  );

  // @ts-expect-error
  app.use(webpackHotMiddleware(rspackCompiler));

  app.get("/", async (_req, res, _next) => {
    res.writeHead(302, {
      Location: "/en-US/",
    });
    res.end();
  });

  app.all(
    "/api/*_",
    createProxyMiddleware({
      target: `https://developer.allizom.org`,
      changeOrigin: true,
      proxyTimeout: 20_000,
      timeout: 20_000,
      headers: {
        Connection: "keep-alive",
      },
    }),
  );

  app.use(
    createProxyMiddleware({
      target: `http://localhost:8083`,
      changeOrigin: true,
      proxyTimeout: 20_000,
      timeout: 20_000,
      headers: {
        Connection: "keep-alive",
      },
      selfHandleResponse: true,
      on: {
        proxyRes: async (proxyRes, req, res) => {
          const contentType = proxyRes.headers["content-type"] || "";
          const statusCode = proxyRes.statusCode || 500;

          if (!contentType && statusCode === 404) {
            // render 404 page
            res.statusCode = 404;
            const notFoundRes = await fetch(
              `http://localhost:8083/en-US/404/index.json`,
            );
            const json = await notFoundRes.json();
            return serverRenderMiddleware(req, res, json);
          }

          if (
            !contentType.includes("application/json") ||
            req.path.endsWith(".json")
          ) {
            // stream assets
            res.writeHead(statusCode, proxyRes.headers);
            proxyRes.pipe(res);
            return;
          }

          const buffer = await streamToBuffer(proxyRes);
          const json = JSON.parse(buffer.toString("utf8"));

          if ("renderer" in json) {
            return serverRenderMiddleware(req, res, json);
          }

          res.writeHead(statusCode, proxyRes.headers);
          res.end(buffer);
        },
      },
    }),
  );

  const httpServer = app.listen(3000, () => {
    console.log(`Server started at http://localhost:3000`);
  });

  return {
    close: async () => {
      httpServer.close();
    },
  };
}

await startDevServer();
