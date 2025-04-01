import { render as r } from "@lit-labs/ssr";
import { collectResult } from "@lit-labs/ssr/lib/render-result.js";

import { addFluent } from "./l10n/context.js";
import { Doc } from "./pages/doc/index.js";
import { HomePage } from "./pages/home/index.js";
import {
  ObservatoryBody,
  ObservatoryResults,
} from "./pages/observatory/index.js";
import { SettingsBody } from "./pages/settings/index.js";

/**
 * @param {string} path
 * @returns {Promise<Rari.DocPage>}
 */
async function fetch_from_rari(path) {
  const external_url = `http://localhost:8083${path}`;
  console.log(`loading ${external_url}`);
  const response = await fetch(external_url);
  if (!response.ok) {
    throw new Error(
      `${response.status}: ${response.statusText} for ${external_url}`,
    );
  }
  return await response.json();
}

/**
 * @param {string} path
 * @param {Rari.BuiltPage} [page]
 */
export async function render(path, page) {
  if (!page) {
    page = await fetch_from_rari(path);
  }

  const locale = path.split("/")[1] || "en-US";
  if (locale === "qa") {
    path = path.replace("/qa/", "/en-US/");
  }
  const context = await addFluent(locale, page);

  let component;
  if (path.endsWith("settings")) {
    component = SettingsBody(context);
  } else if (path.includes("observatory/analyze")) {
    // @ts-expect-error
    component = ObservatoryResults(context);
  } else if (path.endsWith("observatory") || path.endsWith("observatory/")) {
    // @ts-expect-error
    component = ObservatoryBody(context);
  } else if (path.endsWith("/en-US/")) {
    // @ts-expect-error
    component = HomePage(context);
  } else {
    // @ts-expect-error
    component = Doc(context);
  }
  return await collectResult(r(component));
}
