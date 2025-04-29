/* eslint-disable unicorn/no-useless-switch-case */
import { render as r } from "@lit-labs/ssr";
import { collectResult } from "@lit-labs/ssr/lib/render-result.js";

import { BlogIndex } from "./components/blog-index/index.js";
import { BlogPost } from "./components/blog-post/index.js";
import { ContributorSpotlight } from "./components/contributor-spotlight/index.js";
import { Curriculum } from "./components/curriculum/index.js";
import { Doc } from "./components/doc/index.js";
import { GenericDoc } from "./components/generic-doc/index.js";
import { HomePage } from "./components/home-page/index.js";
import { NotFound } from "./components/not-found/index.js";
import { ObservatoryLanding } from "./components/observatory-landing/index.js";
import { ObservatoryResults } from "./components/observatory-results/index.js";
import { OuterLayout } from "./components/outer-layout/index.js";
import { PageLayout } from "./components/page-layout/index.js";
import { Search } from "./components/search/index.js";
import { Settings } from "./components/settings/index.js";
import { addFluent } from "./l10n/context.js";
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

  console.log("Rendering context/doc", context);

  // TODO: maybe don't use symmetric context, or give it a different name?
  const serverComponents = new Set();

  return runWithContext({ locale, serverComponents }, async () => {
    const component = (() => {
      switch (context.renderer) {
        case "BlogIndex":
          return BlogIndex.render(context);
        case "BlogPost":
          return BlogPost.render(context);
        case "ContributorSpotlight":
          return ContributorSpotlight.render(context);
        case "CurriculumAbout":
        case "CurriculumDefault":
        case "CurriculumLanding":
        case "CurriculumModule":
        case "CurriculumOverview":
          return Curriculum.render(context);
        case "Doc":
          return Doc.render(context);
        case "GenericAbout":
        case "GenericCommunity":
        case "GenericDoc":
          return GenericDoc.render(context);
        case "Homepage":
          return HomePage.render(context);
        case "SpaAdvertise":
          return PageLayout.render(context, "TODO: Advertise");
        case "SpaObservatoryAnalyze":
          return ObservatoryResults.render(context);
        case "SpaObservatoryLanding":
          return ObservatoryLanding.render(context);
        case "SpaPlay":
          return PageLayout.render(context, "TODO: Playground");
        case "SpaPlusAiHelp":
          return PageLayout.render(context, "TODO: AI Help");
        case "SpaPlusCollections":
          return PageLayout.render(context, "TODO: Collections");
        case "SpaPlusCollectionsFrequentlyViewed":
          return PageLayout.render(
            context,
            "TODO: Collections frequently viewed",
          );
        case "SpaPlusLanding":
          return PageLayout.render(context, "TODO: Plus landing");
        case "SpaPlusSettings":
          return Settings.render(context);
        case "SpaPlusUpdates":
          return PageLayout.render(context, "TODO: BUpdates");
        case "SpaSearch":
          return Search.render(context);
        case "SpaUnknown":
          return PageLayout.render(context, `Unknown: ${context.pageTitle}`);
        case "SpaNotFound":
        default:
          return NotFound.render(context);
      }
    })();
    return await collectResult(
      r(OuterLayout.render(context, component, manifest, serverComponents)),
    );
  });
}
