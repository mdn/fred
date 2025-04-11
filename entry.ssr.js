/* eslint-disable unicorn/no-useless-switch-case */
import { render as r } from "@lit-labs/ssr";
import { collectResult } from "@lit-labs/ssr/lib/render-result.js";

import { BlogIndex } from "./blog/landing/index.js";
import { BlogPost } from "./blog/post/index.js";
import { renderHTML } from "./build/utils.js";
import { PageLayout } from "./components/page-layout/index.js";
import { addFluent } from "./l10n/context.js";
import { NotFound } from "./pages/404/index.js";
import { ContributorSpotlight } from "./pages/contributor-spotlight/index.js";
import { Curriculum } from "./pages/curriculum/index.js";
import { Doc } from "./pages/doc/index.js";
import { Generic } from "./pages/generic/index.js";
import { HomePage } from "./pages/home/index.js";
import {
  ObservatoryLanding,
  ObservatoryResults,
} from "./pages/observatory/index.js";
import { Search } from "./pages/search/index.js";
import { SettingsBody } from "./pages/settings/index.js";
import { runWithContext } from "./symmetric-context/server.js";

/**
 * @param {string} path
 * @param {Rari.BuiltPage} page
 * @param {import("@rspack/core").StatsCompilation[]} manifest
 */
export async function render(path, page, manifest) {
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
          return BlogIndex(context);
        case "BlogPost":
          return BlogPost(context);
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
          return ObservatoryLanding(context);
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
    return await collectResult(r(renderHTML(context, component, manifest)));
  });
}
