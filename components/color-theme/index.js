import { html, css, LitElement } from "lit";

import osDefault from "../icon/theme.svg?mdnsvg";
import light from "../icon/sun.svg?mdnsvg";
import dark from "../icon/moon.svg?mdnsvg";
import { LitElement } from "lit";

export class ColorTheme extends LitElement {
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
    } catch (e) {
      console.warn("Unable to read theme from localStorage", e);
    }
    this._mode = mode;
  }

  _setMode(mode) {
    try {
      localStorage.setItem("theme", mode);
    } catch (e) {
      console.warn("Unable to write theme to localStorage", e);
    }
    this._mode = mode;
    document.querySelector(":root").style.colorScheme =
      mode === "osDefault" ? "light dark" : mode;
    this._toggleDropDown();
  }

  _getCurrent() {
    switch (this._mode) {
      case "light":
        return light;
      case "dark":
        return dark;
      default:
        return osDefault;
    }
  }
  _toggleDropDown() {
    const button = this.shadowRoot.querySelector(".dropdown");
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    const dropdown = this.shadowRoot.getElementById(
      button.getAttribute("aria-controls"),
    );

    button.setAttribute("aria-expanded", !isExpanded);
    dropdown.toggleAttribute("hidden");
  }
  _themeChanged() {}

  render() {
    return html`<div class="color-theme">
      <button
        class="color-theme__button dropdown"
        aria-expanded="false"
        aria-controls="color-theme__dropdown-1"
        @click=${(e) => this._toggleDropDown(e)}>
        ${this._getCurrent()} Theme
      </button>
      <div
        class="color-theme__dropdown"
        id="color-theme__dropdown-1"
        data-side="right"
        hidden>
        <ul class="color-theme__list">
          <li>
            <button
              class="color-theme__option"
              @click=${() => this._setMode("osDefault")}>
              ${osDefault} OS default
            </button>
          </li>
          <li>
            <button
              class="color-theme__option"
              @click=${() => this._setMode("light")}>
              ${light} Light
            </button>
          </li>
          <li>
            <button
              class="color-theme__option"
              @click=${() => this._setMode("dark")}>
              ${dark} Dark
            </button>
          </li>
        </ul>
      </div>
    </div>`;
  }
}

customElements.define("mdn-color-theme", ColorTheme);
