import { decode } from "he";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { ref } from "lit/directives/ref.js";

import { L10nMixin } from "../../l10n/mixin.js";
import { MDNPlayEditor } from "../play-editor/element.js";
import { randomIdString } from "../utils/index.js";

import { isCSSSupported } from "./utils.js";

import "../play-controller/element.js";
import "../play-runner/element.js";

/**
 * @import { InteractiveExampleBase } from "./element.js";
 */

/**
 * @template {new (...args: any[]) => InteractiveExampleBase} TBase
 * @param {TBase} Base
 */
export const InteractiveExampleWithChoices = (Base) =>
  class extends L10nMixin(Base) {
    static properties = {
      __choiceSelected: { state: true },
      __choiceUnsupported: { state: true },
      __choiceUpdated: { state: true },
    };

    /** @param {any[]} _args  */
    constructor(..._args) {
      super();
      /** @type {number} */
      this.__choiceSelected = -1;
      /** @type {boolean[]} */
      this.__choiceUnsupported = [];
      /** @type {boolean} */
      this.__choiceUpdated = false;
    }

    /** @param {MouseEvent} event  */
    #choiceFocus({ target }) {
      if (target instanceof MDNPlayEditor) {
        target.focus();
      }
    }

    /** @param {MouseEvent} event  */
    #choiceSelect({ target }) {
      if (target instanceof MDNPlayEditor) {
        this.#updateUnsupported(target);
        this.#selectChoice(target);
      }
    }

    /** @param {Event} event  */
    #choiceUpdate({ target }) {
      if (target instanceof MDNPlayEditor) {
        this.#updateUnsupported(target);
        if (this.__choiceSelected === this.#getIndex(target)) {
          this.#selectChoice(target);
        }
        this.__choiceUpdated = true;
      }
    }

    #resetChoices() {
      this.__choiceSelected = -1;
      this.__choiceUpdated = false;

      const editorNodes = [
        ...(this.shadowRoot?.querySelectorAll("mdn-play-editor") || []),
      ];

      for (const [index, editorNode] of [...editorNodes].entries()) {
        const code = this._choices?.at(index) ?? "";
        editorNode.value = code;
      }

      this.__choiceUnsupported =
        this._choices?.map((code) => !isCSSSupported(code || "")) || [];

      const first = editorNodes[0];
      if (first) {
        this.#selectChoice(first);
      }
    }

    /** @param {MDNPlayEditor} editor */
    async #selectChoice(editor) {
      const index = this.#getIndex(editor);
      await this._runner.value?.postMessage({
        typ: "choice",
        code: editor.value,
      });
      this.__choiceSelected = index;
    }

    /** @param {MDNPlayEditor} editor */
    #updateUnsupported(editor) {
      const index = this.#getIndex(editor);
      this.__choiceUnsupported = this.__choiceUnsupported.map((value, i) =>
        index === i ? !isCSSSupported(editor.value) : value,
      );
    }

    /** @param {MDNPlayEditor} editor */
    #getIndex(editor) {
      return Number.parseInt(editor.dataset.index ?? "-1", 10);
    }

    #render() {
      const id = randomIdString();

      return html`
        <div class="template-choices" aria-labelledby=${id}>
          <header>
            <h4 id=${id}>${decode(this.name)}</h4>
            <mdn-button
              id="reset"
              @click=${this._reset}
              variant="secondary"
              .disabled=${!this.__choiceUpdated}
              >${this.l10n`Reset`}</mdn-button
            >
          </header>
          <ul
            class="choice-wrapper"
            @click=${this.#choiceFocus}
            @focus=${this.#choiceSelect}
            @update=${this.#choiceUpdate}
            aria-label=${this.l10n`Value select`}
          >
            ${this._choices?.map(
              (code, index) => html`
                <li
                  class=${[
                    "choice",
                    ...(index === this.__choiceSelected ? ["selected"] : []),
                    ...(this.__choiceUnsupported[index] ? ["unsupported"] : []),
                  ].join(" ")}
                >
                  <mdn-play-editor
                    data-index=${index}
                    language="css"
                    minimal="true"
                    .delay=${100}
                    .value=${code?.trim()}
                    aria-label=${ifDefined(
                      this.__choiceUnsupported[index]
                        ? this
                            .l10n`The current value is not supported by your browser.`
                        : undefined,
                    )}
                  ></mdn-play-editor>
                </li>
              `,
            )}
          </ul>
          <div class="output-wrapper">
            <mdn-play-controller ${ref(this._controller)} run-on-start>
              <mdn-play-runner
                ${ref(this._runner)}
                defaults="ix-choice"
                sandbox="allow-modals"
              ></mdn-play-runner>
            </mdn-play-controller>
          </div>
        </div>
      `;
    }

    _reset() {
      if (this._template === "choices") {
        this.#resetChoices();
      } else {
        super._reset();
      }
    }

    _initialCode() {
      const code = super._initialCode();
      if (this._template === "choices") {
        code["js-hidden"] = `setChoice(${JSON.stringify(this._choices?.[0])})`;
      }
      return code;
    }

    render() {
      return this._template === "choices" ? this.#render() : super.render();
    }

    firstUpdated() {
      super.firstUpdated();
      if (this._template === "choices") {
        this.#resetChoices();
      }
    }
  };
