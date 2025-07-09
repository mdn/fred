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
    let value = event instanceof CustomEvent && this._lightOrDark(event.detail);
    try {
      value ||= this._lightOrDark(
        getComputedStyle(this.#host).getPropertyValue("color-scheme"),
      );
    } catch {
      /* no-op */
    }
    value ||= this._matchMedia?.matches ? "dark" : "light";
    const oldValue = this.value;
    this.value = value;
    this.#host.requestUpdate("ThemeController.value", oldValue);
  }

  /**
   * @param {any} value
   * @returns {"light" | "dark" | undefined}
   */
  _lightOrDark(value) {
    switch (value) {
      case "light":
        return "light";
      case "dark":
        return "dark";
      default:
        return;
    }
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
