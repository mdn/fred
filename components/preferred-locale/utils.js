import { PREFERRED_LOCALE_COOKIE_NAME } from "../../utils/preferred-locale.js";
import {
  deleteCookie,
  getCookieValue,
  setCookieValue,
} from "../cookie/utils.js";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 3; // 3 years.

/** @returns {string|undefined} */
export function getPreferredLocale() {
  return getCookieValue(PREFERRED_LOCALE_COOKIE_NAME);
}

/** @param {string} locale */
export function setPreferredLocale(locale) {
  setCookieValue(PREFERRED_LOCALE_COOKIE_NAME, locale, {
    maxAge: COOKIE_MAX_AGE,
  });
}

export function resetPreferredLocale() {
  deleteCookie(PREFERRED_LOCALE_COOKIE_NAME);
}
