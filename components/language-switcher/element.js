import { Task } from "@lit/task";
import { LitElement, html, nothing } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";

import infoIcon from "../icon/info.svg?lit";
import { getEnglishDoc } from "../not-found/utils.js";
import {
  getPreferredLocale,
  resetPreferredLocale,
  setPreferredLocale,
} from "../preferred-locale/utils.js";

import styles from "./element.css?lit";

import "../dropdown/element.js";
import "../switch/element.js";

export class MDNLanguageSwitcher extends L10nMixin(LitElement) {
  static styles = styles;

  static properties = {
    locale: { type: String },
    native: { type: String },
    translations: { type: Array },
    url: { type: String },
    notFound: { type: Boolean, attribute: "not-found" },
    _preferredLocale: { state: true },
  };

  constructor() {
    super();
    /** @type {import("@rari").Translation[]} */
    this.translations = [];
    this.native = "";
    this.locale = "en-US";
    this.url = "/";
    this.notFound = false;
    /** @type {string|undefined} */
    this._preferredLocale = undefined;
  }

  _notFoundFallback = new Task(this, {
    args: () => [this.notFound],
    task: async ([notFound]) => {
      if (notFound) {
        return await getEnglishDoc(location.pathname);
      }
      return;
    },
  });

  firstUpdated() {
    this._preferredLocale = getPreferredLocale();
    if (location.search) {
      this.url += location.search;
    }
  }

  get _isLocalePreferred() {
    return this._preferredLocale == this.locale;
  }

  _togglePreferredLocale() {
    if (this.notFound) return;
    if (this._isLocalePreferred) {
      resetPreferredLocale();
      this._preferredLocale = undefined;
    } else {
      setPreferredLocale(this.locale);
      this._preferredLocale = this.locale;
    }
  }

  render() {
    const { translations, native, locale, url, notFound } = this;

    if (translations.length === 0) {
      return nothing;
    }

    return html`<div class="language-switcher">
      <mdn-dropdown>
        <button
          part="button"
          slot="button"
          class="language-switcher__button"
          type="button"
          aria-labelledby="current-locale"
        >
          <span id="current-locale">${native ?? locale}</span>
        </button>
        <div
          slot="dropdown"
          class="language-switcher__dropdown"
          id="language-switcher__dropdown"
        >
          <div class="language_switcher__remember">
            <mdn-switch
              @toggle=${this._togglePreferredLocale}
              ?checked=${this._isLocalePreferred}
              >${this.l10n`Remember language`}</mdn-switch
            >
            <mdn-button
              variant="plain"
              .icon=${infoIcon}
              icon-only
              href="https://github.com/orgs/mdn/discussions/739"
              target="_blank"
              title=${this
                .l10n`Enable this setting to always switch to the current language when available. (Click to learn more.)`}
              >${this.l10n`Learn more`}</mdn-button
            >
          </div>
          <ul class="language-switcher__list">
            ${notFound
              ? this._notFoundFallback.render({
                  initial: () => this._renderCurrentLocale(),
                  pending: () => this._renderCurrentLocale(),
                  error: () => this._renderCurrentLocale(),
                  complete: (doc) =>
                    doc?.other_translations
                      ? this._renderDropdownItems(
                          doc.other_translations,
                          locale,
                          doc.mdn_url,
                          notFound,
                        )
                      : this._renderCurrentLocale(),
                })
              : this._renderDropdownItems(translations, locale, url)}
          </ul>
        </div>
      </mdn-dropdown>
    </div>`;
  }

  /**
   * @param {import("@rari").Translation[]} translations
   * @param {string} locale
   * @param {string} url
   * @param {boolean} notFound
   */
  _renderDropdownItems(translations, locale, url, notFound = false) {
    return translations
      .sort((a, b) => a.locale.localeCompare(b.locale))
      .map(
        (translation) => html`
          <li>
            <a
              class="language-switcher__option"
              ?data-current=${locale === translation.locale}
              @click=${resetPreferredLocale}
              href=${url.replace(
                `/${notFound ? "en-US" : locale}/`,
                `/${translation.locale}/`,
              )}
              >${translation.native}</a
            >
          </li>
        `,
      );
  }

  _renderCurrentLocale() {
    return html`
      <li>
        <a
          class="language-switcher__option"
          ?data-current=${true}
          href=${this.url}
          >${this.native}</a
        >
      </li>
    `;
  }
}

customElements.define("mdn-language-switcher", MDNLanguageSwitcher);
