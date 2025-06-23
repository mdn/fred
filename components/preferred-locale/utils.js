import {
  deleteCookie,
  getCookieValue,
  setCookieValue,
} from "../cookie/utils.js";

const COOKIE_NAME = "preferredlocale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 3; // 3 years.

/** @returns {string|undefined} */
export function getPreferredLocale() {
  return getCookieValue(COOKIE_NAME);
}

/** @param {string} locale */
export function setPreferredLocale(locale) {
  setCookieValue(COOKIE_NAME, locale, {
    maxAge: COOKIE_MAX_AGE,
  });
}

export function resetPreferredLocale() {
  deleteCookie(COOKIE_NAME);
}
