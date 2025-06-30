import { html } from "@lit-labs/ssr";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import inlineScript from "../../entry.inline.js?source&csp=true";
import { WRITER_MODE } from "../env/index.js";
import Favicon from "../favicon/pure.js";
import { asyncLocalStorage } from "../server/async-local-storage.js";
import { ServerComponent } from "../server/index.js";

import {
  assetsForEntry,
  styleEntryForComponent,
  stylesForComponents,
} from "./utils.js";

export class OuterLayout extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   * @param {import("lit-html").TemplateResult} markup
   */
  render(context, markup) {
    const {
      componentsUsed = /** @type {Set<string>} */ (new Set()),
      componentsWithStylesInHead = /** @type {Set<string>} */ (new Set()),
      compilationStats,
    } = asyncLocalStorage.getStore() || {};

    if (!compilationStats) {
      throw new Error("compilation stats missing");
    }

    let legacyAssets;
    if (componentsUsed.has("legacy")) {
      componentsUsed.delete("legacy");
      legacyAssets = assetsForEntry(compilationStats.legacy).assets;
    }

    const scripts = [
      ...(assetsForEntry(compilationStats.client).assets?.js ?? []),
      ...(legacyAssets?.js ?? []),
    ];
    const styles = [
      ...(stylesForComponents(
        ["global", ...componentsWithStylesInHead],
        compilationStats.client,
      ) ?? []),
      ...(legacyAssets?.css ?? []),
    ];

    const preloadFonts = ["global"]
      .flatMap((component) =>
        assetsForEntry(
          compilationStats.client,
          styleEntryForComponent(component),
        ).auxiliaryAssets?.woff2?.filter((path) =>
          path.toLowerCase().includes("inter"),
        ),
      )
      .filter((x) => x !== undefined);

    // if you want to put some script inline, put it in entry.inline.js
    // and you'll get CSP generation: see the README
    return html`
      <!doctype html>
      <html
        lang="en"
        style="color-scheme: light dark;"
        data-renderer=${context.renderer}
        data-noads=${ifDefined(WRITER_MODE ? "enabled" : undefined)}
      >
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>${context.pageTitle || "MDN"}</title>
          ${Favicon()} ${unsafeHTML(`<script>${inlineScript}</script>`)}
          ${styles.map(
            (path) =>
              html`<link rel="stylesheet" href=${path} fetchpriority="high" />`,
          )}
          ${preloadFonts.map(
            (path) =>
              html`<link
                rel="preload"
                href=${path}
                as="font"
                type="font/woff2"
                crossorigin="anonymous"
                fetchpriority="low"
              />`,
          )}
          ${scripts?.map(
            (path) => html`<script src=${path} type="module"></script>`,
          )}
        </head>
        ${markup}
      </html>
    `;
  }
}
