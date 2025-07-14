import { Task } from "@lit/task";
import { LitElement, html, nothing } from "lit";

import { ifDefined } from "lit/directives/if-defined.js";

import { L10nMixin } from "../../l10n/mixin.js";

import { FXA_SIGNIN_URL, FXA_SIGNOUT_URL } from "../env/index.js";
import { globalUser } from "../user/context.js";

import styles from "./element.css?lit";
import { getLinks } from "./links.js";

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
          const links = getLinks(this.locale, this.l10n);

          return user.isAuthenticated
            ? html`
                <div class="user-menu">
                  <mdn-dropdown>
                    <button slot="button" class="user-menu__button">
                      ${user.avatarUrl
                        ? html`<img
                            src=${ifDefined(user.avatarUrl ?? undefined)}
                            width="32"
                            height="32"
                            alt=""
                          />`
                        : this.l10n`User`}
                    </button>
                    <div slot="dropdown" class="user-menu__dropdown">
                      <p>${user.email}</p>
                      <ul>
                        ${links.map(
                          (link) =>
                            html`<li>
                              <a
                                class=${ifDefined(
                                  link.external ? "external" : undefined,
                                )}
                                href=${link.href}
                                >${link.label}</a
                              >
                            </li>`,
                        )}
                      </ul>
                      <form method="post" action=${this.#logoutUrl()}>
                        <input
                          type="hidden"
                          name="next"
                          .value=${this.#next()}
                        />
                        <button
                          class="button"
                          data-variant="secondary"
                          type="submit"
                        >
                          ${this.l10n("logout")}
                        </button>
                      </form>
                    </div>
                  </mdn-dropdown>
                </div>
              `
            : html`
                <a class="user-menu__login" href=${this.#loginUrl()}>
                  ${this.l10n("login")}
                </a>
              `;
        },
    });
  }
}

customElements.define("mdn-user-menu", MDNUserMenu);
