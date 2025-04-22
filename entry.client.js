import "./symmetric-context/client.js";
import "@lit-labs/ssr-client/lit-element-hydrate-support.js";

// elements:
// TODO: migrate these all the the proper naming schema so they can be loaded by load-elements.js below
import "./observatory/landing/form.js";
import "./observatory/results/results.js";

// hooks:
import "./hooks/load-elements.js";
import "./components/navigation/hook.js";
import "./hooks/code-examples.js";
