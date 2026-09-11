import { LitElement, html, nothing } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";
import exitIcon from "../icon/cancel.svg?lit";

import "../button/element.js";
import styles from "./element.css?lit";

export class MDNModal extends L10nMixin(LitElement) {
  static styles = styles;

  static get properties() {
    return {
      modalTitle: { type: String, attribute: "modal-title" },
      closedby: { type: String },
    };
  }

  constructor() {
    super();
    this.modalTitle = "";
    /**
     * @type {"any" | "closerequest" | "none"}
     */
    this.closedby = "any";
  }

  showModal() {
    this.shadowRoot?.querySelector("dialog")?.showModal();
  }

  /** Forward `close` across the shadow boundary. */
  _onClose() {
    this.dispatchEvent(new Event("close"));
  }

  close() {
    this.shadowRoot?.querySelector("dialog")?.close();
  }

  render() {
    return html`
      <dialog closedby=${this.closedby} @close=${this._onClose}>
        <header>
          ${this.modalTitle ? html`<h2>${this.modalTitle}</h2>` : nothing}
          <mdn-button
            variant="plain"
            icon-only
            .icon=${exitIcon}
            @click=${this.close}
            >${this.l10n("modal-exit-modal")`Exit modal`}</mdn-button
          >
        </header>
        <slot></slot>
      </dialog>
    `;
  }
}

customElements.define("mdn-modal", MDNModal);
