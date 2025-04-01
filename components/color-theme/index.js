import { LitElement, css, html } from "lit";

import { L10nMixin } from "../../l10n/mixin";

import dark from "../icon/moon.svg?mdnsvg";
import light from "../icon/sun.svg?mdnsvg";
import osDefault from "../icon/theme.svg?mdnsvg";

export class ColorTheme extends L10nMixin(LitElement) {
  static styles = css`
    .color-theme {
      position: relative;
    }

    .color-theme__button {
      margin: 0;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      column-gap: 0.25rem;
      border: none;
      background-color: transparent;
      color: inherit;
      font: inherit;

      &:is(:hover, :focus),
      &[aria-expanded="true"] {
        background-color: var(--background-secondary);
      }
    }

    .color-theme__dropdown {
      position: absolute;
      z-index: 1;
      margin: 0;
      padding: 0.75rem;
      width: max-content;
      border: 1px solid var(--text-secondary);
      background-color: var(--background-primary);

      &[data-side="left"] {
        right: 0;
      }

      &[data-side="right"] {
        left: 0;
      }
    }

    .color-theme__list {
      margin: 0;
      padding: 0;
      width: max-content;
      background-color: var(--background-primary);
      list-style: none;
    }

    .color-theme__option {
      display: flex;
      align-items: center;
      column-gap: 0.25rem;
      margin: 0;
      padding: 0.25rem;
      width: 100%;
      border: none;
      background-color: transparent;
      color: var(--text-secondary);
      font: inherit;

      &:hover {
        background-color: var(--background-secondary);
      }
    }
  `;

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
