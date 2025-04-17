import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";

import dark from "../icon/moon.svg?lit";
import light from "../icon/sun.svg?lit";
import osDefault from "../icon/theme.svg?lit";

import styles from "./element.css?lit";

export class MDNColorTheme extends L10nMixin(LitElement) {
  static styles = styles;

  static properties = {
    _mode: { state: true },
    _dropdown: { state: true },
  };

  constructor() {
    super();
    this._mode = "light dark";
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

  /**
   * @param {import("lit").PropertyValues<this>} changedProperties
   */
  willUpdate(changedProperties) {
    if (changedProperties.has("_mode") && globalThis.document) {
      document.documentElement.style.colorScheme = this._mode;
    }
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
              data-mode="light dark"
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
    // we have to do this here and immediately cause a re-render
    // as doing so in connectedCallback causes a hydration error:
    // https://github.com/lit/lit/issues/1434

    // this logic is also reflected in "/entry.inline.js"

    let mode;
    try {
      mode = localStorage.getItem("theme");
    } catch (error) {
      console.warn("Unable to read theme from localStorage", error);
    }
    if (mode) {
      this._mode = mode;
    }
  }
}

customElements.define("mdn-color-theme", MDNColorTheme);
