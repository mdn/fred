import { LitElement, html } from "lit";

import styles from "./element.css?lit";

/**
 * This element has two slots, which should take a single element each.
 * The element in the `dropdown` slot is hidden by default,
 * and shown when the element in the `button` slot is clicked.
 * The element in the `dropdown` slot is also hidden when the user clicks
 * outside the `mdn-dropdown` element. Automatically sets `aria-` attributes.
 *
 * @element mdn-dropdown
 *
 * @attr {boolean} open - Whether the dropdown is open or not.
 *
 * @slot button - The element used to toggle the dropdown.
 * @slot dropdown - The element to be shown/hidden in the dropdown.
 */
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
    let id = this._dropdownSlotElements.find((element) => element.id)?.id;
    if (!id) {
      id = Math.random().toString(36).replace("0.", "uid_");
      this._dropdownSlotElements[0]?.setAttribute("id", id);
    }
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
