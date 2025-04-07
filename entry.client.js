import "./src/symmetric-context/client.js";
import "@lit-labs/ssr-client/lit-element-hydrate-support.js";
import "./src/components/color-theme/index.js";
import "./src/components/compat/index.js";
import "./src/components/quick-search/index.js";
import "./src/components/dropdown/index.js";
import "./src/observatory/landing/form.js";
import "./src/observatory/results/results.js";
import "./src/components/site-search/index.js";

import Prism from "prismjs";

console.log("ENtER");
globalThis.addEventListener("DOMContentLoaded", () => {
  for (const pre of document.querySelectorAll('pre[class~="brush:"]') || []) {
    const code = pre.firstChild;
    if (code instanceof HTMLElement && Prism.languages.html) {
      code.innerHTML = Prism.highlight(
        code.textContent || "",
        Prism.languages.html,
        "html",
      );
    }
  }
});
