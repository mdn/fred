/* eslint-disable unicorn/no-useless-switch-case */
import { render as r } from "@lit-labs/ssr";
import { collectResult } from "@lit-labs/ssr/lib/render-result.js";

import { nothing } from "lit";

import { Advertising } from "./components/advertising/server.js";
import { BlogIndex } from "./components/blog-index/server.js";
import { BlogPost } from "./components/blog-post/server.js";
import { ContributorSpotlight } from "./components/contributor-spotlight/server.js";
import { CurriculumAbout } from "./components/curriculum-about/server.js";
import { CurriculumDefault } from "./components/curriculum-default/server.js";
import { CurriculumLanding } from "./components/curriculum-landing/server.js";
import { CurriculumModule } from "./components/curriculum-module/server.js";
import { CurriculumOverview } from "./components/curriculum-overview/server.js";
import { Doc } from "./components/doc/server.js";
import { GenericAbout } from "./components/generic-about/server.js";
import { GenericCommunity } from "./components/generic-community/server.js";
import { GenericDoc } from "./components/generic-doc/server.js";
import { Homepage } from "./components/homepage/server.js";
import { NotFound } from "./components/not-found/server.js";
import { ObservatoryLanding } from "./components/observatory-landing/server.js";
import { ObservatoryResults } from "./components/observatory-results/server.js";
import { OuterLayout } from "./components/outer-layout/server.js";
import { PageLayout } from "./components/page-layout/server.js";
import { Playground } from "./components/playground/server.js";
import { Plus } from "./components/plus/server.js";
import { Sandbox } from "./components/sandbox/server.js";
import { asyncLocalStorage } from "./components/server/async-local-storage.js";
import { SiteSearch } from "./components/site-search/server.js";
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
 * @param {import("@fred").PartialContext} partialContext
 * @param {import("@fred").CompilationStats} compilationStats
 */
export async function render(path, partialContext, compilationStats) {
  const locale = path.split("/")[1] || "en-US";
  if (locale === "qa") {
    path = path.replace("/qa/", "/en-US/");
  }

  const context = {
    path,
    ...(await addFluent(locale)),
    ...partialContext,
  };
  /** @type {import("./components/server/types.js").AsyncLocalStorageContents} */
  const storageContents = {
    componentsUsed: new Set(),
    componentsWithStylesInHead: new Set(),
    compilationStats,
  };
  return asyncLocalStorage.run(storageContents, () =>
    runWithContext({ locale }, async () => {
      const component = await (async () => {
        switch (context.renderer) {
          case "BlogIndex":
            return BlogIndex.render(context);
          case "BlogPost":
            return BlogPost.render(context);
          case "ContributorSpotlight":
            return ContributorSpotlight.render(context);
          case "CurriculumAbout":
            return CurriculumAbout.render(context);
          case "CurriculumDefault":
            return CurriculumDefault.render(context);
          case "CurriculumLanding":
            return CurriculumLanding.render(context);
          case "CurriculumModule":
            return CurriculumModule.render(context);
          case "CurriculumOverview":
            return CurriculumOverview.render(context);
          case "Doc":
            return Doc.render(context);
          case "GenericAbout":
            return GenericAbout.render(context);
          case "GenericCommunity":
            return GenericCommunity.render(context);
          case "GenericDoc":
            return GenericDoc.render(context);
          case "Homepage":
            return Homepage.render(context);
          case "SpaAdvertise":
            return Advertising.render(context);
          case "SpaObservatoryAnalyze":
            return ObservatoryResults.render(context);
          case "SpaObservatoryLanding":
            return ObservatoryLanding.render(context);
          case "SpaPlay":
            return Playground.render(context);
          case "SpaPlusAiHelp":
            return Plus.render(context);
          case "SpaPlusCollections":
            return Plus.render(context);
          case "SpaPlusCollectionsFrequentlyViewed":
            return Plus.render(context);
          case "SpaPlusLanding":
            return Plus.render(context);
          case "SpaPlusSettings":
            return Plus.render(context);
          case "SpaPlusUpdates":
            return Plus.render(context);
          case "SpaSearch":
            return SiteSearch.render(context);
          case "SpaUnknown": {
            return PageLayout.render(
              context,
              `Unknown Spa Page title=${context.pageTitle}, slug=${context.slug}`,
            );
          }
          // @ts-expect-error
          case "Sandbox":
            return Sandbox.render();
          case "SpaNotFound":
          default:
            return NotFound.render(context);
        }
      })();
      return await collectResult(r(OuterLayout.render(context, component)));
    }),
  );
}

/**
 * @param {string} path
 * @param {import("@fred").PartialContext} partialContext
 */
export async function renderSimple(path, partialContext) {
  const locale = path.split("/")[1] || "en-US";
  const context = {
    path,
    ...(await addFluent(locale)),
    ...partialContext,
  };
  /** @type {import("./components/server/types.js").AsyncLocalStorageContents} */
  const storageContents = {
    renderSimple: true,
  };
  return asyncLocalStorage.run(storageContents, () =>
    runWithContext({ locale }, async () => {
      const component = await (async () => {
        switch (context.renderer) {
          case "Doc":
            return Doc.render(context);
          default:
            return nothing;
        }
      })();
      return await collectResult(r(component));
    }),
  );
}
