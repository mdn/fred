import { LitElement, css, html } from "lit";
import { createRef, ref } from "lit/directives/ref.js";

/**
 * @import { Ref } from "lit/directives/ref.js"
 */

export class FormProgress extends LitElement {
  static styles = css``;

  static properties = {
    _queryRunning: { state: true, type: Boolean },
    _hostname: { type: String, state: true },
  };

  constructor() {
    super();
    this._queryRunning = false;
    this._hostname = "";
  }
  /** @type {Ref<HTMLInputElement>}  */
  inputRef = createRef();

  /**
   * @param {Event} event
   */
  async _handleSubmit(event) {
    event.preventDefault();
    const input = this.inputRef.value;
    if (!input) return;
    this._hostname = input.value.trim();
    if (!this._hostname) return; // Optionally, ignore if empty
    this._queryRunning = true;
    try {
      const apiUrl = `https://observatory-api.mdn.mozilla.net/api/v2/analyze?host=${encodeURIComponent(
        this._hostname,
      )}`;
      const response = await fetch(apiUrl, { method: "POST" });
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      globalThis.location.href = `observatory/analyze?host=${encodeURIComponent(
        this._hostname,
      )}`;
    } catch (error) {
      console.error("API request error:", error);
    } finally {
      this._queryRunning = false;
    }
  }

  render() {
    return this._queryRunning
      ? html` <progress></progress>`
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
            <button type="submit" ?disabled=${this._queryRunning}>Scan</button>
          </div>
        </form>`;
  }
}

customElements.define("mdn-observatory-form", FormProgress);
