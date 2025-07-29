import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";

import "../button/element.js";

export class MDNWriterOpenEditor extends L10nMixin(LitElement) {
  static properties = {
    filepath: { type: String },
  };

  constructor() {
    super();
    this.filepath = "";
  }

  async _open() {
    const params = new URLSearchParams({
      filepath: this.filepath,
    });
    await fetch(`/_open?${params}`);
  }

  render() {
    return html`<mdn-button @click=${this._open} variant="plain">
      ${this.l10n`Open in editor`}
    </mdn-button>`;
  }
}

customElements.define("mdn-writer-open-editor", MDNWriterOpenEditor);
