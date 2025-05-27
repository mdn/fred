import { LitElement, html } from "lit";

import exitIcon from "../icon/cancel.svg?lit";

import "../button/element.js";
import styles from "./element.css?lit";

export class MDNModal extends LitElement {
  static styles = styles;

  showModal() {
    this.shadowRoot?.querySelector("dialog")?.showModal();
  }

  close() {
    this.shadowRoot?.querySelector("dialog")?.close();
  }

  render() {
    return html`
      <dialog>
        <header>
          <mdn-button
            variant="invisible"
            icon-only
            .icon=${exitIcon}
            @click=${this.close}
            >Exit modal</mdn-button
          >
        </header>
        <slot></slot>
      </dialog>
    `;
  }
}

customElements.define("mdn-modal", MDNModal);
