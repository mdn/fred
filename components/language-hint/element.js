import { LitElement, html, nothing } from "lit";

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
    /** @type {string} */
    this.locale = "";
    /** @type {string[]} */
    this.locales = [];
    /** @type {string[]} */
    this._acceptedLanguages = [...navigator.languages];
    this._url = location.pathname;
  }

  render() {
    const currentLocale = this.locale;
    const acceptedLanguages = this._acceptedLanguages;
    const allLocales = this.locales;

    const acceptedLocales = [];
    for (const language of acceptedLanguages) {
      if (language.includes("-")) {
        // e.g. en-US, de-DE
        if (allLocales.includes(language)) {
          // e.g. en-US
          acceptedLocales.push(language);
        } else {
          // e.g. de-DE
          const locale = language.split("-").at(0);
          if (locale && allLocales.includes(locale)) {
            acceptedLocales.push(locale);
          }
        }
      } else {
        // e.g. en, fr, zh
        const matches = allLocales.filter((locale) =>
          locale.startsWith(language),
        );
        acceptedLocales.push(...matches);
      }
    }

    /** @type {string[]} */
    const offerLocales = acceptedLocales.filter(
      (locale) => locale !== currentLocale,
    );
    const firstOfferedLocale = offerLocales.at(0);

    if (!firstOfferedLocale) {
      return nothing;
    }

    if (offerLocales.length > 1) {
      return html`<div class="notecard tip">
        <p>
          This page is also available in
          ${this._renderLocaleLink(firstOfferedLocale)}.
        </p>
      </div>`;
    }

    return html`<div class="notecard tip">
      <p>
        This page is also available in:
        <ul>
          ${offerLocales.map((locale) => html`<li>${this._renderLocaleLink(locale)}</li>`)}
        </ul>
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
        return "English";
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
