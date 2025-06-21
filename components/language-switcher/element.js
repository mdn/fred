import { LitElement, html, nothing } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";
import pinIcon from "../icon/pin.svg?lit";
import { PreferredLocaleController } from "../preferred-locale/controller.js";

import styles from "./element.css?lit";

import "../dropdown/element.js";

export class MDNLanguageSwitcher extends L10nMixin(LitElement) {
  static styles = styles;

  static properties = {
    locale: { type: String },
    native: { type: String },
    translations: { type: Array },
    url: { type: String },
  };

  constructor() {
    super();
    /** @type {PreferredLocaleController} */
    this.preferredLocale = new PreferredLocaleController(this);
    /** @type {import("@rari").Translation[]} */
    this.translations = [];
    this.native = "";
    this.locale = "en-US";
    this.url = "/";
  }

  render() {
    const { translations, native, locale, preferredLocale, url } = this;

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
          <ul class="language-switcher__list">
            ${translations
              .sort((a, b) => a.locale.localeCompare(b.locale))
              .map(
                (translation) => html`
                  <li>
                    <mdn-button
                      .icon=${preferredLocale.value === translation.locale
                        ? pinIcon
                        : undefined}
                      class="language-switcher__option"
                      variant="plain"
                      href=${url.replace(
                        `/${locale}/`,
                        `/${translation.locale}/`,
                      )}
                      @click=${preferredLocale.reset}
                      >${translation.native}</mdn-button
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
