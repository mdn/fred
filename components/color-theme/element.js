import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";

import dark from "../icon/moon.svg?lit";
import light from "../icon/sun.svg?lit";
import osDefault from "../icon/theme.svg?lit";

import styles from "./element.css?lit";
import { applyColorTheme, loadColorTheme } from "./utils.js";

export class MDNColorTheme extends L10nMixin(LitElement) {
  static styles = styles;

  static properties = {
    _mode: { state: true },
    _dropdown: { state: true },
  };

  constructor() {
    super();
    /** @type {string | null} */
    this._mode = null;
    this._dropdown = false;
  }

  /** @param {MouseEvent} event */
  _setMode({ target }) {
    if (target instanceof HTMLElement) {
      const mode = target.dataset.mode;
      if (mode) {
        this._mode = mode;
        try {
          localStorage.setItem("theme", mode);
        } catch (error) {
          console.warn("Unable to write theme to localStorage", error);
        }
        applyColorTheme(this._mode);
        this._dropdown = false;
      }
    }
  }

  get _icon() {
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
    this._dropdown = !this._dropdown;
  }

  render() {
    return html`<div class="color-theme">
      <button
        class="color-theme__button dropdown"
        aria-expanded=${this._dropdown}
        aria-controls="color-theme__dropdown-1"
        @click=${this._toggleDropDown}
      >
        ${this._icon} ${this.l10n`Theme`}
      </button>
      <div
        class="color-theme__dropdown"
        id="color-theme__dropdown-1"
        data-side="right"
        ?hidden=${!this._dropdown}
      >
        <ul class="color-theme__list">
          <li>
            <button
              class="color-theme__option"
              data-mode="osDefault"
              @click=${this._setMode}
            >
              ${osDefault} ${this.l10n("theme_default")`OS default`}
            </button>
          </li>
          <li>
            <button
              class="color-theme__option"
              data-mode="light"
              @click=${this._setMode}
            >
              ${light} ${this.l10n`Light`}
            </button>
          </li>
          <li>
            <button
              class="color-theme__option"
              data-mode="dark"
              @click=${this._setMode}
            >
              ${dark} ${this.l10n`Dark`}
            </button>
          </li>
        </ul>
      </div>
    </div>`;
  }

  firstUpdated() {
    const mode = loadColorTheme();
    if (mode) {
      this._mode = mode;
      applyColorTheme(mode);
    }
  }
}

customElements.define("mdn-color-theme", MDNColorTheme);
