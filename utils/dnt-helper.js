/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Returns true or false based on whether doNotTrack is enabled. It also takes into account the
 * anomalies, such as !bugzilla 887703, which effect versions of Fx 31 and lower. It also handles
 * IE versions on Windows 7, 8 and 8.1, where the DNT implementation does not honor the spec.
 * Based on https://github.com/mozmeao/dnt-helper/blob/main/src/mozilla-dnt-helper.js
 * @see https://bugzilla.mozilla.org/show_bug.cgi?id=1217896 for more details
 * @params {string} [dnt] - An optional mock doNotTrack string to ease unit testing.
 * @params {string} [ua] - An optional mock userAgent string to ease unit testing.
 * @returns {boolean} true if enabled else false
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
