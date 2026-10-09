import assert from "node:assert/strict";
import { once } from "node:events";
import { createServer } from "node:http";
import { after, before, describe, it } from "node:test";

import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import { handleProxyResponse } from "../../../build/proxy-response.js";

/**
 * @param {import("node:http").Server} server
 * @returns {Promise<string>}
 */
async function listen(server) {
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = /** @type {import("node:net").AddressInfo} */ (
    server.address()
  );
  return `http://127.0.0.1:${address.port}`;
}

describe("proxy responses", () => {
  /** @type {string[]} */
  const requests = [];
  let fallbackStatus = 200;
  let fallbackType = "application/json";
  let fallbackBody = JSON.stringify({ renderer: "NotFound" });
  let disconnectFallback = false;
  const upstream = createServer((req, res) => {
    requests.push(req.url || "");
    if (req.url?.endsWith("/404/index.json")) {
      if (disconnectFallback) {
        req.socket.destroy();
        return;
      }
      res.writeHead(fallbackStatus, { "content-type": fallbackType });
      res.end(fallbackBody);
    } else
      switch (req.url) {
        case "/invalid-page": {
          res.writeHead(200, { "content-type": "application/json" });
          res.end("{");

          break;
        }
        case "/asset.json": {
          res.writeHead(200, { "content-type": "application/json" });
          res.end('{"asset":true}');

          break;
        }
        case "/page": {
          res.writeHead(200, { "content-type": "application/json" });
          res.end('{"renderer":"Doc"}');

          break;
        }
        default: {
          res.writeHead(404, { "content-type": "text/plain" });
          res.end();
        }
      }
  });
  const app = express();
  const server = createServer(app);
  let url = "";

  before(async () => {
    const rariUrl = await listen(upstream);
    app.use(
      createProxyMiddleware({
        target: rariUrl,
        selfHandleResponse: true,
        on: {
          proxyRes: (proxyRes, req, res) => {
            void handleProxyResponse(
              proxyRes,
              req,
              res,
              rariUrl,
              async (_req, response, page) => {
                response.end(`Rendered ${page.renderer}`);
              },
            );
          },
        },
      }),
    );
    url = await listen(server);
  });

  after(async () => {
    for (const instance of [server, upstream]) {
      instance.closeAllConnections();
      await new Promise((resolve) => instance.close(resolve));
    }
  });

  it("uses the configured upstream and an English fallback for DevTools requests", async () => {
    const response = await fetch(
      `${url}/.well-known/appspecific/com.chrome.devtools.json`,
    );
    assert.equal(response.status, 404);
    assert.equal(await response.text(), "Rendered NotFound");
    assert.equal(requests.at(-1), "/en-US/404/index.json");
  });

  it("preserves valid locales and maps pseudo-locales to English", async () => {
    for (const [path, locale] of [
      ["/fr/missing", "fr"],
      ["/qaa/missing", "en-US"],
      ["/", "en-US"],
    ]) {
      const response = await fetch(`${url}${path}`);
      assert.equal(response.status, 404);
      await response.text();
      assert.equal(requests.at(-1), `/${locale}/404/index.json`);
    }
  });

  it("accepts a rendered fallback returned with HTTP 404", async () => {
    fallbackStatus = 404;
    const response = await fetch(`${url}/en-US/missing`);
    assert.equal(response.status, 404);
    assert.equal(await response.text(), "Rendered NotFound");
    fallbackStatus = 200;
  });

  it("returns a plain 404 for failed, empty, malformed, or unusable fallback responses", async () => {
    for (const [status, type, body] of [
      [404, "text/plain", ""],
      [500, "application/json", '{"renderer":"NotFound"}'],
      [200, "application/json", ""],
      [200, "application/json", "{"],
      [200, "application/json", "null"],
      [200, "application/json", "{}"],
    ]) {
      fallbackStatus = Number(status);
      fallbackType = String(type);
      fallbackBody = String(body);
      const response = await fetch(`${url}/en-US/missing`);
      assert.equal(response.status, 404);
      assert.equal(await response.text(), "");
    }
    fallbackStatus = 200;
    fallbackType = "application/json";
    fallbackBody = '{"renderer":"NotFound"}';
  });

  it("survives a failed fallback connection and serves the next request", async () => {
    disconnectFallback = true;
    const response = await fetch(`${url}/en-US/missing`);
    assert.equal(response.status, 404);
    await response.text();
    disconnectFallback = false;
    const next = await fetch(`${url}/page`);
    assert.equal(await next.text(), "Rendered Doc");
  });

  it("contains malformed page JSON without crashing and still streams JSON assets", async () => {
    const response = await fetch(`${url}/invalid-page`);
    assert.equal(response.status, 502);
    await response.text();
    const asset = await fetch(`${url}/asset.json`);
    assert.equal(asset.status, 200);
    assert.deepEqual(await asset.json(), { asset: true });
  });
});
