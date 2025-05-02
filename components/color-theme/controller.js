/**
 * @import { LitElement } from "lit";
 * @import { ColorScheme } from "./types.js";
 */

/**
 * Requests a Lit update when the theme changes,
 * with a "ThemeController.value" changed property in `willUpdate`.
 * Current theme can be accessed through `.value`.
 */
export class ThemeController {
  #host;

  /** @param {LitElement} host */
  constructor(host) {
    this.#host = host;
    this.#host.addController(this);
    /** @type {ColorScheme} */
    this.value = "light dark";
    this.initialValue = "light dark";
  }

  /** @param {Event} [event] */
  _updateTheme(event) {
    const value = (() => {
      switch (event instanceof CustomEvent && event.detail) {
        case "light":
          return "light";
        case "dark":
          return "dark";
        default:
          return this._matchMedia?.matches ? "dark" : "light";
      }
    })();
    const oldValue = this.value;
    this.value = value;
    this.#host.requestUpdate("ThemeController.value", oldValue);
  }

  hostConnected() {
    this._updateTheme = this._updateTheme.bind(this);
    globalThis.addEventListener("mdn-color-theme-update", this._updateTheme);
    this._matchMedia = globalThis.matchMedia("(prefers-color-scheme: dark)");
    this._matchMedia.addEventListener("change", this._updateTheme);
    this._updateTheme();
    this.initialValue = this.value;
  }

  hostDisconnected() {
    this._matchMedia?.removeEventListener("change", this._updateTheme);
  }
}
