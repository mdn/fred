import { render as litRender } from "lit";

import { Doc } from "./components/doc/server.js";
import { NotFound } from "./components/not-found/server.js";
import { asyncLocalStorage } from "./components/server/async-local-storage.js";
import { addFluent } from "./l10n/context.js";
import { runWithContext } from "./symmetric-context/server.js";

const cssContext = require.context(
  "./components",
  true,
  /\/(server|global)\.css$/,
);
cssContext.keys().forEach(cssContext);

const params = new URLSearchParams(globalThis.location.search);
const path = params.get("path");

const response = await fetch(`${path}/index.json`);
const json = await response.json();

await render(path, json, null);

/**
 * @param {string} path
 * @param {import("@fred").PartialContext} partialContext
 * @param {import("@fred").CompilationStats} compilationStats
 */
export async function render(path, partialContext, compilationStats) {
  const locale = "en-US";

  const context = {
    path,
    ...(await addFluent(locale)),
    ...partialContext,
  };
  /** @type {import("./components/server/types.js").FredLocalContents} */
  const storageContents = {
    componentsUsed: new Set(),
    componentsWithStylesInHead: new Set(),
    compilationStats,
  };
  return asyncLocalStorage.run(storageContents, () =>
    runWithContext({ locale }, async () => {
      const component = await (async () => {
        switch (context.renderer) {
          case "Doc":
            return Doc.render(context);
          case "SpaNotFound":
          default:
            return NotFound.render(context);
        }
      })();
      return litRender(component, document.body);
    }),
  );
}
