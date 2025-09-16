import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";
import { MDNButton } from "../button/element.js";
import check from "../icon/check.svg?lit";

export class MDNCopyButton extends L10nMixin(LitElement) {
  static properties = {
    variant: {},
    _message: { state: true },
    _copiedSuccessfully: { state: true },
  };

  constructor() {
    super();
    this.variant = "primary";
    this._copiedSuccessfully = false;
    /** @type {Element | undefined} */
    this.copiesFrom = undefined;
  }

  /**
   * @param {MouseEvent} event
   */
  async _copy({ target }) {
    if (target instanceof MDNButton) {
      try {
        const text = this.copiesFrom?.textContent?.trim();
        if (text) {
          await navigator.clipboard.writeText(text);
          this._copiedSuccessfully = true;
        }
      } catch (error) {
        console.error(
          "Error when trying to use navigator.clipboard.writeText()",
          error,
        );
        this._copiedSuccessfully = false;
      }

      this._message = this._copiedSuccessfully
        ? this.l10n`Copied`
        : this.l10n`Copy failed!`;

      setTimeout(
        () => {
          this._message = undefined;
          this._copiedSuccessfully = false;
        },
        this._copiedSuccessfully ? 1000 : 3000,
      );
    }
  }

  render() {
    return html`<mdn-button
      @click=${this._copy}
      .icon=${this._copiedSuccessfully ? check : undefined}
      variant=${this.variant}
      >${this._message ?? this.l10n`Copy`}</mdn-button
    >`;
  }
}

customElements.define("mdn-copy-button", MDNCopyButton);
