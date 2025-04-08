import { LitElement, css, html } from "lit";

import { L10nMixin } from "../../l10n/mixin";
// @ts-ignore
import buttonStyles from "../button/index.css?lit";
import { Button } from "../button/index.js";

// @ts-ignore
import thumbsDown from "../icon/thumbs_down.svg?lit";
// @ts-ignore
import thumbsUp from "../icon/thumbs_up.svg?lit";

// @ts-ignore
import styles from "./index.css?lit";

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

export class ContentFeedback extends L10nMixin(LitElement) {
  static styles = css`
    ${styles}
    ${buttonStyles}
  `;

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
   * @param {boolean} value
   */
  _handleVote(value) {
    this._view = value ? "thanks" : "feedback";
    // Reusing Thumbs' key to be able to reuse queries.
    // FIXME gleanClick(`${THUMBS}: ${ARTICLE_FOOTER} -> ${Number(value)}`);
  }

  _handleFeedback() {
    this._view = "thanks";
    // FIXME gleanClick(`${ARTICLE_FOOTER}: feedback -> ${reason}`);
  }

  _renderVote() {
    return html`<label
        >${this.l10n(
          "content-feedback_question",
        )`Was this page helpful to you?`}
      </label>
      <div class="content-feedback--buttons">
        ${Button({
          extraClasses: "yes",
          handleClick: () => this._handleVote(true),
          icon: thumbsUp,
          label: this.l10n`Yes`,
        })}
        ${Button({
          extraClasses: "no",
          handleClick: () => this._handleVote(false),
          icon: thumbsDown,
          label: this.l10n`No`,
        })}
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
        ${Button({
          type: "button",
          extraClasses: "primary",
          disabled: !this._reason,
          handleClick: this._handleFeedback,
          label: this.l10n`Submit`,
        })}
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

customElements.define("mdn-content-feedback", ContentFeedback);
