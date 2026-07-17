import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { renderHtml } from "../../../vendor/yari/libs/play/index.js";

describe("play renderHtml", () => {
  it("tags the runner script with an id for swallow detection", () => {
    const out = renderHtml({ html: "<p>ok</p>", css: "", js: "1;" });
    assert.ok(out.includes('id="mdn-play-js"'));
    // Detection matches the <script> tag specifically, so a user element
    // reusing the id cannot cause a false "did not run" warning.
    assert.ok(out.includes('querySelector("script#mdn-play-js")'));
  });
});
