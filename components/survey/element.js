import { LitElement, html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { createRef, ref } from "lit/directives/ref.js";

import "../button/element.js";
import { L10nMixin } from "../../l10n/mixin.js";
import { gleanClick } from "../../utils/glean.js";
import closeIcon from "../icon/cancel.svg?lit";

import styles from "./element.css?lit";
import { SURVEYS } from "./surveys.js";
import { getSurveyState, writeSurveyState } from "./utils.js";

/**
 * @import * as Survey from "./types.js";
 */

export class MDNSurvey extends L10nMixin(LitElement) {
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

    /** @type {import("@lit").Ref<HTMLDetailsElement>} */
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
    this._survey = this.#findSurvey();

    if (this._survey) {
      this._surveyState = getSurveyState(this._survey.bucket);
      this._source =
        typeof this._survey.src === "function"
          ? this._survey.src(location.pathname)
          : this._survey.src;

      this.#markAsSeen();
    }
  }

  /**
   * @returns {Survey.Survey | undefined}
   */
  #findSurvey() {
    const forcedSurvey = new URLSearchParams(location.search).get(
      "force_survey",
    );
    this._force = forcedSurvey !== null;
    return SURVEYS.find((survey) => {
      if (this._force) {
        return forcedSurvey ? survey.key === forcedSurvey : true;
      }

      if (!survey.show(location.pathname)) {
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

  #onLinkClick() {
    this.#markOpened();
  }

  #onToggle() {
    if (!this._survey || !this._surveyState || this._isOpen) return;

    const details = this._detailsRef.value;
    if (details && details.open) {
      this.#markOpened();
      this._isOpen = true;
      this.requestUpdate();
    }
  }

  #markOpened() {
    if (!this._survey || !this._surveyState) return;

    this._surveyState = {
      ...this._surveyState,
      opened_at: Date.now(),
    };
    writeSurveyState(this._survey.bucket, this._surveyState);
    this.#measure("opened");
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

    gleanClick(`survey: ${action} ${this._survey.bucket}`);
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
   * @returns {import("@lit").TemplateResult | nothing}
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

    const title = this.l10n("survey-hide-this-survey")`Hide this survey`;

    return html`
      <div class="survey">
        <header>
          <p>${this._survey.teaser}</p>
          <mdn-button
            variant="plain"
            .icon=${closeIcon}
            icon-only
            title=${title}
            aria-label=${title}
            @click=${this.#dismiss}
          ></mdn-button>
        </header>
        ${this._survey.link
          ? html`<a
              class="external"
              href=${this._source}
              target="_blank"
              title=${this.l10n("survey-take-survey-opens-in-a-new-tab")`Take survey (Opens in a new tab)`}
              @click=${this.#onLinkClick}
              >${this._survey.question}</a
            >`
          : html`<details ${ref(this._detailsRef)} @toggle=${this.#onToggle}>
              <summary>${this._survey.question}</summary>
              ${this._isOpen && this._source
                ? html`
                    <iframe
                      title=${ifDefined(this._survey.question)}
                      src=${this._source}
                    ></iframe>
                  `
                : nothing}
            </details>`}
        ${this._survey.footnote
          ? html` <footer>(${this._survey.footnote})</footer> `
          : nothing}
      </div>
    `;
  }
}

customElements.define("mdn-survey", MDNSurvey);
