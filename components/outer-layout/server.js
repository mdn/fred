import { html } from "@lit-labs/ssr";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { toCamelCase } from "../../build/utils.js";
import inlineScript from "../../entry.inline.js?source&csp=true";
import Favicon from "../favicon/pure.js";
import { ServerComponent } from "../server/index.js";

export class OuterLayout extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   * @param {import("lit-html").TemplateResult} markup
   * @param {import("@fred").CompilationStats} compilationStats
   * @param {Set<string>} components
   */
  render(context, markup, compilationStats, components) {
    let legacyTags;
    if (components.has("legacy")) {
      components.delete("legacy");
      legacyTags = Object.values(
        this.tagsFromManifest(compilationStats.legacy),
      ).flat();
    }

    const { scriptTags } = this.tagsFromManifest(compilationStats.client);
    const styleTags = ["global", ...components].flatMap(
      (component) =>
        this.tagsFromManifest(
          compilationStats.client,
          `styles-${toCamelCase(component)}`,
        ).styleTags,
    );

    // if you want to put some script inline, put it in entry.inline.js
    // and you'll get CSP generation: see the README
    return html`
      <!doctype html>
      <html
        lang="en"
        style="color-scheme: light dark;"
        data-renderer=${context.renderer}
      >
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          ${Favicon()} ${unsafeHTML(`<script>${inlineScript}</script>`)}
          ${styleTags} ${scriptTags} ${legacyTags}
          <title>${context.pageTitle || "MDN"}</title>
        </head>
        ${markup}
      </html>
    `;
  }

  /**
   * @param {import("@rspack/core").StatsCompilation} manifest
   * @param {string} [entry]
   */
  tagsFromManifest(manifest, entry = "index") {
    const publicPath = manifest.publicPath;
    if (!publicPath) {
      throw new Error("publicPath is not defined in manifest");
    }

    const scriptTags = [];
    const styleTags = [];

    for (const { name } of manifest.entrypoints?.[entry]?.assets || []) {
      if (name.endsWith(".js")) {
        scriptTags.push(
          html`<script src=${publicPath + name} type="module"></script>`,
        );
      } else if (name.endsWith(".css")) {
        styleTags.push(
          html`<link rel="stylesheet" href=${publicPath + name} />`,
        );
      }
    }

    return { scriptTags, styleTags };
  }
}
