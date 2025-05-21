/* eslint-disable unicorn/no-useless-switch-case */
import { render as r } from "@lit-labs/ssr";
import { collectResult } from "@lit-labs/ssr/lib/render-result.js";

import { BlogIndex } from "./components/blog-index/server.js";
import { BlogPost } from "./components/blog-post/server.js";
import { ContributorSpotlight } from "./components/contributor-spotlight/server.js";
import { Curriculum } from "./components/curriculum/server.js";
import { Doc } from "./components/doc/server.js";
import { GenericAbout } from "./components/generic-about/server.js";
import { GenericCommunity } from "./components/generic-community/server.js";
import { GenericDoc } from "./components/generic-doc/server.js";
import { HomePage } from "./components/home-page/server.js";
import { NotFound } from "./components/not-found/server.js";
import { ObservatoryLanding } from "./components/observatory-landing/server.js";
import { ObservatoryResults } from "./components/observatory-results/server.js";
import { OuterLayout } from "./components/outer-layout/server.js";
import { PageLayout } from "./components/page-layout/server.js";
import { Playground } from "./components/playground/server.js";
import { Search } from "./components/search/server.js";
import { asyncLocalStorage } from "./components/server/async-local-storage.js";
import { Settings } from "./components/settings/server.js";
import { addFluent } from "./l10n/context.js";
import { runWithContext } from "./symmetric-context/server.js";

// remove custom elements with `static ssr = false`
// @ts-expect-error
for (const [name, def] of customElements.__definitions) {
  if (def?.ctor?.ssr === false) {
    // @ts-expect-error
    customElements.__definitions.delete(name);
  }
}

/**
 * @param {string} path
 * @param {import("types/rari.js").BuiltPage} page
 * @param {import("types/fred.js").CompilationStats} compilationStats
 */
export async function render(path, page, compilationStats) {
  const locale = path.split("/")[1] || "en-US";
  if (locale === "qa") {
    path = path.replace("/qa/", "/en-US/");
  }

  const context = {
    path,
    ...(await addFluent(locale)),
    ...page,
  };

  return asyncLocalStorage.run({ componentsUsed: new Set() }, () =>
    runWithContext({ locale }, async () => {
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
            return GenericAbout.render(context);
          case "GenericCommunity":
            return GenericCommunity.render(context);
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
            return Playground.render(context);
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
      const { componentsUsed = new Set() } = asyncLocalStorage.getStore() || {};
      return await collectResult(
        r(
          OuterLayout.render(
            context,
            component,
            compilationStats,
            componentsUsed,
          ),
        ),
      );
    }),
  );
}
