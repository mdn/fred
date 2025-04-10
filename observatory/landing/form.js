import { LitElement, html, nothing } from "lit";
import { createRef, ref } from "lit/directives/ref.js";
import "../../components/progress-bar/index.js";

import styles from "./form.css?lit";

const ERROR_MAP = {
  TypeError: "Observatory is currently down.", // `fetch()` errors catch-all
};

export class FormProgress extends LitElement {
  static styles = styles;

  static properties = {
    _queryRunning: { type: Boolean, state: true },
    _hostname: { type: String, state: true },
    _errorMessage: { typoe: String, state: true },
  };

  constructor() {
    super();
    this._queryRunning = false;
    this._hostname = "";
    this._errorMessage = "";
  }
  /** @type {Lit.Ref<HTMLInputElement>}  */
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
    this._hostname = input.value.trim();
    if (!this._hostname) return; // Optionally, ignore if empty
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
      ? html` <label class="visually-hidden" for="progress-bar">
            Scanning ${this._hostname} </label
          ><mdn-progress-bar id="progress-bar"></mdn-progress-bar>`
      : html`<form @submit=${this._handleSubmit}>
            <div class="input-group">
              <label htmlFor="host" class="visually-hidden">
                Domain name or URL
              </label>
              <input
                placeholder="Scan a website for free (e.g. mdn.dev)"
                type="text"
                name="host"
                id="host"
                .value=${this._hostname}
                autofocus
                ${ref(this.inputRef)}
              />
              <button type="submit" ?disabled=${this._queryRunning}>
                Scan
              </button>
            </div>
          </form>
          ${this._errorMessage
            ? html`<div class="error">${this._errorMessage}</div>`
            : nothing}`;
  }
}

customElements.define("mdn-observatory-form", FormProgress);
