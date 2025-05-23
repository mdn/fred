import { LitElement, html } from "lit";

import "../button/element.js";
import { FXA_SIGNIN_URL } from "../env/index.js";

export class MDNLoginButton extends LitElement {
  static ssr = false;

  get _loginUrl() {
    const next = location.href.replace(location.origin, "");
    // TODO: deal with local login
    const loginUrl = new URL(FXA_SIGNIN_URL, location.origin);
    loginUrl.search = new URLSearchParams({ next }).toString();
    return loginUrl.toString();
  }

  render() {
    return html`<mdn-button href=${this._loginUrl}>Login</mdn-button>`;
  }
}

customElements.define("mdn-login-button", MDNLoginButton);
