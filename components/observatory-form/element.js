import { LitElement, html, nothing } from "lit";
import { createRef, ref } from "lit/directives/ref.js";
import "../progress-bar/element.js";
import "../button/element.js";

import styles from "./element.css?lit";

const ERROR_MAP = {
  TypeError: "Observatory is currently down.", // `fetch()` errors catch-all
};

export class MDNObservatoryForm extends LitElement {
  static styles = styles;

  static properties = {
    _queryRunning: { type: Boolean, state: true },
    _hostname: { type: String, state: true },
    _errorMessage: { type: String, state: true },
  };

  constructor() {
    super();
    this._queryRunning = false;
    this._hostname = "";
    this._errorMessage = "";
  }
  /** @type {import("@lit").Ref<HTMLInputElement>}  */
  inputRef = createRef();

  firstUpdated() {
    this.inputRef.value?.focus();
  }

  /**
   * @param {Event} event
   */
  async _handleSubmit(event) {
    event.preventDefault();
    this._errorMessage = "";
    const input = this.inputRef.value;
    if (!input?.value.trim()) {
      this._errorMessage = "Please enter a valid hostname";
      return;
    }

    const host = input.value.trim();
    try {
      // tolerate url-style host values and pick out the hostname part
      const url = new URL(host);
      this._hostname = url.hostname.trim() || host;
    } catch {
      this._hostname = host;
    }
    this._queryRunning = true;
    try {
      const apiUrl = `https://observatory-api.mdn.mozilla.net/api/v2/analyze?host=${encodeURIComponent(
        this._hostname,
      )}`;
      const response = await fetch(apiUrl, { method: "POST" });
      if (!response.ok) {
        const json = await response.json();
        throw new Error(`Request failed: ${json.message}`);
      }
      globalThis.location.href = `/en-US/observatory/analyze?host=${encodeURIComponent(
        this._hostname,
      )}`;
    } catch (error) {
      // @ts-expect-error
      this._errorMessage = `${ERROR_MAP[error.name] || "message" in error ? error["message"] : error}`;
    } finally {
      this._queryRunning = false;
    }
  }

  render() {
    return this._queryRunning
      ? html`
          <label class="visually-hidden" for="progress-bar">
            Scanning ${this._hostname} </label
          ><mdn-progress-bar id="progress-bar"></mdn-progress-bar>
        `
      : html`
          <form @submit=${this._handleSubmit} class="observatory-form">
            <div class="observatory-form__input-group">
              <label htmlFor="host" class="visually-hidden">
                Domain name or URL
              </label>
              <input
                class="input observatory-form__input"
                placeholder="Scan a website for free (e.g. mdn.dev)"
                type="text"
                name="host"
                id="host"
                .value=${this._hostname}
                autofocus
                ${ref(this.inputRef)}
              />
              <button
                class="button observatory-form__submit"
                type="submit"
                ?disabled=${this._queryRunning}
                data-variant="primary"
              >
                Scan
              </button>
            </div>
          </form>
          ${this._errorMessage
            ? html`<div class="error">${this._errorMessage}</div>`
            : nothing}
        `;
  }
}

customElements.define("mdn-observatory-form", MDNObservatoryForm);
