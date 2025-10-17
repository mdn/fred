import { LitElement, html, nothing } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";
import exitIcon from "../icon/cancel.svg?lit";

import "../button/element.js";
import styles from "./element.css?lit";

export class MDNModal extends L10nMixin(LitElement) {
  static styles = styles;

  static properties = {
    modalTitle: { type: String, attribute: "modal-title" },
  };

  constructor() {
    super();
    this.modalTitle = "";
  }

  showModal() {
    this.shadowRoot?.querySelector("dialog")?.showModal();
  }

  close() {
    this.shadowRoot?.querySelector("dialog")?.close();
  }

  render() {
    return html`
      <dialog closedby="any">
        <header>
          ${this.modalTitle ? html`<h2>${this.modalTitle}</h2>` : nothing}
          <mdn-button
            variant="plain"
            icon-only
            .icon=${exitIcon}
            @click=${this.close}
            >${this.l10n`Exit modal`}</mdn-button
          >
        </header>
        <slot></slot>
      </dialog>
    `;
  }
}

customElements.define("mdn-modal", MDNModal);
