/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Checks if Do Not Track (DNT) is enabled.
 * @param {string} [dnt] - DNT value to check (for testing)
 * @param {string} [ua] - User agent string (for testing)
 * @returns {boolean} True if DNT is enabled, false otherwise
 */
export function dntEnabled(dnt, ua) {
  let dntStatus =
    dnt ||
    navigator.doNotTrack ||
    // @ts-expect-error - non-standard property
    globalThis.doNotTrack ||
    // @ts-expect-error - non-standard property
    navigator.msDoNotTrack;
  const userAgent = ua || navigator.userAgent;
  const anomalousWinVersions = [
    "Windows NT 6.1",
    "Windows NT 6.2",
    "Windows NT 6.3",
  ];
  const fxMatch = userAgent.match(/Firefox\/(\d+)/);
  const ieRegEx = /MSIE|Trident/i;
  const isIE = ieRegEx.test(userAgent);
  const platform = userAgent.match(/Windows.+?(?=;)/g);

  if (isIE && typeof Array.prototype.indexOf !== "function") {
    return false;
  } else if (fxMatch && Number.parseInt(fxMatch[1] || "0", 10) < 32) {
    dntStatus = "Unspecified";
  } else if (
    isIE &&
    platform &&
    anomalousWinVersions.includes(platform.toString())
  ) {
    dntStatus = "Unspecified";
  } else {
    // @ts-expect-error - DNT status can be various types
    dntStatus = { 0: "Disabled", 1: "Enabled" }[dntStatus] || "Unspecified";
  }

  return dntStatus === "Enabled";
}
