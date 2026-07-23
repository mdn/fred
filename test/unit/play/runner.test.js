import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { renderHtml } from "../../../vendor/yari/libs/play/index.js";

// The runner assembles the document as a string, interpolating user CSS/JS
// into `<style>`/`<script>` elements. These tests exercise the breakout
// escaping via the emitted document, slicing out the region between an
// element's opening `>` and its first real closing tag.

/**
 * @param {string} out
 * @param {string} marker
 * @param {string} close
 */
function region(out, marker, close) {
  const start = out.indexOf(marker);
  const open = out.indexOf(">", start) + 1;
  return out.slice(open, out.indexOf(close, open));
}

/** @param {string} out */
const scriptRegion = (out) => region(out, 'id="mdn-play-js"', "</script>");
/** @param {string} out */
const styleRegion = (out) => region(out, 'id="css-output"', "</style>");

describe("play renderHtml", () => {
  it("escapes a </script sequence so user JS cannot break out", () => {
    const js = `console.log("</script><img src=x onerror=alert(1)>");`;
    const code = scriptRegion(renderHtml({ html: "", css: "", js }));
    // The backslash stops the HTML parser from ending the element early...
    assert.ok(code.includes("<\\/script"), "sequence should be escaped");
    assert.ok(!code.includes("</script"), "raw </script must not survive");
    // ...while `\/` resolves to `/`, so the source round-trips unchanged.
    assert.equal(code.replaceAll("<\\/", "</").trim(), `${js};`);
  });

  it("escapes a </style sequence so user CSS cannot break out", () => {
    const css = `body::before { content: "</style><img src=x>"; }`;
    const code = styleRegion(renderHtml({ html: "", css, js: "1;" }));
    assert.ok(code.includes("<\\/style"), "sequence should be escaped");
    assert.ok(!code.includes("</style"), "raw </style must not survive");
    assert.equal(code.replaceAll("<\\/", "</").trim(), css);
  });

  it("preserves case when escaping (</SCRIPT stays uppercase)", () => {
    const js = `x = "</SCRIPT>";`;
    const code = scriptRegion(renderHtml({ html: "", css: "", js }));
    assert.ok(code.includes("<\\/SCRIPT"));
  });

  it("leaves the <!--<script> double-escape unaddressed (known limitation)", () => {
    // Documented in `escapeScriptText`: the escaping only neutralizes
    // `</script`, so a `<!--` … `<script` sequence still reaches the parser
    // intact. Pinned here so a future fix is a deliberate, visible change.
    const js = `console.log("<!--<script>");`;
    const code = scriptRegion(renderHtml({ html: "", css: "", js }));
    assert.ok(code.includes("<!--<script>"), "sequence is not neutralized");
  });

  it("tags the runner script with an id for swallow detection", () => {
    const out = renderHtml({ html: "<p>ok</p>", css: "", js: "1;" });
    assert.ok(out.includes('id="mdn-play-js"'));
    // Detection matches the <script> tag specifically, so a user element
    // reusing the id cannot cause a false "did not run" warning.
    assert.ok(out.includes('querySelector("script#mdn-play-js")'));
  });
});
