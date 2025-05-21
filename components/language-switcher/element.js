import { LitElement, html, nothing } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";
import globeSvg from "../icon/globe.svg?lit";

import styles from "./element.css?lit";

import "../dropdown/element.js";

export class MDNLanguageSwitcher extends L10nMixin(LitElement) {
  static styles = styles;

  static properties = {
    locale: { type: String },
    translations: { type: Array },
    url: { type: String },
  };

  constructor() {
    super();
    /** @type {import("types/rari.js").Translation[]} */
    this.translations = [];
    this.locale = "en-US";
    this.url = "/";
  }

  render() {
    const { translations, locale, url } = this;

    if (translations.length === 0) {
      return nothing;
    }

    return html`<div class="language-switcher">
      <mdn-dropdown>
        <button slot="button" class="language-switcher__button dropdown">
          ${globeSvg}
          <span
            >${translations.find((translation) => locale === translation.locale)
              ?.native}</span
          >
        </button>
        <div
          slot="dropdown"
          class="language-switcher__dropdown"
          id="language-switcher__dropdown"
        >
          <ul class="language-switcher__list">
            ${translations.map(
              (translation) => html`
                <li>
                  <a
                    class="language-switcher__option button"
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
