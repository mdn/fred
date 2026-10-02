import assert from "node:assert/strict";
import http from "node:http";

import { describe, it } from "node:test";

import express from "express";

import { registerLocaleLessDocsRedirect } from "../../utils/locale-less-docs-redirect.js";

/**
 * @param {import("express").Application} app
 * @param {string} url
 * @param {Record<string, string | undefined>} [headers]
 */
function request(app, url, headers = {}) {
  const req = Object.assign(Object.create(http.IncomingMessage.prototype), {
    method: "GET",
    url,
    originalUrl: url,
    headers: {
      host: "localhost",
      ...headers,
    },
    socket: {
      encrypted: false,
      remoteAddress: "127.0.0.1",
    },
  });
  const res = new http.ServerResponse(req);
  res.end = function end() {
    return res;
  };

  app(req, res);

  return {
    location: res.getHeader("Location"),
    statusCode: res.statusCode,
  };
}

describe("locale-less docs redirect", () => {
  const cases = [
    {
      name: "matches a nested docs path and preserves the query string",
      url: "/docs/Web/CSS/foo?plain=1",
      headers: { "accept-language": "fr" },
      expected: "/fr/docs/Web/CSS/foo?plain=1",
    },
    {
      name: "prefers the locale cookie over Accept-Language",
      url: "/docs/Web/foo",
      headers: {
        cookie: "preferredlocale=de",
        "accept-language": "fr",
      },
      expected: "/de/docs/Web/foo",
    },
    {
      name: "matches the bare docs path",
      url: "/docs",
      expected: "/en-US/docs",
    },
  ];

  for (const { name, url, headers, expected } of cases) {
    it(name, () => {
      const app = express();
      registerLocaleLessDocsRedirect(app);

      const response = request(app, url, headers);

      assert.equal(response.statusCode, 302);
      assert.equal(response.location, expected);
    });
  }
});
