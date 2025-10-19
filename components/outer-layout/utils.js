import { camelToKebabCase } from "../../utils/name-transformation.js";

/**
 * @param {import("@rspack/core").StatsCompilation} manifest
 * @param {string} [entry]
 */
export function assetsForEntry(manifest, entry = "index") {
  const publicPath = manifest.publicPath;
  if (!publicPath) {
    throw new Error("publicPath is not defined in manifest");
  }

  const group = manifest.entrypoints?.[entry];

  return {
    assets: groupByExtension(
      group?.assets?.map(({ name }) => publicPath + name),
    ),
    auxiliaryAssets: groupByExtension(
      group?.auxiliaryAssets?.map(({ name }) => publicPath + name),
    ),
  };
}

/**
 * @param {string[]} [paths]
 */
export function groupByExtension(paths) {
  if (!paths) {
    return;
  }
  /** @type {Record<string, string[]>} */
  const grouped = {};
  for (const path of paths) {
    const extension = path.toLowerCase().match(/\.([a-z0-9]*)$/)?.[1];
    if (extension) {
      if (grouped[extension]) {
        grouped[extension].push(path);
      } else {
        grouped[extension] = [path];
      }
    }
  }
  return grouped;
}

/**
 * @param {string[]} components
 * @param {import("@rspack/core").StatsCompilation} manifest
 */
export function stylesForComponents(components, manifest) {
  return [
    ...new Set(
      components
        .flatMap(
          (component) =>
            assetsForEntry(manifest, styleEntryForComponent(component)).assets
              ?.css,
        )
        .filter((x) => x !== undefined),
    ),
  ];
}

/**
 * @param {string} component
 */
export function styleEntryForComponent(component) {
  return `styles-${camelToKebabCase(component)}`;
}
