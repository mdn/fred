import { html } from "@lit-labs/ssr";
import { nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import inlineScript from "../../entry.inline.js?source&csp=true";
import { ROBOTS_GLOBAL_ALLOW, WRITER_MODE } from "../env/index.js";
import { ALLOW_RUNTIME, runtimeVariables } from "../env/runtime.js";
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
        ).auxiliaryAssets?.woff2?.filter((path) => {
          const filename = path.split("/").pop() || "";
          return /^(inter-latin|jetbrains-mono-latin)\..+\.woff2$/i.test(
            filename,
          );
        }),
      )
      .filter((x) => x !== undefined);

    const area =
      context.path.split("/")[3]?.toLowerCase() === "learn_web_development"
        ? "learn"
        : undefined;

    const env = Object.fromEntries(
      Object.entries(process.env).filter(([key]) =>
        runtimeVariables.includes(key),
      ),
    );

    // if you want to put some script inline, put it in entry.inline.js
    // and you'll get CSP generation: see the README
    return html`
      <!doctype html>
      <html
        lang=${context.locale}
        data-theme="light dark"
        data-renderer=${context.renderer}
        data-nop=${ifDefined(WRITER_MODE ? "yes" : undefined)}
        data-current-area=${ifDefined(area)}
      >
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>${context.pageTitle || "MDN"}</title>
          ${ALLOW_RUNTIME
            ? unsafeHTML(`<script>process = {
  env: ${JSON.stringify(env)}
};</script>`)
            : nothing}
          ${unsafeHTML(`<script>${inlineScript}</script>`)}
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
          ${Favicon()} ${this._renderMeta(context)}
          <link
            rel="canonical"
            href=${`https://developer.mozilla.org${context.url}`}
          />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="search"
            type="application/opensearchdescription+xml"
            href="/opensearch.xml"
            title="MDN Web Docs"
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="MDN Blog RSS Feed"
            href="https://developer.mozilla.org/en-US/blog/rss.xml"
          />
        </head>
        ${markup}
      </html>
    `;
  }

  /**
   * @param {import("@fred").Context} context
   */
  _renderMeta(context) {
    const noIndexing =
      "doc" in context
        ? context.doc.noIndexing
        : "noIndexing" in context
          ? context.noIndexing
          : false;
    const onlyFollow = "onlyFollow" in context ? context.onlyFollow : false;
    const robots =
      !ROBOTS_GLOBAL_ALLOW || noIndexing
        ? "noindex, nofollow"
        : onlyFollow
          ? "noindex, follow"
          : "";

    const title =
      ("doc" in context ? context.doc.pageTitle : context.pageTitle) ||
      "MDN Web Docs";
    const description =
      ("pageDescription" in context
        ? context.pageDescription
        : "doc" in context && "summary" in context.doc
          ? context.doc.summary
          : "") ||
      "The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.";

    const entries = {
      robots,
      description,
      "og:url": `https://developer.mozilla.org${context.url}`,
      "og:title": title,
      "og:locale": context.locale.replace("-", "_"),
      "og:description": description,
      "og:image":
        "https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png",
      "og:image:type": "image/png",
      "og:image:height": "1080",
      "og:image:width": "1920",
      "og:image:alt":
        "The MDN Web Docs logo, featuring a blue accent color, displayed on a solid black background.",
      "og:site_name": "MDN Web Docs",
      "twitter:card": "summary_large_image",
      "twitter:creator": "MozDevNet",
    };

    return Object.entries(entries).map(([key, value]) =>
      value ? html`<meta name=${key} content=${value} />` : nothing,
    );
  }
}
