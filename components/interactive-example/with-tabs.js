import { decode } from "he";
import { html } from "lit";
import { ref } from "lit/directives/ref.js";

import "../play-controller/element.js";
import "../play-editor/element.js";
import "../play-runner/element.js";
import "../ix-tab/element.js";
import "../ix-tab-panel/element.js";
import "../ix-tab-wrapper/element.js";
import { L10nMixin } from "../../l10n/mixin.js";
import { randomIdString } from "../utils/index.js";

/**
 * @import { InteractiveExampleBase } from "./element.js";
 */

/**
 * @template {new (...args: any[]) => InteractiveExampleBase} TBase
 * @param {TBase} Base
 */
export const InteractiveExampleWithTabs = (Base) =>
  class extends L10nMixin(Base) {
    #render() {
      const id = randomIdString();

      return html`
        <mdn-play-controller
          ${ref(this._controller)}
          run-on-start
          run-on-change
        >
          <div class="template-tabbed" aria-labelledby=${id}>
            <header>
              <h4 id=${id}>${decode(this.name)}</h4>
              <mdn-button id="reset" @click=${this._reset} variant="secondary"
                >${this.l10n`Reset`}</mdn-button
              >
            </header>
            <mdn-ix-tab-wrapper>
              ${this._languages.map(
                (lang) => html`
                  <mdn-ix-tab id=${lang}>${this._langName(lang)}</mdn-ix-tab>
                  <mdn-ix-tab-panel id=${`${lang}-panel`}>
                    <mdn-play-editor language=${lang}></mdn-play-editor>
                  </mdn-ix-tab-panel>
                `,
              )}
            </mdn-ix-tab-wrapper>
            <div class="output-wrapper">
              <h4>${this.l10n`Output`}</h4>
              <mdn-play-runner
                ${ref(this._runner)}
                sandbox="allow-top-navigation-by-user-activation allow-modals"
                defaults="ix-tabbed"
              ></mdn-play-runner>
            </div>
          </div>
        </mdn-play-controller>
      `;
    }

    render() {
      return this._template === "tabbed" ? this.#render() : super.render();
    }
  };
