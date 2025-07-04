import { LitElement, html } from "lit";

import styles from "./element.css?lit";

export class MDNThemedImage extends LitElement {
  static styles = styles;
  static ssr = false;

  static properties = {
    srcLight: { type: String, attribute: "src-light" },
    srcDark: { type: String, attribute: "src-dark" },
    alt: { type: String },
    _theme: { type: String },
  };

  constructor() {
    super();
    /** @type {string} */
    this.srcLight = "";
    /** @type {string} */
    this.srcDark = "";
    /** @type {string} */
    this.alt = "";
    /** @type {string} */
    this._theme = "os";
  }

  connectedCallback() {
    super.connectedCallback();
    this._setupThemeObserver();
    this._updateTheme();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Disconnect the observer when the element is removed from the DOM
    if (this._themeObserver) {
      this._themeObserver.disconnect();
    }
  }

  _updateTheme() {
    this._theme =
      document.documentElement.dataset.theme === "light dark"
        ? "os"
        : (document.documentElement.dataset.theme ?? "light");
  }

  _setupThemeObserver() {
    // Use a MutationObserver to react to changes in the data-theme attribute
    const observer = new MutationObserver(this._handleThemeChange.bind(this));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    this._themeObserver = observer;
  }

  /**
   *
   * @param {MutationRecord[]} mutations
   */
  _handleThemeChange(mutations) {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-theme"
      ) {
        this._updateTheme();
      }
    }
  }

  render() {
    switch (this._theme) {
      case "os":
        return html`<picture>
          <source
            srcset=${this.srcLight}
            media="(prefers-color-scheme: light)"
          />
          <source srcset=${this.srcDark} media="(prefers-color-scheme: dark)" />
          <img src=${this.srcLight} alt=${this.alt} />
        </picture>`;
      case "dark":
        return html`<img src=${this.srcDark} alt=${this.alt} />`;
      default:
        return html`<img src=${this.srcLight} alt=${this.alt} />`;
    }
  }
}

customElements.define("mdn-themed-image", MDNThemedImage);
