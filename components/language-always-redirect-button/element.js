import { LitElement, html } from "lit";

import { gleanClick } from "../../utils/glean.js";
import { setPreferredLocale } from "../preferred-locale/utils.js";

export class MDNLanguageAlwaysRedirectButton extends LitElement {
  static properties = {
    locale: { type: String },
    to: { type: String },
  };

  constructor() {
    super();
    this.locale = "";
    this.to = "";
  }

  _handleClick() {
    gleanClick(`language: ${this.locale} -> ${this.to} (always)`);
    setPreferredLocale(this.to);
    const url = document.location.pathname.replace(
      `/${this.locale}/`,
      `/${this.to}/`,
    );
    document.location.replace(url);
  }

  render() {
    return html`<mdn-button variant="plain" @click=${this._handleClick}
      ><slot></slot
    ></mdn-button>`;
  }
}

customElements.define(
  "mdn-language-always-redirect-button",
  MDNLanguageAlwaysRedirectButton,
);
