import { LitElement, css, html } from "lit";

export class RescanButton extends LitElement {
  static properties = {
    from: { type: Object }, // Date object
    duration: { type: Number },
    _remainingTime: { state: true },
  };
  static styles = css`
    button {
      align-items: center;
      background-color: var(--button-primary-default);
      border: 1px solid var(--button-border-color);
      border-radius: 0.25rem;
      color: var(--color-background-primary);
      display: flex;
      font: var(--type-emphasis-m);
      gap: 0.25rem;
      height: 2rem;
      justify-content: center;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      position: relative;
      width: 9rem;
    }

    button:not(:disabled):hover {
      background: var(--button-primary-hover);
    }

    button[disabled] {
      opacity: 0.65;
      cursor: default;
    }

    .progress {
      border-radius: 50%;
      display: block;
      height: 0.8rem;
      width: 0.8rem;
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
    return Math.max(0, endTime - Date.now());
  }

  render() {
    const isExpired = this._remainingTime <= 0;
    const remainingSecs = Math.floor(this._remainingTime / 1000) + 1;
    const progressPercent = (remainingSecs * 100) / 60;

    return html`
      ${isExpired
        ? html`<button>Rescan</button>`
        : html` <button disabled>
            <div
              class="progress"
              role="progressbar"
              aria-labelledby="wait-secs"
              style="background: conic-gradient(var(--color-background-primary) 0grad, ${progressPercent}%, rgba(0,0,0,0) ${progressPercent}% 100%)"
            ></div>
            <small id="wait-secs">Wait ${remainingSecs}s to rescan</small>
          </button>`}
    `;
  }
}

customElements.define("mdn-observatory-rescan-button", RescanButton);
