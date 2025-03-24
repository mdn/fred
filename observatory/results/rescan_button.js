import { LitElement, css, html } from "lit";

export class RescanButton extends LitElement {
  static properties = {
    from: { type: Object }, // Date object
    duration: { type: Number },
    _remainingTime: { state: true },
  };
  static styles = css`
    .progress {
      height: 1rem;
      width: 1rem;
    }
  `;

  constructor() {
    super();
    this.from = new Date();
    this.duration = 60;
    this._remainingTime = 0;
    this._interval = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._remainingTime = this._calculateRemainingTime();
    this._interval = setInterval(() => {
      this._remainingTime = this._calculateRemainingTime();
    }, 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }

  _calculateRemainingTime() {
    const endTime = this.from.getTime() + this.duration * 1000;
    return Math.max(0, endTime - new Date().getTime());
  }

  render() {
    const isExpired = this._remainingTime <= 0;
    const remainingSecs = Math.floor(this._remainingTime / 1000) + 1;
    const progressPercent = (remainingSecs * 100) / 60;

    return html`
      ${!isExpired
        ? html` <button disabled>
            <div
              class="progress"
              role="progressbar"
              aria-labelledby="wait-secs"
              style="background: conic-gradient(var(--button-color) 0grad, ${progressPercent}%, rgba(0,0,0,0) ${progressPercent}% 100%)"
            ></div>
            <small id="wait-secs">Wait ${remainingSecs}s to rescan</small>
          </button>`
        : html`<button>Rescan</button>`}
    `;
  }
}

customElements.define("mdn-observatory-rescan-button", RescanButton);
