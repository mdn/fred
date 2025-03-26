import { render as r } from "@lit-labs/ssr";
import { collectResult } from "@lit-labs/ssr/lib/render-result.js";

import l10n from "./fluent.js";
import { DocBody } from "./pages/doc/index.js";
import {
  ObservatoryLanding,
  ObservatoryResults,
} from "./pages/observatory/index.js";
import { SettingsBody } from "./pages/settings/index.js";

/**
 * @param {string} path
 * @returns {Promise<Fred.Context<Rari.DocPage | Rari.SPAPage>>}
 */
async function fetch_from_rari(path) {
  const external_url = `http://localhost:8083${path}`;
  console.log(`using ${external_url}`);
  const response = await fetch(external_url);
  return await response.json();
}

/**
 * @param {string} path
 */
export async function render(path) {
  let result;
  if (path.endsWith("settings")) {
    // @ts-ignore
    result = r(SettingsBody());
  } else if (path.includes("observatory/analyze")) {
    const rawContext = await fetch_from_rari(path.trim().replace(/\/$/, ""));
    if (!isSPAContext(rawContext)) {
      throw new Error("Expected SPA context for observatory/analyze");
    }
    /** @type {Fred.Context<Rari.SPAPage>} */
    const context = rawContext;
    result = r(ObservatoryResults(context));
  } else if (path.endsWith("observatory") || path.endsWith("observatory/")) {
    const rawContext = await fetch_from_rari(path.trim().replace(/\/$/, ""));
    if (!isSPAContext(rawContext)) {
      throw new Error("Expected SPA context for observatory/analyze");
    }
    /** @type {Fred.Context<Rari.SPAPage>} */
    const context = rawContext;
    console.log("ctx", context);
    result = r(ObservatoryLanding(context));
  } else {
    const context = await fetch_from_rari(path);
    // @ts-ignore
    context.l10n = await l10n(context.locale);
    console.log("context", context.url);
    // @ts-ignore
    result = r(DocBody(context));
  }
  return await collectResult(result);
}

/**
 * @param {Rari.BuiltPage} context
 */
export async function renderWithContext(context) {
  // @ts-ignore
  context.l10n = await l10n(context.locale);
  // @ts-ignore
  const result = r(DocBody(context));
  return await collectResult(result);
}

/**
 * Type guard to check if a context is an SPAPage context
 * @param {Fred.Context<Rari.DocPage | Rari.SPAPage>} context
 * @returns {context is Fred.Context<Rari.SPAPage>}
 */
function isSPAContext(context) {
  return "noIndexing" in context && "pageTitle" in context && "slug" in context;
}
