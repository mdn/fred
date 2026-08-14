import { LitElement, html, nothing } from "lit";

import styles from "./element.css?lit";
import {
  FLAGS,
  STORAGE_KEY,
  applyFlags,
  parseOverrides,
  resolveFlags,
} from "./flags.js";

import "../dropdown/element.js";

export class MDNPrototypeFlags extends LitElement {
  static styles = styles;

  static get properties() {
    return {
      _overrides: { state: true },
    };
  }

  constructor() {
    super();
    /** @type {import("./types.js").Overrides} */
    this._overrides = {};
  }

  get _flags() {
    return resolveFlags(FLAGS, this._overrides);
  }

  _apply() {
    applyFlags(document.documentElement, this._flags);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._overrides));
    } catch (error) {
      console.warn("Unable to write prototype flags to localStorage", error);
    }
  }

  /** @param {Event} event */
  _toggle({ target }) {
    if (target instanceof HTMLInputElement) {
      this._overrides = {
        ...this._overrides,
        [target.value]: target.checked,
      };
      this._apply();
    }
  }

  _reset() {
    this._overrides = {};
    this._apply();
  }

  render() {
    if (FLAGS.length === 0) {
      return nothing;
    }

    return html`<div class="prototype-flags">
      <mdn-dropdown>
        <button
          part="button"
          slot="button"
          class="prototype-flags__button"
          type="button"
          aria-label="Prototype flags"
        >
          <span>Flags</span>
        </button>
        <div
          slot="dropdown"
          class="prototype-flags__dropdown"
          id="prototype-flags__dropdown"
        >
          <ul class="prototype-flags__list">
            ${this._flags.map(
              ({ id, name, enabled }) =>
                html`<li>
                  <label class="prototype-flags__flag">
                    <input
                      type="checkbox"
                      .value=${id}
                      .checked=${enabled}
                      @change=${this._toggle}
                    />
                    ${name}
                  </label>
                </li>`,
            )}
          </ul>
          <button
            class="prototype-flags__reset"
            type="button"
            @click=${this._reset}
          >
            Reset to defaults
          </button>
        </div>
      </mdn-dropdown>
    </div>`;
  }

  firstUpdated() {
    // read here rather than in connectedCallback, to avoid a hydration error:
    // https://github.com/lit/lit/issues/1434
    try {
      this._overrides = parseOverrides(localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      console.warn("Unable to read prototype flags from localStorage", error);
    }
  }
}

customElements.define("mdn-prototype-flags", MDNPrototypeFlags);
