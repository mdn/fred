/* eslint-disable unicorn/no-useless-switch-case */
import { render as r } from "@lit-labs/ssr";
import { collectResult } from "@lit-labs/ssr/lib/render-result.js";

import { renderHTML } from "./build/utils.js";
import { PageLayout } from "./src/components/page-layout/index.js";
import { addFluent } from "./src/l10n/context.js";
import { NotFound } from "./src/pages/404/index.js";
import { ContributorSpotlight } from "./src/pages/contributor-spotlight/index.js";
import { Curriculum } from "./src/pages/curriculum/index.js";
import { Doc } from "./src/pages/doc/index.js";
import { Generic } from "./src/pages/generic/index.js";
import { HomePage } from "./src/pages/home/index.js";
import {
  ObservatoryBody,
  ObservatoryResults,
} from "./src/pages/observatory/index.js";
import { Search } from "./src/pages/search/index.js";
import { SettingsBody } from "./src/pages/settings/index.js";
import { runWithContext } from "./src/symmetric-context/server.js";

/**
 * @param {string} path
 * @returns {Promise<Rari.BuiltPage>}
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
 * @param {import("@rsbuild/core").ManifestData} ssrManifest
 * @param {import("@rsbuild/core").ManifestData} clientManifest
 * @param {Rari.BuiltPage} [page]
 */
export async function render(path, ssrManifest, clientManifest, page) {
  if (!page) {
    page = await fetch_from_rari(path);
  }

  const locale = path.split("/")[1] || "en-US";
  if (locale === "qa") {
    path = path.replace("/qa/", "/en-US/");
  }

  const context = {
    path,
    ...(await addFluent(locale)),
    ...page,
  };

  return runWithContext({ locale }, async () => {
    const component = (() => {
      switch (context.renderer) {
        case "BlogIndex":
        case "BlogPost":
          // @ts-expect-error
          return Doc(context);
        case "ContributorSpotlight":
          return ContributorSpotlight(context);
        case "CurriculumAbout":
        case "CurriculumDefault":
        case "CurriculumLanding":
        case "CurriculumModule":
        case "CurriculumOverview":
          return Curriculum(context);
        case "Doc":
          return Doc(context);
        case "GenericAbout":
        case "GenericCommunity":
        case "GenericDoc":
          return Generic(context);
        case "Homepage":
          return HomePage(context);
        case "SpaAdvertise":
          return PageLayout(context, "TODO: Advertise");
        case "SpaObservatoryAnalyze":
          return ObservatoryResults(context);
        case "SpaObservatoryLanding":
          return ObservatoryBody(context);
        case "SpaPlay":
          return PageLayout(context, "TODO: Playground");
        case "SpaPlusAiHelp":
          return PageLayout(context, "TODO: AI Help");
        case "SpaPlusCollections":
          return PageLayout(context, "TODO: Collections");
        case "SpaPlusCollectionsFrequentlyViewed":
          return PageLayout(context, "TODO: Collections frequently viewed");
        case "SpaPlusLanding":
          return PageLayout(context, "TODO: Plus landing");
        case "SpaPlusSettings":
          return SettingsBody(context);
        case "SpaPlusUpdates":
          return PageLayout(context, "TODO: BUpdates");
        case "SpaSearch":
          return Search(context);
        case "SpaUnknown":
          return PageLayout(context, `Unknown: ${context.pageTitle}`);
        case "SpaNotFound":
        default:
          return NotFound(context);
      }
    })();
    return await collectResult(
      r(renderHTML(ssrManifest, clientManifest, context, component)),
    );
  });
}
