/**
 *
 * @param {string} click
 * @param {number |undefined } version
 * @returns
 */
export function clickLink(click, version) {
  return `/pong/click?code=${encodeURIComponent(click)}&version=${version}`;
}

/**
 *
 * @param {string | undefined} image
 * @returns
 */
export function imgLink(image) {
  return `/pimg/${encodeURIComponent(image || "")}`;
}

/**
 *
 * @param {string} viewed
 * @param {number | undefined} version
 * @returns
 */
export function viewedLink(viewed, version) {
  return `/pong/viewed?code=${encodeURIComponent(viewed)}${
    version ? `&version=${version}` : ""
  }`;
}
