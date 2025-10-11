import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";

import styles from "./element.css?lit";

import "../dropdown/element.js";

export class MDNColorTheme extends L10nMixin(LitElement) {
  static styles = styles;

  static properties = {
    _mode: { state: true },
  };

  constructor() {
    super();
    /** @type {import("./types.js").ColorScheme} */
    this._mode = "light dark";
    this._options = Object.entries({
      "light dark": this.l10n("theme-default")`OS default`,
      light: this.l10n`Light`,
      dark: this.l10n`Dark`,
    });
  }

  /** @param {MouseEvent} event */
  _setMode({ target }) {
    if (target instanceof HTMLElement) {
      const mode = target.dataset.mode;
      if (mode === "light dark" || mode === "light" || mode === "dark") {
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

  /**
   * @param {import("lit").PropertyValues<this>} changedProperties
   */
  willUpdate(changedProperties) {
    if (changedProperties.has("_mode") && globalThis.document) {
      document.documentElement.dataset.theme = this._mode;
      this.dispatchEvent(
        new CustomEvent("mdn-color-theme-update", {
          bubbles: true,
          composed: true,
          detail: this._mode,
        }),
      );
    }
  }

  render() {
    return html`<div class="color-theme">
      <mdn-dropdown>
        <button
          part="color-theme__button"
          slot="button"
          class="color-theme__button"
          data-mode=${this._mode}
          type="button"
          aria-label=${this.l10n`Switch color theme`}
        >
          <span>${this.l10n`Theme`}</span>
        </button>
        <div
          slot="dropdown"
          class="color-theme__dropdown"
          id="color-theme__dropdown"
        >
          <ul class="color-theme__list">
            ${this._options.map(
              ([mode, option]) =>
                html`<li>
                  <button
                    class="color-theme__option"
                    data-mode=${mode}
                    ?data-current=${mode === this._mode}
                    type="button"
                    @click=${this._setMode}
                  >
                    ${option}
                  </button>
                </li>`,
            )}
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
    if (mode === "light dark" || mode === "light" || mode === "dark") {
      this._mode = mode;
    }
  }
}

customElements.define("mdn-color-theme", MDNColorTheme);
