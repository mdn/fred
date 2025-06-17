import "../button/element.js";

import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";

import { gleanClick } from "../../utils/glean.js";
import thumbsDown from "../icon/thumbs-down.svg?lit";
import thumbsUp from "../icon/thumbs-up.svg?lit";

import styles from "./element.css?lit";

/**
 * @typedef {"outdated"|"incomplete"|"code_examples"|"technical"|"consistency"|"incomprehensible"|"linguistic"|"other"} FeedbackReason
 */

/** @type {Partial<Record<FeedbackReason, string>>} */
const FEEDBACK_REASONS = {
  outdated: "Content is out of date",
  incomplete: "Missing information",
  code_examples: "Code examples not working as expected",
  other: "Other",
};

/** @type {Partial<Record<FeedbackReason, string>>} */
const FEEDBACK_REASONS_DE = {
  technical: "Übersetzung enthält fachliche Fehler",
  consistency: "Begriffe sind inkonsistent übersetzt",
  incomprehensible: "Übersetzung ist nicht verständlich",
  linguistic: "Übersetzung enthält sprachliche Fehler",
  code_examples: "Code-Beispiele funktionieren nicht",
  other: "Sonstige",
};

export class MDNContentFeedback extends L10nMixin(LitElement) {
  static styles = styles;

  static properties = {
    locale: { type: String },
    _reason: { state: true },
    _view: { state: true },
  };

  constructor() {
    super();
    this.locale = "";
    this._reason = "";
    /** @type {'vote'|'feedback'|'thanks'} */
    this._view = "vote";
  }

  /**
   * @param {MouseEvent} event
   */
  _handleVote({ target }) {
    if (target instanceof HTMLElement) {
      const vote = target.dataset.vote;
      if (vote === "yes") {
        this._view = "thanks";
      } else if (vote === "no") {
        this._view = "feedback";
      }
      // Reusing Thumbs' key to be able to reuse queries.
      gleanClick("thumbs", {
        type: "article-footer",
        label: vote === "yes" ? "1" : "0",
      });
    }
  }

  _handleFeedback() {
    this._view = "thanks";
    gleanClick("article-footer", { type: "feedback", label: this._reason });
  }

  _renderVote() {
    return html`<label
        >${this.l10n(
          "content-feedback_question",
        )`Was this page helpful to you?`}
      </label>
      <div class="content-feedback--buttons">
        <mdn-button
          data-vote="yes"
          @click=${this._handleVote}
          .icon=${thumbsUp}
          action="positive"
        >
          ${this.l10n`Yes`}
        </mdn-button>
        <mdn-button
          data-vote="no"
          @click=${this._handleVote}
          .icon=${thumbsDown}
          action="negative"
        >
          ${this.l10n`No`}
        </mdn-button>
      </div>`;
  }

  _renderFeedback() {
    const setReason =
      /** @param {Event} event */
      ({ target }) => {
        if (target instanceof HTMLInputElement) {
          this._reason = target.value;
        }
      };

    return html`<label
        >${this.l10n(
          "content-feedback_reason",
        )`Why was this page not helpful to you?`}</label
      >
      ${Object.entries(
        this.locale === "de" ? FEEDBACK_REASONS_DE : FEEDBACK_REASONS,
      ).map(
        ([key, label]) =>
          html`<div class="content-feedback--radios">
            <input
              type="radio"
              id=${`reason_${key}`}
              name="reason"
              .value=${key}
              ?checked=${this._reason === key}
              @change=${setReason}
            />
            <label for=${`reason_${key}`}>${label}</label>
          </div>`,
      )}
      <div class="button-container">
        <mdn-button @click=${this._handleFeedback} ?disabled=${!this._reason}>
          ${this.l10n`Submit`}
        </mdn-button>
      </div>`;
  }

  _renderThanks() {
    return html`<span class="thank-you">
      ${this.l10n("content-feedback_thanks")`Thank you for your feedback!`}
      <span class="emoji">❤️</span>
    </span>`;
  }

  /**
   * @param {'vote'|'feedback'|'thanks'} view
   */
  _renderInner(view) {
    switch (view) {
      case "vote":
        return this._renderVote();
      case "feedback":
        return this._renderFeedback();
      case "thanks":
        return this._renderThanks();
    }
  }

  render() {
    return html`<fieldset class="content-feedback">
      ${this._renderInner(this._view)}
    </fieldset>`;
  }
}

customElements.define("mdn-content-feedback", MDNContentFeedback);
