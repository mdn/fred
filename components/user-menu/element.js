import { Task } from "@lit/task";
import { LitElement, html, nothing } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";

import { FXA_SIGNIN_URL, FXA_SIGNOUT_URL } from "../env/index.js";
import { globalUser } from "../user/context.js";

import styles from "./element.css?lit";

export class MDNUserMenu extends L10nMixin(LitElement) {
  static styles = styles;

  static properties = {
    locale: { type: String },
  };

  constructor() {
    super();
    this.locale = "en-US";
  }

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
        /**
         * @param {import("../user/types.js").User} user
         */
        (user) => {
          const links = [
            {
              href: `/${this.locale}/plus/ai-help`,
              label: this.l10n`AI Help`,
            },
            {
              href: `/${this.locale}/plus/collections`,
              label: this.l10n`Collections`,
            },
            {
              href: `/${this.locale}/plus/updates`,
              label: this.l10n`Updates`,
            },
            {
              href: `/${this.locale}/plus/settings`,
              label: this.l10n("settings"),
            },
            {
              href: "https://support.mozilla.org/products/mdn-plus",
              label: this.l10n`Help`,
              external: true,
            },
            {
              href: "https://github.com/mdn/MDN-feedback",
              label: this.l10n`Feedback`,
              external: true,
            },
          ];

          return user.isAuthenticated
            ? html`<div class="user-menu">
                <mdn-dropdown>
                  <button
                    slot="button"
                    class="user-menu__button"
                    title=${this.l10n("user_menu")}
                  >
                    <img width="34" height="34" src=${user.avatarUrl} />
                  </button>
                  <div slot="dropdown" class="user-menu__dropdown">
                    <ul>
                      <li>
                        <div class="user-menu__item">${user.email}</div>
                      </li>
                      <li class="user-menu__divider"></li>
                      ${links.map(
                        (link) =>
                          html`<li>
                            <a
                              class=${link.external
                                ? "user-menu__item external"
                                : "user-menu__item"}
                              href=${link.href}
                              >${link.label}</a
                            >
                          </li>`,
                      )}
                      <li class="user-menu__divider"></li>
                      <li>
                        <form method="post" action=${this.#logoutUrl()}>
                          <input
                            type="hidden"
                            name="next"
                            .value=${this.#next()}
                          />
                          <button type="submit">${this.l10n("logout")}</button>
                        </form>
                      </li>
                    </ul>
                  </div>
                </mdn-dropdown>
              </div>`
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

customElements.define("mdn-user-menu", MDNUserMenu);
