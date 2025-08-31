import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";
import { MDNButton } from "../button/element.js";

export class MDNCopyButton extends L10nMixin(LitElement) {
  static properties = {
    variant: {},
    _message: { state: true },
  };

  constructor() {
    super();
    this.variant = "primary";
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
        ? this.l10n`Copied ✔️`
        : this.l10n`Copy failed!`;

      setTimeout(
        () => {
          this._message = undefined;
        },
        copiedSuccessfully ? 1000 : 3000,
      );
    }
  }

  render() {
    return html`<mdn-button @click=${this._copy} variant=${this.variant}
      >${this._message ?? this.l10n`Copy`}</mdn-button
    >`;
  }
}

customElements.define("mdn-copy-button", MDNCopyButton);
