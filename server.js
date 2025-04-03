import fs from "node:fs";

import { createRsbuild, loadConfig, logger } from "@rsbuild/core";
import express from "express";

import { renderHTML } from "./build/utils.js";

/**
 * @import { Request, Response } from "express";
 * @import { RsbuildDevServer } from "@rsbuild/core";
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
      "utf8",
    );
    clientManifest = await fs.promises.readFile(
      "./dist/client/manifest.json",
      "utf8",
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
