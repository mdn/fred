import { LitElement, html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { createRef, ref } from "lit/directives/ref.js";

import styles from "./element.css?lit";
import { SURVEYS } from "./surveys.js";
import { getSurveyState, writeSurveyState } from "./utils.js";

/**
 * @import { TemplateResult } from "lit";
 * @import { Ref } from "lit/directives/ref.js";
 * @import * as Survey from "./types.js";
 */

export class MDNSurvey extends LitElement {
  static styles = styles;

  static ssr = false;

  constructor() {
    super();
    /** @type {Survey.Survey | undefined} */
    this._survey = undefined;
    /** @type {Survey.SurveyState | undefined} */
    this._surveyState = undefined;
    /** @type {boolean} */
    this._isOpen = false;
    /** @type {boolean}  */
    this._force = false;
    /** @type {string | undefined} */
    this._source = undefined;

    /** @type {Ref<HTMLDetailsElement>} */
    this._detailsRef = createRef();
  }

  connectedCallback() {
    super.connectedCallback();
    this.#checkForSurvey();
    this.#setupMessageListener();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#removeMessageListener();
  }

  #checkForSurvey() {
    if (globalThis.window === undefined) return;

    const FORCE_SURVEY_PREFIX = "#FORCE_SURVEY=";
    this._force = globalThis.location.hash.startsWith(FORCE_SURVEY_PREFIX);

    this._survey = this.#findSurvey();

    if (this._survey) {
      this._surveyState = getSurveyState(this._survey.bucket);
      this._source =
        typeof this._survey.src === "function"
          ? this._survey.src(globalThis.location.pathname)
          : this._survey.src;

      this.#markAsSeen();
    }
  }

  /**
   * @returns {Survey.Survey | undefined}
   */
  #findSurvey() {
    return SURVEYS.find((survey) => {
      if (this._force) {
        const FORCE_SURVEY_PREFIX = "#FORCE_SURVEY=";
        return (
          survey.key ===
          globalThis.location.hash.slice(FORCE_SURVEY_PREFIX.length)
        );
      }

      if (globalThis.window === undefined) {
        return false;
      }

      if (!survey.show(globalThis.location.pathname)) {
        return false;
      }

      const now = Date.now();
      if (now < survey.start || survey.end < now) {
        return false;
      }

      const state = getSurveyState(survey.bucket);
      return state.random >= survey.rateFrom && state.random < survey.rateTill;
    });
  }

  #markAsSeen() {
    if (!this._survey || !this._surveyState || this._surveyState.seen_at)
      return;

    this._surveyState = {
      ...this._surveyState,
      seen_at: Date.now(),
    };
    writeSurveyState(this._survey.bucket, this._surveyState);
    this.#measure("seen");
  }

  #dismiss() {
    if (!this._survey || !this._surveyState) return;

    this._surveyState = {
      ...this._surveyState,
      dismissed_at: Date.now(),
    };
    writeSurveyState(this._survey.bucket, this._surveyState);
    this.#measure("dismissed");
    this.requestUpdate();
  }

  #onToggle() {
    if (!this._survey || !this._surveyState || this._isOpen) return;

    const details = this._detailsRef.value;
    if (details && details.open) {
      this._surveyState = {
        ...this._surveyState,
        opened_at: Date.now(),
      };
      writeSurveyState(this._survey.bucket, this._surveyState);
      this.#measure("opened");
      this._isOpen = true;
      this.requestUpdate();
    }
  }

  #onSubmitted() {
    if (!this._survey || !this._surveyState) return;

    this._surveyState = {
      ...this._surveyState,
      submitted_at: Date.now(),
    };
    writeSurveyState(this._survey.bucket, this._surveyState);
    this.#measure("submitted");
    this.requestUpdate();
  }

  /**
   * @param {string} action
   */
  #measure(action) {
    if (!this._survey) return;

    // TODO: GLEAN
    console.log(`Survey: ${action} ${this._survey.bucket}`);
  }

  #setupMessageListener() {
    /** @type {(event: MessageEvent) => void} */
    this._messageListener = (event) => {
      if (
        event.origin === "https://survey.alchemer.com" &&
        event.data === "submit"
      ) {
        this.#onSubmitted();
      }
    };
    window.addEventListener("message", this._messageListener, false);
  }

  #removeMessageListener() {
    if (this._messageListener) {
      window.removeEventListener("message", this._messageListener, false);
    }
  }

  /**
   * @returns {TemplateResult | nothing}
   */
  render() {
    if (!this._survey || !this._surveyState) {
      return nothing;
    }

    if (
      !this._force &&
      (this._surveyState.dismissed_at || this._surveyState?.submitted_at)
    ) {
      return nothing;
    }

    return html`
      <div class="survey">
        <div class="header">
          <div class="teaser">${this._survey.teaser}</div>
          <button
            class="dismiss"
            type="button"
            aria-label="Hide this survey"
            @click=${this.#dismiss}
            title="Hide this survey"
          >
            <svg class="icon" width="16" height="16" viewBox="0 0 16 16">
              <path
                fill="currentColor"
                d="M8 6.586L13.657 1l1.414 1.414L9.414 8l5.657 5.586-1.414 1.414L8 9.414 2.343 15 .929 13.586 6.586 8 .929 2.414 2.343 1z"
              />
            </svg>
          </button>
        </div>
        <details ${ref(this._detailsRef)} @toggle=${this.#onToggle}>
          <summary>${this._survey.question}</summary>
          ${this._isOpen && this._source
            ? html`
                <iframe
                  title=${ifDefined(this._survey.question)}
                  src=${this._source}
                  height="500"
                  style="overflow: hidden;"
                ></iframe>
              `
            : nothing}
        </details>
        ${this._survey.footnote
          ? html` <section class="footer">(${this._survey.footnote})</section> `
          : nothing}
      </div>
    `;
  }
}

customElements.define("mdn-survey", MDNSurvey);
