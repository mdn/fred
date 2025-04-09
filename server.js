import fs from "node:fs";

import { createRsbuild, loadConfig, logger } from "@rsbuild/core";
import express from "express";

import { createProxyMiddleware } from "http-proxy-middleware";

/**
 * @import { Request, Response } from "express";
 * @import { RsbuildDevServer } from "@rsbuild/core";
 */

/** @type {import("@rsbuild/core").ManifestData} */
let ssrManifest;
/** @type {import("@rsbuild/core").ManifestData} */
let clientManifest;

/**
 * @param {RsbuildDevServer} serverAPI
 */
const serverRender =
  (serverAPI) =>
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {Rari.BuiltPage} page
   */
  async (req, res, page) => {
    try {
      /** @type {import("./entry.ssr") | undefined} */
      const indexModule = await serverAPI.environments.ssr?.loadBundle("index");
      const html = await indexModule?.render(
        req.path,
        ssrManifest,
        clientManifest,
        page,
      );

      res.writeHead(res.statusCode, {
        "Content-Type": "text/html",
      });
      res.end(html);
    } catch (error) {
      logger.error("SSR render error:", error);
      res.writeHead(500).end();
    }
  };

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
  const { content } = await loadConfig({});

  // Init Rsbuild
  const rsbuild = await createRsbuild({
    rsbuildConfig: content,
  });

  const app = express();

  // Create Rsbuild DevServer instance
  const rsbuildServer = await rsbuild.createDevServer();

  rsbuild.onDevCompileDone(async () => {
    // update manifest info when rebuild
    ssrManifest = JSON.parse(
      await fs.promises.readFile("./dist/ssr/manifest.json", "utf8"),
    );
    clientManifest = JSON.parse(
      await fs.promises.readFile("./dist/client/manifest.json", "utf8"),
    );
    rsbuildServer.printUrls();
  });

  const serverRenderMiddleware = serverRender(rsbuildServer);

  // Apply Rsbuild’s built-in middlewares
  app.use(rsbuildServer.middlewares);

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

  const httpServer = app.listen(rsbuildServer.port, () => {
    // Notify Rsbuild that the custom server has started
    rsbuildServer.afterListen();

    console.log(`Server started at http://localhost:${rsbuildServer.port}`);
  });

  rsbuildServer.connectWebSocket({ server: httpServer });

  return {
    close: async () => {
      await rsbuildServer.close();
      httpServer.close();
    },
  };
}

await startDevServer();
