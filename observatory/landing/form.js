import { LitElement, css, html } from "lit";

export class FormProgress extends LitElement {
  static styles = css``;

  static properties = {
    _queryRunning: { state: true, type: Boolean },
    hostname: { type: String },
  };

  constructor() {
    super();
    this._queryRunning = false;
    this.hostname = "";
  }

  async _handleSubmit(event) {
    event.preventDefault();
    const input = this.shadowRoot.querySelector("#host");
    this.hostname = input.value.trim();
    if (!this.hostname) return; // Optionally, ignore if empty
    this._queryRunning = true;
    try {
      const apiUrl = `https://observatory-api.mdn.mozilla.net/api/v2/analyze?host=${encodeURIComponent(
        this.hostname
      )}`;
      const response = await fetch(apiUrl, { method: "POST" });
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      window.location.href = `observatory/analyze?host=${encodeURIComponent(
        this.hostname
      )}`;
    } catch (error) {
      console.error("API request error:", error);
    } finally {
      this._queryRunning = false;
    }
  }

  render() {
    if (this._queryRunning) {
      return html` <progress></progress>`;
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
            value="${this.hostname}"
            autofocus
          />
          <button type="submit" ${this._queryRunning ? "disabled" : ""}>
            Scan
          </button>
        </div>
      </form>`;
    }
  }
}

customElements.define("mdn-observatory-form", FormProgress);
