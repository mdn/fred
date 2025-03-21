import { render as r } from "@lit-labs/ssr";
import { DocBody } from "./pages/doc/index.js";
import { collectResult } from "@lit-labs/ssr/lib/render-result.js";
import { SettingsBody } from "./pages/settings/index.js";
import l10n from "./fluent.js";
import {
  ObservatoryLanding,
  ObservatoryResults,
} from "./pages/observatory/index.js";

/**
 * @import { SPAPage } from "@mdn/rari"
 */

/**
 * @param {string} path
 * @returns {Promise<Fred.Context<Rari.DocPage>>}
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
  let result;
  if (path.endsWith("settings")) {
    result = r(SettingsBody());
  } else if (path.indexOf("observatory/analyze") !== -1) {
    /** @type {Fred.Context<SPAPage>} */
    const context = {
      noIndexing: true,
      url: "/en-US/observatory/analyze",
      pageTitle: "HTTP Observatory Report",
      pageNotFound: false,
      onlyFollow: false,
      slug: "observatory/analyze",
    };
    result = r(ObservatoryResults(context));
  } else if (path.endsWith("observatory") || path.endsWith("observatory/")) {
    /** @type {Fred.Context<SPAPage>} */
    const context = {
      noIndexing: true,
      url: "/en-US/observatory/",
      pageTitle: "HTTP Observatory",
      pageNotFound: false,
      onlyFollow: false,
      slug: "observatory",
    };
    result = r(ObservatoryLanding(context));
  } else {
    const context = await fetch_from_rari(path);
    context.l10n = await l10n(context.locale);
    console.log("context", context.url);
    result = r(DocBody(context));
  }
  return await collectResult(result);
}

/**
 * @param {Rari.BuiltPage} context
 */
export async function renderWithContext(context) {
  context.l10n = await l10n(context.locale);
  const result = r(DocBody(context));
  return await collectResult(result);
}
