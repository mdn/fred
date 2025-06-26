import { readFile } from "node:fs/promises";
import { Worker } from "node:worker_threads";

import { rspack } from "@rspack/core";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";

import { createProxyMiddleware } from "http-proxy-middleware";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

import rspackConfig from "./rspack.config.js";
import { handleRunner } from "./vendor/yari/libs/play/index.js";

import "source-map-support/register.js";

/**
 * @import { Request, Response } from "express";
 * @import { Stats } from "@rspack/core";
 */

let devMode = true;
/** @type {import("./build/render.js").render | undefined} */
let prodRender;

if (process.env.NODE_ENV === "production") {
  devMode = false;
  try {
    const { render } = await import("./build/render.js");
    prodRender = render;
  } catch (error) {
    throw typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ERR_MODULE_NOT_FOUND"
      ? new Error(
          "can't find `dist/ssr/index.js`: did you forget to `npm run build`?",
        )
      : error;
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 * @param {import("@rari").BuiltPage} page
 */
async function serverRenderMiddleware(req, res, page) {
  try {
    let html;
    if (prodRender) {
      // implies devMode === false
      html = await prodRender(page);
    } else {
      /** @type {Stats} */
      const stats = res.locals.webpack.devMiddleware.stats;

      const compilationStats = stats.toJson().children;
      if (!compilationStats) {
        throw new Error("cannot parse the rspack config, did you modify it?");
      }

      html = await new Promise((resolve, reject) => {
        // use worker so we have a fresh esm cache each page load
        const worker = new Worker(
          new URL("build/server-worker.js", import.meta.url),
          {
            /** @type {import("./build/types.js").WorkerData} */
            workerData: {
              reqPath: req.path,
              page,
              compilationStats,
            },
          },
        );

        worker.on("message", ({ html, error }) => {
          error ? reject(error) : resolve(html);
        });
      });
    }

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

export async function startServer() {
  let app = express();

  if (devMode) {
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
  } else {
    app.use(compression());
    app.use("/static", express.static("dist"));
  }

  app.get("/", async (_req, res, _next) => {
    res.writeHead(302, {
      Location: "/en-US/",
    });
    res.end();
  });

  app.all(
    ["/api/*_", "/users/*_", "/pong/*_", "/pimg/*_"],
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

          if (req.path === "/sandbox") {
            return serverRenderMiddleware(req, res, {
              // @ts-expect-error
              renderer: "Sandbox",
              pageTitle: "Fred sandbox",
            });
          }

          if (
            (!contentType || contentType.includes("text/plain")) &&
            statusCode === 404
          ) {
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

  const play = express();

  play.use(cookieParser());

  play.get(["/*_/runner.html", "/runner.html"], (req, res) => {
    handleRunner(req, res);
  });

  play.get(
    "/shared-assets/*_",
    createProxyMiddleware({
      target: "https://mdn.github.io/shared-assets/",
      pathRewrite: {
        "^/shared-assets/": "/",
      },
      changeOrigin: true,
      autoRewrite: true,
      xfwd: true,
    }),
  );

  let http2 = false;
  if (process.env.HTTPS === "true") {
    http2 = true;
    // @ts-expect-error
    const { default: spdy } = await import("spdy");
    app = spdy.createServer(
      {
        key: await readFile(
          process.env.HTTPS_CERT_FILE || "build/localhost-privkey.pem",
        ),
        cert: await readFile(
          process.env.HTTPS_KEY_FILE || "build/localhost-cert.pem",
        ),
      },
      app,
    );
  }

  const httpServer = app.listen(3000, () => {
    console.log(
      `Server started at ${http2 ? "https" : "http"}://localhost:3000`,
    );
  });

  const playServer = play.listen(3001, () => {
    console.log(`Play server started at http://localhost:3001`);
  });

  return {
    close: async () => {
      httpServer.close();
      playServer.close();
    },
  };
}

await startServer();
