import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin";

import dark from "../icon/moon.svg?lit";
import light from "../icon/sun.svg?lit";
import osDefault from "../icon/theme.svg?lit";

import styles from "./index.css?lit";

export class ColorTheme extends L10nMixin(LitElement) {
  static styles = styles;

  static properties = {
    ...super.properties,
    _mode: { attribute: false },
  };

  constructor() {
    super();
    this._mode = null;
  }

  firstUpdated() {
    let mode = null;
    try {
      mode = localStorage.getItem("theme");
    } catch (error) {
      console.warn("Unable to read theme from localStorage", error);
    }
    this._mode = mode;
  }

  // @ts-expect-error
  _setMode(mode) {
    try {
      localStorage.setItem("theme", mode);
    } catch (error) {
      console.warn("Unable to write theme to localStorage", error);
    }
    this._mode = mode;
    // @ts-expect-error
    document.querySelector(":root").style.colorScheme =
      mode === "osDefault" ? "light dark" : mode;
    this._toggleDropDown();
  }

  _getCurrent() {
    switch (this._mode) {
      case "light": {
        return light;
      }
      case "dark": {
        return dark;
      }
      default: {
        return osDefault;
      }
    }
  }
  _toggleDropDown() {
    // @ts-expect-error
    const button = this.shadowRoot.querySelector(".dropdown");
    // @ts-expect-error
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    // @ts-expect-error
    const dropdownId = button.getAttribute("aria-controls");
    // @ts-expect-error
    const dropdown = this.shadowRoot.querySelector(`#${dropdownId}`);

    // @ts-expect-error
    button.setAttribute("aria-expanded", !isExpanded);
    // @ts-expect-error
    dropdown.toggleAttribute("hidden");
  }
  _themeChanged() {}

  render() {
    const setDefault = () => this._setMode("osDefault");
    const setLight = () => this._setMode("light");
    const setDark = () => this._setMode("dark");

    return html`<div class="color-theme">
      <button
        class="color-theme__button dropdown"
        aria-expanded="false"
        aria-controls="color-theme__dropdown-1"
        @click=${this._toggleDropDown}
      >
        ${this._getCurrent()} ${this.l10n`Theme`}
      </button>
      <div
        class="color-theme__dropdown"
        id="color-theme__dropdown-1"
        data-side="right"
        hidden
      >
        <ul class="color-theme__list">
          <li>
            <button class="color-theme__option" @click=${setDefault}>
              ${osDefault} ${this.l10n("theme_default")`OS default`}
            </button>
          </li>
          <li>
            <button class="color-theme__option" @click=${setLight}>
              ${light} ${this.l10n`Light`}
            </button>
          </li>
          <li>
            <button class="color-theme__option" @click=${setDark}>
              ${dark} ${this.l10n`Dark`}
            </button>
          </li>
        </ul>
      </div>
    </div>`;
  }
}

customElements.define("mdn-color-theme", ColorTheme);
