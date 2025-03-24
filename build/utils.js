import fs from "node:fs";

/**
 * @import { Request, Response } from "express";
 * @import { RsbuildDevServer, ManifestData } from "@rsbuild/core";
 */

const templateHtml = fs.readFileSync("./template.html", "utf-8");

/**
 * @param {string} manifest
 * @param {string} entry
 */
export function tagsFromManifest(manifest, entry = "index") {
  /** @type {ManifestData} */
  const { entries } = JSON.parse(manifest);

  const { js = [], css = [] } = entries[entry]?.initial || {};

  const scriptTags = js
    .map((url) => `<script src="${url}" defer></script>`)
    .join("\n");
  const styleTags = css
    .map((file) => `<link rel="stylesheet" href="${file}">`)
    .join("\n");
  return { scriptTags, styleTags };
}

export function renderHTML(ssrManifest, clientManifest, legacy, markup) {
  const { scriptTags: ssrScriptTags, styleTags: ssrStyleTags } =
    tagsFromManifest(ssrManifest);
  const { scriptTags: clientScriptTags, styleTags: clientStyleTags } =
    tagsFromManifest(clientManifest);
  const { scriptTags: legacyScriptTags, styleTags: legacyStyleTags } =
    tagsFromManifest(clientManifest, "legacy");

  const legacyTags = legacy ? [legacyScriptTags, legacyStyleTags] : [];

  const tags = [
    //ssrScriptTags,
    ssrStyleTags,
    clientScriptTags,
    clientStyleTags,
    ...legacyTags,
  ].join("\n");
  return templateHtml
    .replace("<!--app-content-->", markup || "")
    .replace("<!--app-head-->", tags);
}
