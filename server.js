import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { Worker } from "node:worker_threads";

import cookieParser from "cookie-parser";
import express from "express";
import he from "he";
import { createProxyMiddleware } from "http-proxy-middleware";
import { getEditorInfo } from "open-editor";

import { FRED_BUILD_ROOT } from "./build/env.js";
import {
  OPEN_BROWSER_ON_START,
  PLAYGROUND_PORT,
  PORT,
  WRITER_MODE,
} from "./components/env/index.js";
import { handleRunner } from "./vendor/yari/libs/play/index.js";

import "source-map-support/register.js";
/**
 * @import { Request, Response } from "express";
 * @import { Stats } from "@rspack/core";
 */

let devMode = true;
const rariManagedByFred = process.env.RARI_MANAGED_BY_FRED === "true";
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
          `can't find ${FRED_BUILD_ROOT}/ssr/index.js: did you forget to \`npm run build\`?`,
        )
      : error;
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 * @param {import("@fred").RenderPage} page
 */
async function serverRenderMiddleware(req, res, page) {
  try {
    let html;
    /** @type {import("@fred").PartialContext} */
    const context = {
      localServer: true,
      ...page,
    };
    if (prodRender) {
      // implies devMode === false
      html = await prodRender(context);
    } else {
      /** @type {Stats} */
      const stats = res.locals.webpack.devMiddleware.stats;

      const compilationStats = stats.toJson({ entrypoints: true }).children;
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
              context,
              compilationStats,
            },
          },
        );

        worker.on("message", ({ html, error }) => {
          if (error) {
            reject(error);
          } else {
            resolve(html);
          }
        });
      });
    }

    res.writeHead(res.statusCode, {
      "Content-Type": "text/html",
      "Content-Length": Buffer.byteLength(html),
    });
    res.end(res.locals.wasHead ? undefined : html);
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
    stream.on("data", (chunk) => {
      chunks.push(chunk);
    });
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });

/**
 * @param {import("express").Request} req
 * @returns {boolean}
 */
const isDocumentRequest = (req) =>
  req.method === "GET" &&
  !req.path.endsWith(".json") &&
  !!(
    req.headers["sec-fetch-dest"] === "document" ||
    req.headers.accept?.includes("text/html")
  );

/** @type {Set<string>} */
const loggedRariProxyErrors = new Set();

/**
 * @param {Error} error
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {string} rariUrl
 */
