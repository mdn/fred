import express from "express";
import fs from "node:fs";
import { createRsbuild, loadConfig, logger } from "@rsbuild/core";
import { renderHTML } from "./build/utils.js";

/**
 * @import { Request, Response } from "express";
 * @import { RsbuildDevServer, ManifestData } from "@rsbuild/core";
 */

/** @type {string} */
let ssrManifest;
/** @type {string} */
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
    const markup = await indexModule?.render(req.path);

    const html = renderHTML(
      ssrManifest,
      clientManifest,
      req?.path?.endsWith("settings"),
      markup,
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
    ssrManifest = await fs.promises.readFile(
      "./dist/ssr/manifest.json",
      "utf-8",
    );
    clientManifest = await fs.promises.readFile(
      "./dist/client/manifest.json",
      "utf-8",
    );
    rsbuildServer.printUrls();
  });

  const serverRenderMiddleware = serverRender(rsbuildServer);

  app.get("/*mdnUrl", async (req, res, next) => {
    try {
      await serverRenderMiddleware(req, res);
    } catch (err) {
      logger.error("SSR render error, downgrade to CSR...");
      next();
    }
  });

  // Apply Rsbuild’s built-in middlewares
  app.use(rsbuildServer.middlewares);

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

startDevServer();
