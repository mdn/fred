import { Task } from "@lit/task";
import { LitElement, html, nothing } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";

import { FXA_SIGNIN_URL, FXA_SIGNOUT_URL } from "../env/index.js";
import { globalUser } from "../user/context.js";

import styles from "./element.css?lit";

export class MNDUserMenu extends L10nMixin(LitElement) {
  static styles = styles;

  static properties = {
    locale: { type: String },
  };

  #loginUrl() {
    const base = globalThis.location.origin;
    const url = new URL(FXA_SIGNIN_URL, base);
    url.searchParams.append("next", this.#next());
    return url.toString();
  }

  #next() {
    const next = globalThis.location.href.replace(
      globalThis.location.origin,
      "",
    );
    return next;
  }

  #logoutUrl() {
    const base = globalThis.location.origin;
    const url = new URL(FXA_SIGNOUT_URL, base);
    return url.toString();
  }

  #settingsUrl() {
    return `/${this.locale || "en-US"}/plus/settings`;
  }

  _user = new Task(this, {
    task: async () => {
      return await globalUser();
    },
  });

  connectedCallback() {
    super.connectedCallback();
    this._user.run();
  }

  render() {
    return this._user.render({
      initial: () => nothing,
      pending: () => nothing,

      complete:
        /*
         * @param {User.User} user
         */
        (user) => {
          return user.isAuthenticated
            ? html`<mdn-dropdown>
              <button
                slot="button"
                class="user-menu-button"
                title=${this.l10n("user_menu")}
                  ><img width="34" height="34" src=${user.avatarUrl}
                /></button>
                <div slot="dropdown" class="user-menu" id="user-menu">
                  <ul>
                    <li class="settings">
                      <a href=${this.#settingsUrl()}>${this.l10n("settings")}</a>
                    </li>
                    <li class="logout">
                      <form
                        class="logout-form"
                        method="post"
                        action=${this.#logoutUrl()}
                      >
                        <input
                          type="hidden"
                          name="next"
                          .value=${this.#next()}
                        /><button
                          type="submit"
                          class="lognout-button"
                        >
                          <mdn-button class="button-wrap"
                            >${this.l10n("logout")}</span
                          >
                            </mdn-button>
                      </form>
                    </li>
                  </ul>
                </div>
              </mdn-dropdown>`
            : html`<div class="login-container">
                <a
                  class="login"
                  title=${this.l10n("login")}
                  href=${this.#loginUrl()}
                  >👤</a
                >
              </div>`;
        },
    });
  }
}

customElements.define("mdn-user-menu", MNDUserMenu);