const handleRariProxyError = (error, req, res, rariUrl) => {
  if (res.headersSent || res.destroyed) {
    return;
  }

  const errorCode =
    "code" in error && typeof error.code === "string" ? error.code : error.name;
  // Log once per code: the fallback page retries every 3 seconds.
  if (!loggedRariProxyErrors.has(errorCode)) {
    loggedRariProxyErrors.add(errorCode);
    console.error(`Rari proxy error (${errorCode}) for ${rariUrl}:`, error);
  }

  if (!isDocumentRequest(req)) {
    const message = rariManagedByFred
      ? `Rari may still be starting at ${rariUrl} (${errorCode}). If this persists, check the Rari terminal output.\n`
      : `Rari is not available at ${rariUrl} (${errorCode}). Start it separately with: node --env-file=.env --run rari -- serve, or check that an existing Rari process is running.\n`;
    res.writeHead(503, {
      "Cache-Control": "no-store",
      "Content-Length": Buffer.byteLength(message),
      "Content-Type": "text/plain; charset=utf-8",
      "Retry-After": "3",
    });
    res.end(res.locals.wasHead ? undefined : message);
    return;
  }

  const escapedRariUrl = he.encode(rariUrl);
  const escapedErrorCode = he.encode(errorCode);
  const guidance = rariManagedByFred
    ? `<p>Rari may still be starting. This page will retry automatically.</p>
    <p>If this persists, check the Rari terminal output for startup errors.</p>`
    : `<p>Rari may still be starting, or it may not be running yet. This page will retry automatically.</p>
    <p>Start Rari separately with:</p>
    <pre><code>node --env-file=.env --run rari -- serve</code></pre>
    <p>Or check that an existing Rari process is running.</p>`;
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="3">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Waiting for Rari</title>
    <style>
      body { color: #1b1b1b; font: 1rem/1.5 system-ui, sans-serif; margin: 3rem auto; max-width: 42rem; padding: 0 1rem; }
      code { background: #eee; padding: .15rem .3rem; }
      pre { background: #eee; overflow: auto; padding: 1rem; }
    </style>
  </head>
  <body>
    <h1>Waiting for Rari</h1>
    <p>Fred could not connect to Rari at <code>${escapedRariUrl}</code>.</p>
    <p>Error: <code>${escapedErrorCode}</code></p>
    <p><a href="">Retry now</a></p>
    ${guidance}
  </body>
</html>`;

  res.writeHead(503, {
    "Cache-Control": "no-store",
    "Content-Length": Buffer.byteLength(html),
    "Content-Type": "text/html; charset=utf-8",
    "Retry-After": "3",
  });
  res.end(res.locals.wasHead ? undefined : html);
};

export async function startServer() {
  let app = express();

  if (devMode) {
    const { rspack } = await import("@rspack/core");
    const { default: rspackConfig } = await import("./rspack.config.js");
    const { default: webpackDevMiddleware } =
      await import("webpack-dev-middleware");
    const { default: webpackHotMiddleware } =
      await import("webpack-hot-middleware");

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
    const { default: compression } = await import("compression");
    app.use(compression());
  }

  app.use("/", express.static(FRED_BUILD_ROOT));

  // Don't fall through to rari, express.static above should've served it:
  app.use("/static/*_", (_req, res) => {
    res.writeHead(404).end();
  });

  app.get("/", async (_req, res, _next) => {
    res.writeHead(302, {
      Location: "/en-US/",
    });
    res.end();
  });

  const CF_URL = process.env.CF_URL;
  app.all(
    [
      "/opensearch.xml",
      "/api/v1/search/suggestions",
      "/api/v1/search/go",
      "/pong/*_",
      "/pimg/*_",
    ],
    CF_URL
      ? createProxyMiddleware({
          target: CF_URL,
          changeOrigin: true,
          proxyTimeout: 20_000,
          timeout: 20_000,
          headers: {
            Connection: "keep-alive",
          },
        })
      : (_req, res) => {
          res.writeHead(502).end();
        },
  );

  const RUMBA_URL = process.env.RUMBA_URL;
  app.all(
    ["/api/*_", "/users/*_"],
    RUMBA_URL
      ? createProxyMiddleware({
          target: RUMBA_URL,
          changeOrigin: true,
          proxyTimeout: 20_000,
          timeout: 20_000,
          headers: {
            Connection: "keep-alive",
          },
        })
      : (_req, res) => {
          res.writeHead(502).end();
        },
  );

  if (WRITER_MODE) {
    app.get("/_open", async (req, res) => {
      const { filepath } = req.query;
      const { CONTENT_ROOT, CONTENT_TRANSLATED_ROOT } = process.env;
      if (typeof filepath === "string") {
        const absolutePath = path.resolve(
          (filepath.startsWith("en-us")
            ? CONTENT_ROOT
            : CONTENT_TRANSLATED_ROOT) || "",
          filepath,
        );
        console.log(
          `Attempting to open ${absolutePath} with ${process.env.EDITOR}`,
        );
        const { binary, arguments: args } = getEditorInfo([absolutePath]);
        const child = spawn(binary, args, { detached: true, stdio: "ignore" });

        child.on("error", (error) => {
          console.error("Failed to open editor:", error);
          return;
        });
        child.unref();
      }
      res.sendStatus(204);
    });
  }

  const RARI_URL = process.env.RARI_URL || "http://localhost:8083";

  // Convert HEAD requests to GET so Rari returns full response for rendering
  app.use((req, res, next) => {
    if (req.method === "HEAD") {
      req.method = "GET";
      res.locals.wasHead = true;
    }
    next();
  });

  app.get("/sandbox", (_req, res) => {
    res.redirect(302, "/en-US/sandbox");
  });

  app.get(
    ["/:locale/sandbox", "/:locale/sandbox/:component"],
    async (req, res) => {
      const { component } = req.params;

      await serverRenderMiddleware(req, res, {
        renderer: "Sandbox",
        pageTitle: component ? `${component} sandbox` : "Fred sandbox",
        url: req.path,
        sandbox: {
          component,
        },
      });
    },
  );

  app.use(
    createProxyMiddleware({
      target: RARI_URL,
      changeOrigin: true,
      proxyTimeout: 20_000,
      timeout: 20_000,
      headers: {
        Connection: "keep-alive",
      },
      selfHandleResponse: true,
      on: {
        proxyReq: async (req) => {
          const locale = req.path.split("/", 2)[1];
          if (locale && /^q[a-t][a-z]$/.test(locale)) {
            // if the locale matches a qaa...qtz private use language tag,
            // which we use for testing fluent with pseudo-locales,
            // load the en-US doc from rari
            req.path = req.path.replace(locale, "en-US");
          }
        },
        proxyRes: async (proxyRes, req, res) => {
          const contentType = proxyRes.headers["content-type"] || "";
          const statusCode = proxyRes.statusCode || 500;

          if (
            (!contentType || contentType.includes("text/plain")) &&
            statusCode === 404
          ) {
            // render 404 page
            res.statusCode = 404;
            const locale = req.url?.match(/[^/]+/)?.[0] ?? "en-us";
            const notFoundRes = await fetch(
              `http://localhost:8083/${locale}/404/index.json`,
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
        ...((devMode || WRITER_MODE) && {
          error: (error, req, res) => {
            if ("locals" in res) {
              handleRariProxyError(error, req, res, RARI_URL);
            }
          },
        }),
      },
    }),
  );

  let play = express();

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

  // live sample assets
  play.use(
    createProxyMiddleware({
      target: RARI_URL,
      changeOrigin: true,
      proxyTimeout: 20_000,
      timeout: 20_000,
      headers: {
        Connection: "keep-alive",
      },
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
    play = spdy.createServer(
      {
        key: await readFile(
          process.env.HTTPS_CERT_FILE || "build/localhost-privkey.pem",
        ),
        cert: await readFile(
          process.env.HTTPS_KEY_FILE || "build/localhost-cert.pem",
        ),
      },
      play,
    );
  }

  const httpServer = app.listen(PORT, () => {
    const scheme = http2 ? "https" : "http";
    const url = `${scheme}://localhost:${PORT}`;
    console.log(`Server started at ${url}`);
    // Auto open browser
    if (OPEN_BROWSER_ON_START) {
      const platform = process.platform;

      const command =
        platform === "win32"
          ? "start"
          : platform === "darwin"
            ? "open"
            : "xdg-open";
      spawn(command, [url]);
    }
  });

  const playServer = play.listen(PLAYGROUND_PORT, () => {
    console.log(`Playground backend started on port ${PLAYGROUND_PORT}`);
  });

  return {
    close: async () => {
      httpServer.close();
      playServer.close();
    },
  };
}

await startServer();
