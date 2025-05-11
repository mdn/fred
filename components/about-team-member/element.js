import { LitElement, html } from "lit";

export class MDNAboutTeamMember extends LitElement {
  _setID() {
    const hx = this.querySelector("h4, h5");
    // no simpler selector like ".tabindex" would work?
    const panel = this.closest("div[slot='panel']");
    if (hx && panel) {
      const id = `${panel.id}_${hx.id}`;
      if (this.id !== id) {
        this.id = id;
      }
    }
  }

  /** @param {FocusEvent} ev */
  _focusin({ currentTarget }) {
    if (currentTarget instanceof HTMLElement) {
      // globalThis.history.pushState({}, "", `#${currentTarget.id}`);
      this.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }

  /** @param {MouseEvent} ev */
  _mousedown(ev) {
    if (ev.target instanceof HTMLAnchorElement) {
      ev.preventDefault();
    }
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`<slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.tabIndex = 0;
    this._setID();
    this.addEventListener("mousedown", this._mousedown);
    this.addEventListener("focusin", this._focusin);
    if (globalThis.location.hash === `${this.id}`) {
      setTimeout(() => this.focus(), 0);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mousedown", this._mousedown);
    this.removeEventListener("focusin", this._focusin);
  }
}

customElements.define("mdn-about-team-member", MDNAboutTeamMember);
