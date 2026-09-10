import { LitElement, html, nothing } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";
import { gleanClick } from "../../utils/glean.js";
import {
  DEFAULT_BROWSERS,
  isBrowserVisible,
  resetBrowserVisibility,
  setBrowserVisibility,
} from "../compat-table/settings.js";
import { browserToIconName } from "../compat-table/utils.js";
import settingsIcon from "../icon/settings.svg?lit";

import "../button/element.js";
import "../modal/element.js";
import styles from "./element.css?lit";

/** Platforms in display order; unknown ones (e.g. "xr") are appended. */
const PLATFORM_ORDER = ["desktop", "mobile", "server"];

/**
 * Baseline's core browser set.
 * @type {readonly import("@bcd").BrowserName[]}
 */
const BASELINE_BROWSERS = Object.freeze([
  "chrome",
  "chrome_android",
  "edge",
  "firefox",
  "firefox_android",
  "safari",
  "safari_ios",
]);

/** @type {readonly import("@bcd").BrowserName[]} */
const WEBVIEW_BROWSERS = Object.freeze(["webview_android", "webview_ios"]);

/**
 * Browser groups per platform, each on its own row; remaining browsers
 * (e.g. Opera, Samsung Internet) follow on a final row.
 */
const BROWSER_ROWS = [BASELINE_BROWSERS, WEBVIEW_BROWSERS];

/**
 * A settings button opening a dialog to choose which browsers compat tables
 * show.
 *
 * The selection is previewed on the parent table immediately (via the
 * `mdn-compat-browsers-preview` event), but only persisted when confirmed.
 */
export class MDNCompatTableSettings extends L10nMixin(LitElement) {
  static styles = styles;

  static get properties() {
    return {
      browserInfo: { attribute: false },
      visibility: { attribute: false },
      hiddenBrowsers: { attribute: false },
      _selected: { state: true },
    };
  }

  constructor() {
    super();
    /** @type {Partial<import("@bcd").Browsers>} */
    this.browserInfo = {};
    /**
     * The saved visibility, provided by the table (which keeps it in sync
     * across tabs) rather than read from storage here.
     * @type {import("../compat-table/settings.js").BrowserVisibility}
     */
    this.visibility = {};
    /**
     * Browsers the parent table never shows, with the reason.
     * @type {import("@compat").HiddenBrowsers}
     */
    this.hiddenBrowsers = {};
    /** @type {Set<import("@bcd").BrowserName>} */
    this._selected = new Set();
  }

  get _modal() {
    return this.shadowRoot?.querySelector("mdn-modal");
  }

  /** Browsers grouped by platform, in display order. */
  get _platforms() {
    /** @type {Map<string, import("@bcd").BrowserName[]>} */
    const groups = new Map();
    for (const [name, browser] of Object.entries(this.browserInfo)) {
      if (!browser) {
        continue;
      }
      const platform = browser.type;
      const group = groups.get(platform) ?? [];
      group.push(/** @type {import("@bcd").BrowserName} */ (name));
      groups.set(platform, group);
    }
    return [...groups.entries()].sort(([a], [b]) => {
      const indexA = PLATFORM_ORDER.indexOf(a);
      const indexB = PLATFORM_ORDER.indexOf(b);
      return (
        (indexA === -1 ? PLATFORM_ORDER.length : indexA) -
          (indexB === -1 ? PLATFORM_ORDER.length : indexB) || a.localeCompare(b)
      );
    });
  }

  /**
   * @param {string} platform
   */
  _platformLabel(platform) {
    switch (platform) {
      case "desktop": {
        return this.l10n("compat-settings-platform-desktop")`Desktop`;
      }
      case "mobile": {
        return this.l10n("compat-settings-platform-mobile")`Mobile`;
      }
      case "server": {
        return this.l10n("compat-settings-platform-server")`Server`;
      }
      case "xr": {
        return this.l10n("compat-settings-platform-xr")`XR`;
      }
      default: {
        return platform;
      }
    }
  }

  async _open() {
    gleanClick("bcd: settings -> open");
    this._selected = new Set(
      this._browsers.filter((browser) =>
        isBrowserVisible(browser, this.visibility),
      ),
    );
    // Render the selection first, so the pills don't animate into place.
    await this.updateComplete;
    this._modal?.showModal();
  }

  _cancel() {
    this._modal?.close();
  }

  /** Ends the preview once the dialog closes for whatever reason. */
  _onClose() {
    this._preview(null);
  }

  _restoreDefaults() {
    gleanClick("bcd: settings -> restore defaults");
    this._selected = new Set(this._defaults);
    this._preview(this._visibility);
  }

  /** All browsers listed by BCD. */
  get _browsers() {
    return /** @type {import("@bcd").BrowserName[]} */ (
      Object.keys(this.browserInfo)
    );
  }

  get _defaults() {
    return this._browsers.filter((browser) =>
      DEFAULT_BROWSERS.includes(browser),
    );
  }

  /** The current selection as an explicit choice for every listed browser. */
  get _visibility() {
    return Object.fromEntries(
      this._browsers.map((browser) => [browser, this._selected.has(browser)]),
    );
  }

  /**
   * @param {import("../compat-table/settings.js").BrowserVisibility | null} visibility
   */
  _preview(visibility) {
    this.dispatchEvent(
      new CustomEvent("mdn-compat-browsers-preview", {
        detail: visibility,
        bubbles: true,
        composed: true,
      }),
    );
  }

