import { Task } from "@lit/task";
import { LitElement, html, nothing } from "lit";

import { ifDefined } from "lit/directives/if-defined.js";

import { L10nMixin } from "../../l10n/mixin.js";

import { FXA_SIGNIN_URL, FXA_SIGNOUT_URL } from "../env/index.js";
import logInIcon from "../icon/log-in.svg?lit";
import { globalUser } from "../user/context.js";

import styles from "./element.css?lit";

import "../button/element.js";

export class MDNUserMenu extends L10nMixin(LitElement) {
  static ssr = false;
  static styles = styles;

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

  #getLinks() {
    return [
      {
        href: `/${this.locale}/plus/ai-help`,
        label: this.l10n("user-menu-ai-help")`AI Help`,
      },
      {
        href: `/${this.locale}/plus/collections`,
        label: this.l10n("user-menu-collections")`Collections`,
      },
      {
        href: `/${this.locale}/plus/updates`,
        label: this.l10n("user-menu-updates")`Updates`,
      },
      {
        href: `/${this.locale}/plus/settings`,
        label: this.l10n("user-menu-settings")`My settings`,
      },
      {
        href: "https://support.mozilla.org/products/mdn-plus",
        label: this.l10n("user-menu-help")`Help`,
        external: true,
      },
      {
        href: "https://github.com/mdn/MDN-feedback",
        label: this.l10n("user-menu-feedback")`Feedback`,
        external: true,
      },
    ];
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
          return user.isAuthenticated
            ? html`
                <div class="user-menu">
                  <mdn-dropdown name="user-menu">
                    <button slot="button" class="user-menu__button">
                      ${user.avatarUrl
                        ? html`<img
                            src=${ifDefined(user.avatarUrl ?? undefined)}
                            width="32"
                            height="32"
                            alt=""
                          />`
                        : this.l10n("user-menu-user")`User`}
                    </button>
                    <div slot="dropdown" class="user-menu__dropdown">
                      <p>${user.email}</p>
                      <ul>
                        ${this.#getLinks().map(
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
                <mdn-button
                  class="user-menu__login"
                  href=${this.#loginUrl()}
                  .icon=${logInIcon}
                  variant="plain"
                >
                  ${this.l10n("login")}
                </mdn-button>
              `;
        },
    });
  }
}

customElements.define("mdn-user-menu", MDNUserMenu);
