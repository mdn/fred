import { LitElement, css, html, nothing } from "lit";
import { createRef, ref } from "lit/directives/ref.js";
import "../../components/progress-bar/index.js";

/**
 * @import { Ref } from "lit/directives/ref.js"
 */

const ERROR_MAP = {
  TypeError: "Observatory is currently down.", // `fetch()` errors catch-all
};

export class FormProgress extends LitElement {
  static styles = css`
    :host {
      font: 400 var(--base-font-size) var(--font-body);
      --border-radius: 0.3rem;
      --progress-color: var(--observatory-accent);
    }

    .visually-hidden {
      border: 0 !important;
      clip: rect(1px, 1px, 1px, 1px) !important;
      -webkit-clip-path: inset(50%) !important;
      clip-path: inset(50%) !important;
      height: 1px !important;
      margin: -1px !important;
      overflow: hidden !important;
      padding: 0 !important;
      position: absolute !important;
      white-space: nowrap !important;
      width: 1px !important;
    }

    .input-group {
      display: flex;
      height: 3rem;

      :focus-visible {
        outline: 1px solid var(--observatory-accent);
        outline-offset: -1px;
        outline-width: 1px;
      }

      ::placeholder {
        color: var(--observatory-color-secondary);
        opacity: 0.8;
      }

      input {
        background-color: var(--observatory-bg);
        border: 1px solid var(--observatory-border);
        border-bottom-left-radius: var(--border-radius);
        border-top-left-radius: var(--border-radius);
        flex-grow: 1;
        padding: 0 0.75rem;
        width: 100%;
        font: inherit;

        &::placeholder {
          overflow-x: hidden;
          text-overflow: ellipsis;
        }
      }

      button {
        background: var(--button-primary-default);
        border-bottom-right-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
        color: var(--background-primary);
        cursor: pointer;
        font: var(--type-emphasis-m);
        font-size: 1rem;
        padding: 0 2rem;
        appearance: none;
        border: none;

        &:hover {
          background: var(--button-primary-hover);
        }

        &:active {
          background: var(--button-primary-active);
        }
      }
    }
    .error {
      color: var(--form-invalid-color);
      margin-top: 0.5rem;
      &::before {
        background-color: var(--form-invalid-color);
        content: "";
        display: inline-block;
        height: 1.15rem;
        margin-bottom: 0.25rem;
        margin-right: 0.5rem;
        mask-image: var(--alert-circle-img);
        mask-position: center;
        mask-repeat: no-repeat;
        vertical-align: middle;
        width: 1.5em;
      }
    }
  `;

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
  /** @type {Ref<HTMLInputElement>}  */
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
    if (!input.value.trim()) {
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
      window.location.href = `/en-US/observatory/analyze?host=${encodeURIComponent(
        this._hostname,
      )}`;
    } catch (error) {
      this._errorMessage = `${ERROR_MAP[error.name] || error.message}`;
    } finally {
      this._queryRunning = false;
    }
  }

  render() {
    if (this._queryRunning) {
      return html` <label class="visually-hidden" for="progress-bar">
          Scanning ${this._hostname} </label
        ><mdn-progress-bar id="progress-bar"></mdn-progress-bar>`;
    } else {
      return html`<form @submit=${this._handleSubmit}>
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
            <button type="submit" ?disabled=${this._queryRunning}>Scan</button>
          </div>
        </form>
        ${this._errorMessage
          ? html`<div class="error">Error: ${this._errorMessage}</div>`
          : nothing}`;
    }
  }
}

customElements.define("mdn-observatory-form", FormProgress);
