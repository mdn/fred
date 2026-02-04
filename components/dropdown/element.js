import { LitElement, html } from "lit";

import { randomIdString } from "../utils/index.js";

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
    open: { type: Boolean, reflect: true },
    loaded: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.open = false;
    this.loaded = false;
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

  /** @param {KeyboardEvent} event */
  _globalKeyDown(event) {
    if (this.open && event.key === "Escape") {
      this._toggleDropDown();
    }
  }

  _toggleDropDown() {
    this.open = !this.open;
  }

  _setAriaAttributes() {
    let id = this._dropdownSlotElements.find((element) => element.id)?.id;
    if (!id) {
      id = randomIdString("uid_");
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
    this._globalClick = this._globalClick.bind(this);
    document.addEventListener("click", this._globalClick);
    this._globalKeyDown = this._globalKeyDown.bind(this);
    document.addEventListener("keydown", this._globalKeyDown);
  }

  render() {
    return html`
      <slot name="button" @click=${this._toggleDropDown}></slot>
      <slot name="dropdown" ?hidden=${!this.open && this.loaded}></slot>
    `;
  }

  updated() {
    this._setAriaAttributes();
  }

  firstUpdated() {
    this.loaded = true;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this._globalClick);
    document.removeEventListener("keydown", this._globalKeyDown);
  }
}

customElements.define("mdn-dropdown", MDNDropdown);
