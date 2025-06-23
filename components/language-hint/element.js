import { LitElement, html, nothing } from "lit";
import { join } from "lit/directives/join.js";

import pinOffIcon from "../icon/pin-off.svg?lit";
import pinIcon from "../icon/pin.svg?lit";
import { PreferredLocaleController } from "../preferred-locale/controller.js";

import styles from "./element.css?lit";

export class MDNLanguageHint extends LitElement {
  static ssr = false;
  static styles = styles;

  static properties = {
    locale: { type: String },
    locales: { type: Array },
    _acceptedLanguages: { state: true },
    _url: { state: true },
  };

  constructor() {
    super();
    /** @type {PreferredLocaleController} */
    this.preferredLocale = new PreferredLocaleController(this);
    /** @type {string} */
    this.locale = "";
    /** @type {string[]} */
    this.locales = [];
    /** @type {string[]} */
    this._acceptedLanguages = [...navigator.languages];
    this._url = location.pathname;
  }

  /** @param {string} locale */
  _updatePreferredLocale(locale) {
    this._preferredLocale = locale;
  }

  render() {
    const currentLocale = this.locale;
    const preferredLocale = this.preferredLocale.value;

    if (currentLocale === preferredLocale) {
      return nothing;
    }

    const acceptedLanguages = this._acceptedLanguages;
    const allLocales = this.locales;

    const acceptedLocales = new Set();
    for (const language of acceptedLanguages) {
      if (language.includes("-")) {
        // e.g. en-US, de-DE
        if (allLocales.includes(language)) {
          // e.g. en-US
          acceptedLocales.add(language);
        } else {
          // e.g. de-DE
          const locale = language.split("-").at(0);
          if (locale && allLocales.includes(locale)) {
            acceptedLocales.add(locale);
          }
        }
      } else {
        // e.g. en, fr, zh
        const matches = allLocales.filter((locale) =>
          locale.startsWith(language),
        );
        for (const match of matches) {
          acceptedLocales.add(match);
        }
      }
    }

    /** @type {string[]} */
    const offerLocales = [...acceptedLocales].filter(
      (locale) => locale !== currentLocale,
    );
    const firstOfferedLocale = offerLocales.at(0);

    if (!firstOfferedLocale) {
      return nothing;
    }

    if (preferredLocale && offerLocales.includes(preferredLocale)) {
      const resetLocale = () => this.preferredLocale.set(undefined);
      return html`<div class="notecard tip">
        <p>Also available in: ${this._renderLocaleLink(preferredLocale)}.</p>
        <p>
          <mdn-button
            .icon=${pinOffIcon}
            variant="secondary"
            action="negative"
            @click=${resetLocale}
            >Stop redirecting to:
            ${this._getLocaleName(preferredLocale)}</mdn-button
          >
        </p>
      </div>`;
    }

    const rememberLocale = () => this.preferredLocale.set(currentLocale);
    return html`<div class="notecard tip">
      <p>
        Also available in:
        ${join(
          offerLocales.map((locale) => this._renderLocaleLink(locale)),
          html`, `,
        )}
      </p>
      <p>
        <mdn-button
          .icon=${pinIcon}
          variant="secondary"
          @click=${rememberLocale}
          >Always redirect to:
          <em>${this._getLocaleName(currentLocale)}</em> (when
          available)</mdn-button
        >
      </p>
    </div>`;
  }

  /**
   * @param {string} locale
   */
  _renderLocaleLink(locale) {
    const url = this._url.replace(`/${this.locale}/`, `/${locale}/`);
    const label = this._getLocaleName(locale);

    return html`<a href=${url}>${label}</a>`;
  }

  /**
   * @param {string} locale
   */
  _getLocaleName(locale) {
    switch (locale) {
      case "de":
        return "German";
      case "en-US":
        return "English (US)";
      case "es":
        return "Spanish";
      case "fr":
        return "French";
      case "ja":
        return "Japanese";
      case "ko":
        return "Korean";
      case "pt-BR":
        return "Portuguese (Brazil)";
      case "ru":
        return "Russian";
      case "zh-CN":
        return "Chinese (Simplified)";
      case "zh-TW":
        return "Chinese (Traditional)";

      default:
        return `${locale}`;
    }
  }
}

customElements.define("mdn-language-hint", MDNLanguageHint);
