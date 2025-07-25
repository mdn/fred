import { LitElement, html } from "lit";

import {
  formatDateTime,
  humanizedDurationFromNow,
} from "../observatory/utils.js";

import styles from "./element.css?lit";

export class MDNObservatoryHumanDuration extends LitElement {
  static styles = styles;
  static properties = {
    date: { type: Date },
    _text: { state: true },
  };

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

customElements.define(
  "mdn-observatory-human-duration",
  MDNObservatoryHumanDuration,
);
