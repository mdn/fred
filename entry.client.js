import "./symmetric-context/client.js";
import "@lit-labs/ssr-client/lit-element-hydrate-support.js";

// elements:
// TODO: migrate these all the the proper naming schema so they can be loaded by load-elements.js below
import "./components/compat/index.js";
import "./observatory/landing/form.js";
import "./observatory/results/results.js";

// hooks:
import "./hooks/load-elements.js";
import "./hooks/dropdown.js";
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
