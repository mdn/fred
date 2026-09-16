import assert from "node:assert/strict";

import { describe, it } from "node:test";

import { codeToDataUrl } from "../../../components/playground/utils.js";

describe("playground", () => {
  describe("codeToDataUrl", () => {
    it("only URI-encodes characters outside the allowlist", () => {
      const dataUrl = codeToDataUrl({
        html: "@\n@ @%20 @",
        css: "body {\n  font-size: 5em;\n}",
        js: "",
      });

      assert.equal(
        dataUrl,
        "data:text/html;charset=utf-8," +
          "<!doctype html><body>" +
          "<style>body {%0A  font-size: 5em;%0A}</style>" +
          "%40%0A%40 %40%2520 %40" +
          "</body>",
      );
    });
  });
});
