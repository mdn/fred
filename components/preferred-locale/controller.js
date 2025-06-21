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

    const event = new CustomEvent("preferred-locale-changed", {
      detail: { locale: locale },
      bubbles: true,
      cancelable: false,
    });

    globalThis.dispatchEvent(event);
  }

  reset() {
    this.set(undefined);
  }

  /** @param {Event} [event] */
  _updatePreferredLocale(event) {
    const value =
      event instanceof CustomEvent && event.detail
        ? event.detail.locale
        : this.get();
    const oldValue = this.value;
    this.value = value;
    this.#host.requestUpdate("PreferredLocale.value", oldValue);
  }

  hostConnected() {
    this._updatePreferredLocale = this._updatePreferredLocale.bind(this);
    globalThis.addEventListener(
      "preferred-locale-changed",
      this._updatePreferredLocale,
    );
    this._updatePreferredLocale();
    this.initialValue = this.value;
  }

  hostDisconnected() {
    globalThis.removeEventListener(
      "preferred-locale-changed",
      this._updatePreferredLocale,
    );
  }
}
