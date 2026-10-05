import { buffer } from "node:stream/consumers";

/**
 * @param {string} url
 * @returns {string}
 */
function getNotFoundLocale(url) {
  const segment = url.split(/[/?]/, 2)[1] || "en-US";
  // Pseudo-locales use English content in Rari.
  if (/^q[a-t][a-z]$/i.test(segment)) {
    return "en-US";
  }
  try {
    return Intl.getCanonicalLocales(segment)[0] || "en-US";
  } catch {
    return "en-US";
  }
}

/**
 * Handle proxy responses here rather than letting rejected promises escape the
 * proxy's event emitter.
 * @param {import("node:http").IncomingMessage} proxyRes
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {string} rariUrl
 * @param {(req: import("express").Request, res: import("express").Response, page: import("@fred").RenderPage) => Promise<void>} render
 */
export async function handleProxyResponse(proxyRes, req, res, rariUrl, render) {
  const contentType = proxyRes.headers["content-type"] || "";
  const statusCode = proxyRes.statusCode || 500;
  const notFound =
    (!contentType || contentType.includes("text/plain")) && statusCode === 404;

  try {
    if (notFound) {
      // Consume the original response so its connection can be reused.
      proxyRes.resume();
      res.statusCode = 404;
      const locale = getNotFoundLocale(req.url);
      const fallback = await fetch(
        new URL(`/${locale}/404/index.json`, rariUrl),
        {
          signal: AbortSignal.timeout(20_000),
        },
      );
      if (
        (fallback.ok || fallback.status === 404) &&
        fallback.headers.get("content-type")?.includes("application/json")
      ) {
        const page = await fallback.json();
        if (page && typeof page.renderer === "string") {
          await render(req, res, page);
          return;
        }
      } else {
        await fallback.body?.cancel();
      }
      res.end();
      return;
    }

    if (
      !contentType.includes("application/json") ||
      req.path.endsWith(".json")
    ) {
      res.writeHead(statusCode, proxyRes.headers);
      proxyRes.pipe(res);
      return;
    }

    const body = await buffer(proxyRes);
    const page = JSON.parse(body.toString("utf8"));
    if (page && typeof page.renderer === "string") {
      await render(req, res, page);
      return;
    }
    res.writeHead(statusCode, proxyRes.headers);
    res.end(body);
  } catch (error) {
    console.error("Proxy response error:", error);
    if (res.headersSent) {
      res.destroy();
    } else {
      res.statusCode = notFound ? 404 : 502;
      res.end();
    }
  }
}
