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
  // for old version of IE we need to use the msDoNotTrack property of navigator
  // on newer versions, and newer platforms, this is doNotTrack but, on the window object
  // Safari also exposes the property on the window object.
  let dntStatus =
    dnt ||
    navigator.doNotTrack ||
    // @ts-expect-error - non-standard property
    globalThis.doNotTrack ||
    // @ts-expect-error - non-standard property
    navigator.msDoNotTrack;
  const userAgent = ua || navigator.userAgent;

  // List of Windows versions known to not implement DNT according to the standard.
  const anomalousWinVersions = [
    "Windows NT 6.1",
    "Windows NT 6.2",
    "Windows NT 6.3",
  ];

  const fxMatch = userAgent.match(/Firefox\/(\d+)/);
  const ieRegEx = /MSIE|Trident/i;
  const isIE = ieRegEx.test(userAgent);
  // Matches from Windows up to the first occurance of ; un-greedily
  // http://www.regexr.com/3c2el
  const platform = userAgent.match(/Windows.+?(?=;)/g);

  // With old versions of IE, DNT did not exist so we simply return false;
  if (isIE && typeof Array.prototype.indexOf !== "function") {
    return false;
  } else if (fxMatch && Number.parseInt(fxMatch[1] || "0", 10) < 32) {
    // Can't say for sure if it is 1 or 0, due to Fx bug 887703
    dntStatus = "Unspecified";
  } else if (
    isIE &&
    platform &&
    anomalousWinVersions.includes(platform.toString())
  ) {
    // default is on, which does not honor the specification
    dntStatus = "Unspecified";
  } else {
    // sets dntStatus to Disabled or Enabled based on the value returned by the browser.
    // If dntStatus is undefined, it will be set to Unspecified
    // @ts-expect-error - DNT status can be various types
    dntStatus = { 0: "Disabled", 1: "Enabled" }[dntStatus] || "Unspecified";
  }

  return dntStatus === "Enabled";
}
