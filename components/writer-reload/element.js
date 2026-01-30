import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";

import styles from "./element.css?lit";

/**
 * Custom element which reloads the page when the document has changed.
 */
export default class MDNWriterReload extends L10nMixin(LitElement) {
  static ssr = false;
  static styles = styles;

  constructor() {
    super();
    this._state = "";
    this._comparisons = 0;
  }

  get _interval() {
    return Number(sessionStorage.getItem("writer-reload-interval") || 1000);
  }

  /** @param {number} interval  */
  set _interval(interval) {
    sessionStorage.setItem("writer-reload-interval", interval.toString());
    if (!this._reloading) {
      this.requestUpdate();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._pollForChanges();
  }

  render() {
    const seconds = this._interval / 1000;
    return html`<div>
      ${this.l10n.raw({
        id: "writer-reload-polling",
        args: { seconds },
      })}
    </div>`;
  }

  async _reloadIfChanged() {
    const url = new URL(
      "index.json",
      new URL(location.pathname + "/", location.origin),
    );
    const res = await fetch(url);
    if (res.ok) {
      const state = await res.text();
      // eslint-disable-next-line unicorn/no-negated-condition
      if (!this._state) {
        this._state = state;
      } else {
        this._comparisons++;
        // eslint-disable-next-line unicorn/no-negated-condition
        if (this._state !== state) {
          if (this._comparisons <= 1) {
            this._interval = this._interval * 2;
          }
          location.reload();
          this._reloading = true;
        } else {
          this._interval = this._interval <= 2000 ? 1000 : this._interval / 2;
        }
      }
    } else {
      console.error("Failed to fetch document", res.status, res.statusText);
    }
  }

  async _pollForChanges() {
    while (!this._reloading) {
      if (document.visibilityState === "visible") {
        await this._reloadIfChanged();
      }
      await timeout(this._interval);
    }
  }
}

/**
 * @param {number} ms
 */
async function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

customElements.define("mdn-writer-reload", MDNWriterReload);
