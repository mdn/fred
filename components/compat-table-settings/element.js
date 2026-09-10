import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";
import { gleanClick } from "../../utils/glean.js";
import {
  DEFAULT_BROWSERS,
  getVisibleBrowsers,
  resetVisibleBrowsers,
  setVisibleBrowsers,
} from "../compat-table/browser-settings.js";
import { browserToIconName } from "../compat-table/utils.js";
import settingsIcon from "../icon/settings.svg?lit";

import "../button/element.js";
import "../modal/element.js";
import styles from "./element.css?lit";

/** Platforms in display order; unknown ones (e.g. "xr") are appended. */
const PLATFORM_ORDER = ["desktop", "mobile", "server"];

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
      _selected: { state: true },
    };
  }

  constructor() {
    super();
    /** @type {Partial<import("@bcd").Browsers>} */
    this.browserInfo = {};
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

  _open() {
    gleanClick("bcd: settings -> open");
    this._selected = new Set(getVisibleBrowsers());
    this._modal?.showModal();
  }

  _cancel() {
    this._modal?.close();
  }

  /** Reverts any unsaved preview once the dialog closes for whatever reason. */
  _onClose() {
    this._preview(getVisibleBrowsers());
  }

  _restoreDefaults() {
    gleanClick("bcd: settings -> restore defaults");
    this._selected = new Set(DEFAULT_BROWSERS);
    this._preview(this._selectedInOrder);
  }

  /** Selected browsers in BCD order (as listed in `browserInfo`). */
  get _selectedInOrder() {
    return /** @type {import("@bcd").BrowserName[]} */ (
      Object.keys(this.browserInfo)
    ).filter((browser) => this._selected.has(browser));
  }

  /**
   * @param {import("@bcd").BrowserName[]} browsers
   */
  _preview(browsers) {
    this.dispatchEvent(
      new CustomEvent("mdn-compat-browsers-preview", {
        detail: browsers,
        bubbles: true,
        composed: true,
      }),
    );
  }

  _save() {
    gleanClick("bcd: settings -> save");
    const browsers = this._selectedInOrder;
    // Don't pin the defaults, so users keep following future default changes.
    const isDefault =
      browsers.length === DEFAULT_BROWSERS.length &&
      browsers.every((browser) => DEFAULT_BROWSERS.includes(browser));
    if (isDefault) {
      resetVisibleBrowsers();
    } else {
      setVisibleBrowsers(browsers);
    }
    this._modal?.close();
  }

  /**
   * @param {Event} event
   */
  _toggle({ target }) {
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    const browser = /** @type {import("@bcd").BrowserName} */ (target.value);
    const selected = new Set(this._selected);
    if (target.checked) {
      selected.add(browser);
    } else {
      selected.delete(browser);
    }
    this._selected = selected;
    this._preview(this._selectedInOrder);
  }

  /**
   * @param {string} platform
   * @param {import("@bcd").BrowserName[]} browsers
   */
  _renderPlatform(platform, browsers) {
    return html`<fieldset>
      <legend>
        <span class=${`icon icon-${platform}`}></span>
        ${this._platformLabel(platform)}
      </legend>
      <div class="browsers">
        ${browsers.map(
          (browser) =>
            html`<label>
              <input
                type="checkbox"
                name="browsers"
                .value=${browser}
                .checked=${this._selected.has(browser)}
                @change=${this._toggle}
              />
              <span class=${`icon icon-${browserToIconName(browser)}`}></span>
              ${this.browserInfo[browser]?.name}
            </label>`,
        )}
      </div>
    </fieldset>`;
  }

  render() {
    return html`
      <mdn-button variant="plain" .icon=${settingsIcon} @click=${this._open}
        >${this.l10n("compat-settings-open")`Configure browsers`}</mdn-button
      >
      <mdn-modal
        anchored
        modal-title=${this.l10n("compat-settings-title")`Browsers`}
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
            >${this.l10n("compat-settings-ok")`OK`}</mdn-button
          >
        </footer>
      </mdn-modal>
    `;
  }
}

customElements.define("mdn-compat-table-settings", MDNCompatTableSettings);
