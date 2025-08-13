import { decode } from "he";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { ref } from "lit/directives/ref.js";

import "../play-controller/element.js";
import "../play-editor/element.js";
import "../play-runner/element.js";
import "../play-console/element.js";
import "../ix-tab/element.js";
import "../ix-tab-panel/element.js";
import "../ix-tab-wrapper/element.js";
import { L10nMixin } from "../../l10n/mixin.js";

/**
 * @import { InteractiveExampleBase } from "./element.js";
 */

/**
 * @template {new (...args: any[]) => InteractiveExampleBase} TBase
 * @param {TBase} Base
 */
export const InteractiveExampleWithConsole = (Base) =>
  class extends L10nMixin(Base) {
    #render() {
      return html`
        <mdn-play-controller ${ref(this._controller)}>
          <div class="template-console">
            <header>
              <h4>${decode(this.name)}</h4>
            </header>
            ${this._languages.length === 1
              ? html`<mdn-play-editor
                  id="editor"
                  language=${ifDefined(this._languages[0])}
                ></mdn-play-editor>`
              : html`<mdn-ix-tab-wrapper>
                  ${this._languages.map(
                    (lang) => html`
                      <mdn-ix-tab id=${lang}
                        >${this._langName(lang)}</mdn-ix-tab
                      >
                      <mdn-ix-tab-panel id=${`${lang}-panel`}>
                        <mdn-play-editor language=${lang}></mdn-play-editor>
                      </mdn-ix-tab-panel>
                    `,
                  )}
                </mdn-ix-tab-wrapper>`}
            <div class="buttons">
              <mdn-button
                id="execute"
                @click=${this._run}
                variant="secondary"
                title=${this.l10n`Run example, and show console output`}
                >${this.l10n`Run`}</mdn-button
              >
              <mdn-button
                id="reset"
                @click=${this._reset}
                variant="secondary"
                title=${this.l10n`Reset example, and clear console output`}
                >${this.l10n`Reset`}</mdn-button
              >
            </div>
            <mdn-play-console
              id="console"
              title=${this.l10n`Console output`}
            ></mdn-play-console>
            <mdn-play-runner
              defaults=${ifDefined(
                this._languages.includes("wat") ? "ix-wat" : undefined,
              )}
            ></mdn-play-runner>
          </div>
        </mdn-play-controller>
      `;
    }

    render() {
      return this._template === "console" ? this.#render() : super.render();
    }
  };
