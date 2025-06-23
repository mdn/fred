/**
 * @import { LitElement } from "lit";
 */

import {
  deleteCookie,
  getCookieValue,
  setCookieValue,
} from "../cookie/utils.js";

const PREFERRED_LOCALE_COOKIE_NAME = "preferredlocale";
const PREFERRED_LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 3; // 3 years.
const PREFERRED_LOCALE_CHANGED_EVENT = "preferred-locale-changed";

export class PreferredLocaleController {
  #host;

  /** @param {LitElement} host */
  constructor(host) {
    this.#host = host;
    this.#host.addController(this);
    /** @type {string|undefined} */
    this.value = undefined;
    this.initialValue = undefined;
  }

  get() {
    return getCookieValue(PREFERRED_LOCALE_COOKIE_NAME);
  }

  /** @param {string|undefined} locale */
  set(locale) {
    if (locale) {
      setCookieValue(PREFERRED_LOCALE_COOKIE_NAME, locale, {
        maxAge: PREFERRED_LOCALE_COOKIE_MAX_AGE,
      });
    } else {
      deleteCookie(PREFERRED_LOCALE_COOKIE_NAME);
    }

    const event = new CustomEvent(PREFERRED_LOCALE_CHANGED_EVENT, {
      detail: { locale },
      bubbles: true,
      cancelable: false,
    });

    globalThis.dispatchEvent(event);
  }

  /** @param {Event} [event] */
  _updatePreferredLocale(event) {
    const value =
      event instanceof CustomEvent && event.detail
        ? event.detail.locale
        : this.get();
    this.value = value;
    this.#host.requestUpdate();
  }

  hostConnected() {
    this._updatePreferredLocale = this._updatePreferredLocale.bind(this);
    globalThis.addEventListener(
      PREFERRED_LOCALE_CHANGED_EVENT,
      this._updatePreferredLocale,
    );
    this._updatePreferredLocale();
    this.initialValue = this.value;
  }

  hostDisconnected() {
    globalThis.removeEventListener(
      PREFERRED_LOCALE_CHANGED_EVENT,
      this._updatePreferredLocale,
    );
  }
}
