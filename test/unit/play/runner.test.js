import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { renderHtml } from "../../../vendor/yari/libs/play/index.js";

describe("play renderHtml", () => {
  it("marks the runner script and its end for swallow detection", () => {
    const out = renderHtml({ html: "<p>ok</p>", css: "", js: "1;" });
    for (const marker of ['id="mdn-play-js"', 'id="mdn-play-js-end"']) {
      assert.ok(out.includes(marker), `missing ${marker}`);
    }
  });

  it("runs the swallow detection from the head, after DOMContentLoaded", () => {
    const out = renderHtml({ html: "<p>ok</p>", css: "", js: "1;" });
    const head = out.slice(0, out.indexOf("</head>"));
    assert.ok(head.includes('querySelector("script#mdn-play-js")'));
    assert.ok(head.includes('addEventListener("DOMContentLoaded"'));
  });
});
