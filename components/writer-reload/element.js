import { LitElement, nothing } from "lit";

export default class MDNWriterReload extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this._pollForChanges();
  }

  render() {
    return nothing;
  }

  async _reloadIfChanged() {
    const url = new URL(
      "index.json",
      new URL(location.pathname + "/", location.origin),
    );
    const res = await fetch(url);
    if (res.ok) {
      const state = await res.text();
      if (!this._state) {
        this._state = state;
      } else if (this._state !== state) {
        location.reload();
      }
    } else {
      console.error("Failed to fetch document", res.status, res.statusText);
    }
  }

  async _pollForChanges() {
    while (true) {
      if (document.visibilityState === "visible") {
        await this._reloadIfChanged();
      }
      await wait(1000);
    }
  }
}

/**
 * @param {number} ms
 */
async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

customElements.define("mdn-writer-reload", MDNWriterReload);
