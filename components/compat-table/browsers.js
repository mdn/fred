import { isBrowserVisible } from "./settings.js";

/** @import { BrowserName, Browsers, Identifier } from "@bcd" */
/** @import { HiddenBrowsers } from "@compat" */
/** @import { BrowserVisibility } from "./settings.js" */

/**
 * Returns visible platforms and browsers, plus exclusions for the settings dialog.
 * @param {string} category
 * @param {Identifier} data
 * @param {Partial<Browsers>} browserInfo
 * @param {BrowserVisibility} visibility
 * @returns {[string[], BrowserName[], HiddenBrowsers]}
 */
export function gatherPlatformsAndBrowsers(
  category,
  data,
  browserInfo,
  visibility,
) {
  const isVisible = (/** @type {BrowserName} */ browser) =>
    isBrowserVisible(browser, visibility);

  const runtimes = /** @type {BrowserName[]} */ (
    Object.entries(browserInfo)
      .filter(([, { type }]) => type == "server")
      .map(([key]) => key)
  );

  let platforms = ["desktop", "mobile"];
  if (
    category === "javascript" ||
    runtimes.some(
      (runtime) => data.__compat && runtime in data.__compat.support,
    )
  ) {
    platforms.push("server");
  }
  for (const [browser, { type }] of Object.entries(browserInfo)) {
    if (
      type !== "server" &&
      !platforms.includes(type) &&
      isVisible(/** @type {BrowserName} */ (browser))
    ) {
      platforms.push(type);
    }
  }

  /** @type {BrowserName[]} */
  let browsers = [];

  // Add browsers in platform order to align table cells
  for (const platform of platforms) {
    const platformBrowsers = /** @type {BrowserName[]} */ (
      Object.keys(browserInfo)
    );
    browsers.push(
      ...platformBrowsers.filter(
        (browser) =>
          browser in browserInfo && browserInfo[browser]?.type === platform,
      ),
    );
  }

  // Include excluded platforms so the dialog can explain every missing browser.
  /** @type {HiddenBrowsers} */
  const hidden = {};

  if (category === "webextensions") {
    for (const [browser, { accepts_webextensions }] of Object.entries(
      browserInfo,
    )) {
      if (!accepts_webextensions) {
        hidden[/** @type {BrowserName} */ (browser)] = "not-applicable";
      }
    }
  }

  // Preserve more specific exclusion reasons, such as WebExtensions.
  if (category !== "javascript") {
    for (const runtime of runtimes) {
      if (data.__compat && !(runtime in data.__compat.support)) {
        hidden[runtime] ??= "no-data";
      }
    }
  }

  browsers = browsers.filter(
    (browser) => !(browser in hidden) && isVisible(browser),
  );

  // Avoid empty platform headers.
  platforms = platforms.filter((platform) =>
    browsers.some((browser) => browserInfo[browser]?.type === platform),
  );

  return [platforms, browsers, hidden];
}
