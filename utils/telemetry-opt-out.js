const FIRST_PARTY_DATA_OPT_OUT_COOKIE_NAME = "moz-1st-party-data-opt-out";

/**
 * Checks if user has opted out of first-party data collection.
 * @param {string} [cookie] - An optional mock cookie string to ease unit testing.
 * @returns {boolean} True if user has opted out, false otherwise
 */
export function userIsOptedOut(cookie) {
  return (cookie || document.cookie)
    .split("; ")
    .includes(`${FIRST_PARTY_DATA_OPT_OUT_COOKIE_NAME}=true`);
}
