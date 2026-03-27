import { LitElement, html } from "lit";

import "../button/element.js";
import { L10nMixin } from "../../l10n/mixin.js";
import { FXA_SIGNIN_URL } from "../env/index.js";

export class MDNLoginButton extends L10nMixin(LitElement) {
  static ssr = false;

  static properties = {
    gleanId: { attribute: "data-glean-id" },
  };

  constructor() {
    super();
    /** @type {string | undefined} */
    this.gleanId = undefined;
  }

  get _loginUrl() {
    const next = location.href.replace(location.origin, "");
    // TODO: deal with local login
    const loginUrl = new URL(FXA_SIGNIN_URL, location.origin);
    loginUrl.search = new URLSearchParams({ next }).toString();
    return loginUrl.toString();
  }

  render() {
    return html`<mdn-button
      href=${this._loginUrl}
      data-glean-id=${this.gleanId ?? "login_button"}
      >${this.l10n("login-button-login")`Login`}</mdn-button
    >`;
  }
}

customElements.define("mdn-login-button", MDNLoginButton);
