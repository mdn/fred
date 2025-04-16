import { LitElement, html } from "lit";

import { MDNButton } from "../button/element.js";

export class MDNCopyButton extends LitElement {
  static properties = {
    _message: { state: true },
  };

  constructor() {
    super();
    /** @type {Element | undefined} */
    this.copiesFrom = undefined;
  }

  /**
   * @param {MouseEvent} event
   */
  async _copy({ target }) {
    if (target instanceof MDNButton) {
      let copiedSuccessfully = true;
      try {
        const text = this.copiesFrom?.textContent?.trim();
        if (text) {
          await navigator.clipboard.writeText(text);
        }
      } catch (error) {
        console.error(
          "Error when trying to use navigator.clipboard.writeText()",
          error,
        );
        copiedSuccessfully = false;
      }

      this._message = copiedSuccessfully
        ? "Copied!"
        : "Error trying to copy to clipboard!";

      setTimeout(
        () => {
          this._message = undefined;
        },
        copiedSuccessfully ? 1000 : 3000,
      );
    }
  }

  render() {
    return html`<mdn-button @click=${this._copy}>Copy</mdn-button> ${this
        ._message}`;
  }
}

customElements.define("mdn-copy-button", MDNCopyButton);
