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
   */
  async (req, res) => {
    /** @type {import("./entry.ssr") | undefined} */
    const indexModule = await serverAPI.environments.ssr?.loadBundle("index");
    const html = await indexModule?.render(
      req.path,
      ssrManifest,
      clientManifest,
    );

    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end(html);
  };

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

  app.get("/*mdnUrl", async (req, res, next) => {
    try {
      await serverRenderMiddleware(req, res);
    } catch (error) {
      logger.error("SSR render error, downgrade to CSR...", error);
      next();
    }
  });

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
