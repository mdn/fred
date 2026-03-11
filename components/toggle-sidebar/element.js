import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";
import panelCloseIcon from "../icon/panel-left-close.svg?lit";
import panelIcon from "../icon/panel-left.svg?lit";

import styles from "./element.css?lit";

import "../button/element.js";

const MAIN_SIDEBAR_ID = "main-sidebar";

export class MDNToggleSidebar extends L10nMixin(LitElement) {
  static styles = styles;

  static properties = {
    _canClose: { type: Boolean, state: true },
  };

  constructor() {
    super();
    this._canClose = false;
  }

  get _sidebar() {
    const sidebar = document.querySelector(`#${MAIN_SIDEBAR_ID}`);
    if (sidebar instanceof HTMLElement) {
      return sidebar;
    }
    return null;
  }

  _click() {
    const sidebar = this._sidebar;
    if (sidebar) {
      if (this._isHidden(sidebar)) {
        sidebar.style.display = "block";
        this._canClose = true;
      } else {
        sidebar.style.removeProperty("display");
        this._canClose = false;
      }
    }
  }

  /** @param {HTMLElement | null} el */
  _isHidden(el) {
    return el && getComputedStyle(el).display === "none";
  }

  /** @param {MediaQueryListEvent} _event */
  _mediaChange(_event) {
    this._sidebar?.style.removeProperty("display");
    this._canClose = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._matchMedia = matchMedia("(width < 769px)");
    this._mediaChange = this._mediaChange.bind(this);
    this._matchMedia.addEventListener("change", this._mediaChange);
  }

  render() {
    return html`<mdn-button
      @click=${this._click}
      aria-controls=${MAIN_SIDEBAR_ID}
      .icon=${this._canClose ? panelCloseIcon : panelIcon}
      icon-only
      variant="plain"
    >
      ${this.l10n`Toggle sidebar`}
    </mdn-button>`;
  }

  firstUpdated() {
    // we have to do this here and immediately cause a re-render
    // as doing so in connectedCallback causes a hydration error:
    // https://github.com/lit/lit/issues/1434
    this._canClose = !this._isHidden(this._sidebar);
  }
}

customElements.define("mdn-toggle-sidebar", MDNToggleSidebar);
