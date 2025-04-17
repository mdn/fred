import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";

import dark from "../icon/moon.svg?lit";
import light from "../icon/sun.svg?lit";
import osDefault from "../icon/theme.svg?lit";

import styles from "./element.css?lit";

import "../dropdown/element.js";

export class MDNColorTheme extends L10nMixin(LitElement) {
  static styles = styles;

  static properties = {
    _mode: { state: true },
  };

  constructor() {
    super();
    this._mode = "light dark";
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
        const dropdown = this.shadowRoot?.querySelector("mdn-dropdown");
        if (dropdown) {
          dropdown.open = false;
        }
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
      <mdn-dropdown>
        <button slot="button" class="color-theme__button dropdown">
          ${this._icon} ${this.l10n`Theme`}
        </button>
        <div
          slot="dropdown"
          class="color-theme__dropdown"
          id="color-theme__dropdown"
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
      </mdn-dropdown>
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
