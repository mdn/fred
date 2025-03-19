import { render as r } from "@lit-labs/ssr";
import { DocBody } from "./pages/doc/index.js";
import { collectResult } from "@lit-labs/ssr/lib/render-result.js";
import { SettingsBody } from "./pages/settings/index.js";
import { addFluent } from "./context.js";

/**
 * @param {string} path
 * @returns {Promise<Rari.DocPage>}
 */
async function fetch_from_rari(path) {
  const external_url = `http://localhost:8083${path}`;
  console.log(`using ${external_url}`);
  return await (await fetch(external_url)).json();
}

/**
 * @param {string} path 
 */
export async function render(path) {
  const locale = path.split("/")[1]

  if (locale === "qa") {
    path = path.replace("/qa/", "/en-US/")
  }

  let result;
  if (path.endsWith("settings")) {
    result = r(SettingsBody());
  } else {
    const page = await fetch_from_rari(path);
    const context = await addFluent(locale, page);
    console.log("context", context.url);
    result = r(DocBody(context));
  }
  return await collectResult(result);
}

/**
 * @param {Rari.BuiltPage} context 
 */
export async function renderWithContext(context) {
  context = await addFluent("en-US", context);
  const result = r(DocBody(context));
  return await collectResult(result);
}
