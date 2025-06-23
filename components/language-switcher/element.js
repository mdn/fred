import { LitElement, html, nothing } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";

import infoIcon from "../icon/info.svg?lit";
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
    _preferredLocale: { state: true },
  };

  constructor() {
    super();
    /** @type {import("@rari").Translation[]} */
    this.translations = [];
    this.native = "";
    this.locale = "en-US";
    this.url = "/";
    /** @type {string|undefined} */
    this._preferredLocale = undefined;
  }

  firstUpdated() {
    this._preferredLocale = getPreferredLocale();
  }

  get _isLocalePreferred() {
    return this._preferredLocale == this.locale;
  }

  _togglePreferredLocale() {
    if (this._isLocalePreferred) {
      resetPreferredLocale();
      this._preferredLocale = undefined;
    } else {
      setPreferredLocale(this.locale);
      this._preferredLocale = this.locale;
    }
  }

  render() {
    const { translations, native, locale, url } = this;

    if (translations.length === 0) {
      return nothing;
    }

    return html`<div class="language-switcher">
      <mdn-dropdown>
        <button slot="button" class="language-switcher__button" type="button">
          <span>${native ?? locale}</span>
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
            ${translations
              .filter((x) => x.locale !== locale)
              .sort((a, b) => a.locale.localeCompare(b.locale))
              .map(
                (translation) => html`
                  <li>
                    <a
                      class="language-switcher__option"
                      @click=${resetPreferredLocale}
                      href=${url.replace(
                        `/${locale}/`,
                        `/${translation.locale}/`,
                      )}
                      >${translation.native}</a
                    >
                  </li>
                `,
              )}
          </ul>
        </div>
      </mdn-dropdown>
    </div>`;
  }
}

customElements.define("mdn-language-switcher", MDNLanguageSwitcher);