  _save() {
    gleanClick("bcd: settings -> save");
    // Don't pin the defaults, so users keep following future default changes.
    const defaults = this._defaults;
    const isDefault =
      this._selected.size === defaults.length &&
      defaults.every((browser) => this._selected.has(browser));
    if (isDefault) {
      resetBrowserVisibility();
    } else {
      setBrowserVisibility(this._visibility);
    }
    this._modal?.close();
  }

  /**
   * @param {Event} event
   */
  _toggle({ currentTarget }) {
    const browser = /** @type {import("@bcd").BrowserName} */ (
      /** @type {HTMLElement} */ (currentTarget).dataset.browser
    );
    const selected = new Set(this._selected);
    if (selected.has(browser)) {
      selected.delete(browser);
    } else {
      selected.add(browser);
    }
    this._selected = selected;
    this._preview(this._visibility);
  }

  /**
   * @param {import("@compat").HiddenBrowserReason} reason
   */
  _hiddenLabel(reason) {
    return reason === "no-data"
      ? this.l10n(
          "compat-settings-hidden-no-data",
        )`Browser not available for current feature. No support data available.`
      : this.l10n(
          "compat-settings-hidden-not-applicable",
        )`Browser not available for current feature. WebExtensions features don't apply.`;
  }

  /**
   * @param {import("@bcd").BrowserName} browser
   */
  _renderHiddenNote(browser) {
    const reason = this.hiddenBrowsers[browser];
    if (!reason) {
      return nothing;
    }
    const label = this._hiddenLabel(reason);
    return html`<span
      class=${`icon icon-hidden-${reason}`}
      role="img"
      title=${label}
      aria-label=${label}
    ></span>`;
  }

  /** Reasons for which a browser is hidden on this page, in legend order. */
  get _hiddenReasons() {
    const present = new Set(Object.values(this.hiddenBrowsers));
    return /** @type {import("@compat").HiddenBrowserReason[]} */ ([
      "not-applicable",
      "no-data",
    ]).filter((reason) => present.has(reason));
  }

  /** Explains the hidden-browser icons, for the reasons that occur. */
  _renderHiddenLegend() {
    const reasons = this._hiddenReasons;
    if (reasons.length === 0) {
      return nothing;
    }
    return html`<section class="legend">
      <h3>${this.l10n("compat-settings-legend")`Legend`}</h3>
      <dl>
        ${reasons.map(
          (reason) =>
            html`<div class="legend-item">
              <dt><span class=${`icon icon-hidden-${reason}`}></span></dt>
              <dd>${this._hiddenLabel(reason)}</dd>
            </div>`,
        )}
      </dl>
    </section>`;
  }

  /**
   * A pill toggling whether the browser is shown.
   * @param {import("@bcd").BrowserName} browser
   * @param {boolean} selected
   */
  _renderBrowser(browser, selected) {
    const name = this.browserInfo[browser]?.name;
    const action = this.l10n.raw({
      id: selected
        ? "compat-settings-hide-browser"
        : "compat-settings-show-browser",
      args: { browser: name ?? browser },
    });
    return html`<button
      type="button"
      class="pill"
      aria-pressed=${selected}
      title=${action}
      data-browser=${browser}
      @click=${this._toggle}
    >
      <span class=${`icon icon-${browserToIconName(browser)}`}></span>
      ${name} ${this._renderHiddenNote(browser)}
      <span class="icon icon-toggle"></span>
    </button>`;
  }

  /**
   * @param {string} platform
   * @param {import("@bcd").BrowserName[]} browsers
   */
  _renderPlatform(platform, browsers) {
    const rows = [
      ...BROWSER_ROWS.map((group) =>
        browsers.filter((browser) => group.includes(browser)),
      ),
      browsers.filter(
        (browser) => !BROWSER_ROWS.some((group) => group.includes(browser)),
      ),
    ].filter((row) => row.length > 0);
    return html`<div class="platform">
      <h3>
        <span class=${`icon icon-${platform}`}></span>
        ${this._platformLabel(platform)}
      </h3>
      ${rows.map(
        (row) =>
          html`<div class="pills">
            ${row.map((browser) =>
              this._renderBrowser(browser, this._selected.has(browser)),
            )}
          </div>`,
      )}
    </div>`;
  }

  render() {
    return html`
      <mdn-button variant="plain" .icon=${settingsIcon} @click=${this._open}
        >${this.l10n("compat-settings-open")`Customize`}</mdn-button
      >
      <mdn-modal
        closedby="closerequest"
        modal-title=${this.l10n("compat-settings-title")`Customize browser compatibility tables`}
        @close=${this._onClose}
      >
        <p class="intro">
          ${this.l10n(
            "compat-settings-intro",
          )`Choose which browsers to show in compatibility tables. This is saved in your browser only.`}
        </p>
        <div class="platforms">
          ${this._platforms.map(([platform, browsers]) =>
            this._renderPlatform(platform, browsers),
          )}
        </div>
        ${this._renderHiddenLegend()}
        <footer>
          <mdn-button variant="secondary" @click=${this._restoreDefaults}
            >${this.l10n(
              "compat-settings-restore-defaults",
            )`Restore defaults`}</mdn-button
          >
          <span class="spacer"></span>
          <mdn-button variant="secondary" @click=${this._cancel}
            >${this.l10n("compat-settings-cancel")`Cancel`}</mdn-button
          >
          <mdn-button @click=${this._save}
            >${this.l10n("compat-settings-save")`Save`}</mdn-button
          >
        </footer>
      </mdn-modal>
    `;
  }
}

customElements.define("mdn-compat-table-settings", MDNCompatTableSettings);
