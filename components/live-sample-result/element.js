import { LitElement, html, nothing } from "lit";

import { styleMap } from "lit/directives/style-map.js";

import { L10nMixin } from "../../l10n/mixin.js";

import styles from "./element.css?lit";

import "../play-runner/element.js";
import "../button/element.js";

export class MDNLiveSampleResult extends L10nMixin(LitElement) {
  static styles = styles;

  static properties = {
    liveId: { attribute: "live-id" },
    code: { type: Object },
    allowed: {},
    sandbox: {},
    srcPrefix: { attribute: "src-prefix" },
    height: {},
    breakoutLink: { state: true },
  };

  constructor() {
    super();
    /** @type {string | undefined} */
    this.liveId = undefined;
    /** @type {Record<string, string> | undefined} */
    this.code = undefined;
    /** @type {string | undefined} */
    this.allow = undefined;
    /** @type {string | undefined} */
    this.sandbox = undefined;
    /** @type {string | undefined} */
    this.srcPrefix = undefined;
    /** @type {string | undefined} */
    this.height = undefined;
    /** @type {string | undefined} */
    this.breakoutLink = undefined;
  }

  _openFullscreen(replace = false) {
    if (this._runnerSrc) {
      if (replace || this._fullscreenReplace) {
        location.replace(this._runnerSrc);
      } else {
        location.href = this._runnerSrc;
      }
    } else {
      this._fullscreenPending = true;
      if (replace) {
        this._fullscreenReplace = true;
      }
    }
  }

  /** @param {MouseEvent} event */
  _fullscreenClick(event) {
    if (
      this.liveId &&
      event.target instanceof HTMLAnchorElement &&
      event.target.hash === `#livesample_fullscreen=${this.liveId}`
    ) {
      event.preventDefault();
      this._openFullscreen();
    }
  }

  /** @param {CustomEvent<string>} event */
  _runnerSrcUpdated({ detail }) {
    this._runnerSrc = detail;
    if (this._fullscreenPending) {
      this._openFullscreen();
    }
    const playUrl = new URL("/en-US/play", location.href);
    playUrl.search = new URL(this._runnerSrc).search;
    if (this.srcPrefix)
      playUrl.searchParams.append("srcPrefix", this.srcPrefix);
    this.breakoutLink = playUrl.href;
  }

  connectedCallback() {
    super.connectedCallback();
    this._fullscreenClick = this._fullscreenClick.bind(this);
    document.addEventListener("click", this._fullscreenClick);
    if (location.hash === `#livesample_fullscreen=${this.liveId}`) {
      this._openFullscreen();
    }
  }

  render() {
    return html`
      <div class="code-example">
        <div class="example-header">
          ${this.breakoutLink
            ? html`<mdn-button
                variant="secondary"
                href=${this.breakoutLink}
                target="_blank"
                rel="opener"
                aria-label=${this.l10n("example-play-button-title")}
                title=${this.l10n("example-play-button-title")}
                >${this.l10n("example-play-button-label")}</mdn-button
              >`
            : nothing}
        </div>
        <mdn-play-runner
          @mdn-play-runner-src=${this._runnerSrcUpdated}
          .code=${this.code}
          .allow=${this.allow}
          .sandbox=${[
            ...new Set(["allow-modals", ...(this.sandbox?.split(" ") || [])]),
          ].join(" ")}
          .srcPrefix=${this.srcPrefix}
          permalink
          style=${styleMap({
            height: this.height
              ? `${this.height}${/[0-9]$/.test(this.height) ? "px" : ""}`
              : undefined,
          })}
        ></mdn-play-runner>
      </div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this._fullscreenClick);
  }
}

customElements.define("mdn-live-sample-result", MDNLiveSampleResult);
