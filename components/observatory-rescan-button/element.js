import { LitElement, html } from "lit";

import "../button/element.js";
import { L10nMixin } from "../../l10n/mixin.js";

import styles from "./element.css?lit";

export class MDNObservatoryRescanButton extends L10nMixin(LitElement) {
  static styles = styles;
  static properties = {
    from: { type: Object }, // Date object
    duration: { type: Number },
    _remainingTime: { state: true },
  };

  constructor() {
    super();
    /** @type {Date} */
    this.from = new Date();
    /** @type {number} */
    this.duration = 60;
    /** @type {number} */
    this._remainingTime = 0;
    /** @type {NodeJS.Timeout | null} */
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

  /**
   *
   * @param {number} progressPercent
   */
  _icon(progressPercent) {
    return html`<span
      class="progress"
      style="  display: inline-block; width: 0.9rem; height: 0.9rem; border-radius: 50%; background: conic-gradient(light-dark(var(--color-gray-40), var(--color-gray-60)) 0grad, ${progressPercent}%, rgba(0,0,0,0) ${progressPercent}% 100%)"
    ></span>`;
  }

  render() {
    const isExpired = this._remainingTime <= 0;
    const remainingSecs = Math.floor(this._remainingTime / 1000) + 1;
    const progressPercent = (remainingSecs * 100) / 60;

    return isExpired
      ? html`<mdn-button>${this.l10n("observatory-rescan-button-rescan")`Rescan`}</mdn-button>`
      : html` <mdn-button disabled .icon=${this._icon(progressPercent)}
          >${this.l10n("observatory-rescan-button-wait-a-minute-to-rescan")`Wait a minute to rescan`}</mdn-button
        >`;
  }
}

customElements.define(
  "mdn-observatory-rescan-button",
  MDNObservatoryRescanButton,
);
