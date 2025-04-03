/**
 * @import { ManifestData } from "@rsbuild/core";
 */

import { html } from "@lit-labs/ssr";

/**
 * @param {ManifestData} manifest
 * @param {string} entry
 */
export function tagsFromManifest({ entries }, entry = "index") {
  const { js = [], css = [] } = entries[entry]?.initial || {};

  const scriptTags = js.map((url) => html`<script src=${url} defer></script>`);
  const styleTags = css.map(
    (file) => html`<link rel="stylesheet" href=${file} />`,
  );
  return { scriptTags, styleTags };
}

/**
 *
 * @param {ManifestData} ssrManifest
 * @param {ManifestData} clientManifest
 * @param {Fred.Context} context
 * @param {import("lit-html").TemplateResult} [markup]
 * @returns
 */
export function renderHTML(ssrManifest, clientManifest, context, markup) {
  const { styleTags: ssrStyleTags } = tagsFromManifest(ssrManifest);
  const { scriptTags: clientScriptTags, styleTags: clientStyleTags } =
    tagsFromManifest(clientManifest);
  const { scriptTags: legacyScriptTags, styleTags: legacyStyleTags } =
    tagsFromManifest(clientManifest, "legacy");

  const legacyTags = context.path.endsWith("settings")
    ? [legacyScriptTags, legacyStyleTags]
    : [];

  const tags = [ssrStyleTags, clientScriptTags, clientStyleTags, ...legacyTags];
  return html`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${tags}
        <title>${context.pageTitle || "MDN"}</title>
      </head>
      ${markup}
    </html>
  `;
}
