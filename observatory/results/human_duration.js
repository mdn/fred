import { LitElement, css, html } from "lit";
import { formatDateTime, humanizedDurationFromNow } from "../utils";

export class HumanDuration extends LitElement {
  static properties = {
    date: { type: Date },
    _text: { state: true },
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
    }, 10000);
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
      <time datetime=${this.date} title=${formatDateTime(this.date)}>
        ${this._text}
      </time>
    `;
  }
}

customElements.define("mdn-observatory-human-duration", HumanDuration);
