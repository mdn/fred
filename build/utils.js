import { html } from "@lit-labs/ssr";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

/**
 * @param {import("@rspack/core").StatsCompilation} [manifest]
 * @param {string} [entry]
 */
export function tagsFromManifest(manifest, entry = "index") {
  const publicPath = manifest?.publicPath;
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
      styleTags.push(html`<link rel="stylesheet" href=${publicPath + name} />`);
    }
  }

  return { scriptTags, styleTags };
}

/**
 * @param {Fred.Context} context
 * @param {import("lit-html").TemplateResult} markup
 * @param {import("@rspack/core").StatsCompilation[]} manifest
 * @param {string} inlineScript
 */
export function renderHTML(context, markup, manifest, inlineScript) {
  const { styleTags: ssrStyleTags } = tagsFromManifest(
    manifest.find((x) => x.name === "ssr"),
  );
  const { scriptTags: clientScriptTags, styleTags: clientStyleTags } =
    tagsFromManifest(manifest.find((x) => x.name === "client"));

  const tags = [ssrStyleTags, clientScriptTags, clientStyleTags];
  return html`
    <!doctype html>
    <html lang="en" style="color-scheme: light dark;">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${unsafeHTML(`<script>${inlineScript}</script>`)} ${tags}
        <title>${context.pageTitle || "MDN"}</title>
      </head>
      ${markup}
    </html>
  `;
}
