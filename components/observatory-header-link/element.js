import { LitElement, css, html } from "lit";

import {
  formatDateTime,
  humanizedDurationFromNow,
} from "../observatory/utils.js";

export class MDNObservatoryHeaderLink extends LitElement {
  static properties = {
    header: { type: String },
    _link: { type: String },
  };

  static styles = css``;

  constructor() {
    super();
    this.date = new Date();
    this._text = "";
    this._interval = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._text = humanizedDurationFromNow(this.date);
    this._interval = setInterval(() => {
      this._text = humanizedDurationFromNow(this.date);
    }, 10_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }

  _displayString() {
    return humanizedDurationFromNow(this.date);
  }

  render() {
    return html`
      <time
        datetime=${this.date.toDateString()}
        title=${formatDateTime(this.date)}
      >
        ${this._text}
      </time>
    `;
  }
}

customElements.define("mdn-observatory-header-link", MDNObservatoryHeaderLink);
