import { LitElement, html } from "lit";

import styles from "./element.css?lit";

export class MDNDropdown extends LitElement {
  static styles = styles;

  static properties = {
    open: { type: Boolean },
  };

  constructor() {
    super();
    this.open = false;
  }

  get _buttonSlotElements() {
    return this._slotElements("button");
  }

  get _dropdownSlotElements() {
    return this._slotElements("dropdown");
  }

  /** @param {string} name  */
  _slotElements(name) {
    const slot = this.shadowRoot?.querySelector(`slot[name="${name}"]`);
    if (slot instanceof HTMLSlotElement) {
      return slot.assignedElements();
    }
    return [];
  }

  /** @param {MouseEvent} event */
  _globalClick(event) {
    if (!event.composedPath().includes(this)) {
      this.open = false;
    }
  }

  _toggleDropDown() {
    this.open = !this.open;
  }

  _setAriaAttributes() {
    const id = this._dropdownSlotElements.find((element) => element.id)?.id;
    for (const element of this._buttonSlotElements) {
      element.setAttribute("aria-expanded", this.open.toString());
      if (id) {
        element.setAttribute("aria-controls", id);
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.dataset.loaded = "true";
    this._globalClick = this._globalClick.bind(this);
    document.addEventListener("click", this._globalClick);
  }

  render() {
    return html`
      <slot name="button" @click=${this._toggleDropDown}></slot>
      <slot name="dropdown" ?hidden=${!this.open}></slot>
    `;
  }

  updated() {
    this._setAriaAttributes();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this._globalClick);
  }
}

customElements.define("mdn-dropdown", MDNDropdown);
