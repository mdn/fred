import { LitElement } from "lit";

export class MDNAboutTeamMember extends LitElement {
  // Force client-side rendering for disabled shadow DOM
  static ssr = false;

  // Disable shadow DOM
  createRenderRoot() {
    return this;
  }

  _setID() {
    const hx = this.querySelector("h4, h5");
    const panel = hx?.closest(".tabpanel");
    if (hx && panel) {
      const id = `${panel.id}_${hx.id}`;
      if (this.id !== id) {
        this.id = id;
      }
    }
  }

  /** @param {FocusEvent} ev */
  _focus({ currentTarget }) {
    if (currentTarget instanceof HTMLElement) {
      globalThis.history.pushState({}, "", `#${currentTarget.id}`);
      this.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }

  /** @param {MouseEvent} ev */
  _mousedown(ev) {
    if (ev.target instanceof HTMLAnchorElement) {
      ev.preventDefault();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.tabIndex = 0;
    setTimeout(() => {
      this._setID();
      if (globalThis.location.hash.slice(1) === this.id) {
        this.focus({ preventScroll: true });
      }
    }, 0);
    this.addEventListener("mousedown", this._mousedown);
    this.addEventListener("focus", this._focus);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mousedown", this._mousedown);
    this.removeEventListener("focus", this._focus);
  }
}

customElements.define("mdn-about-team-member", MDNAboutTeamMember);
