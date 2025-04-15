import "./symmetric-context/client.js";
import "@lit-labs/ssr-client/lit-element-hydrate-support.js";

// elements:
import "./components/search-modal/element.js";
import "./components/content-feedback/index.js";
import "./components/color-theme/index.js";
import "./components/compat/index.js";
import "./components/dropdown/index.js";
import "./observatory/landing/form.js";
import "./observatory/results/results.js";
import "./components/site-search/index.js";
import "./components/copy-button/index.js";

// hooks:
import "./hooks/code-examples.js";

// reload on ssr changes:
// TODO: extract into development-only file
const hmr = new EventSource("/__webpack_hmr");

hmr.addEventListener("message", (event) => {
  try {
    const message = JSON.parse(event.data);
    if (message.action === "built") {
      console.log(`Reloading page: ${message.name} bundle updated`);
      location.reload();
    }
  } catch {
    //
  }
});
