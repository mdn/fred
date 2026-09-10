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
      anchored: { type: Boolean, reflect: true },
      closedby: { type: String },
    };
  }

  constructor() {
    super();
    this.modalTitle = "";
    /**
     * Open as a non-modal dialog, positioned below the nearest positioned
     * ancestor instead of centered in the viewport.
     */
    this.anchored = false;
    /**
     * Forwarded to the dialog's `closedby`: "any" (default) also closes on
     * click outside, "closerequest" only on Escape or the close button.
     * @type {"any" | "closerequest" | "none"}
     */
    this.closedby = "any";
  }

  showModal() {
    const dialog = this.shadowRoot?.querySelector("dialog");
    if (this.anchored) {
      dialog?.show();
    } else {
      dialog?.showModal();
    }
  }

  /** Re-dispatches the dialog's non-composed `close` event to the host. */
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
