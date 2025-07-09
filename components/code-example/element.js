import { Task } from "@lit/task";
import { LitElement, html, nothing } from "lit";
import { createRef, ref } from "lit/directives/ref.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import "../copy-button/element.js";
import styles from "./element.css?lit";

/**
 * @import { MDNLiveSampleResult } from "../live-sample-result/element.js";
 */

const LANGUAGE_CLASSES = new Set(["html", "js", "css", "wat"]);

export class MDNCodeExample extends LitElement {
  static styles = styles;

  static properties = {
    language: { type: String },
    code: { type: String },
  };

  constructor() {
    super();
    this.language = "";
    this.code = "";
    /** @type {MDNLiveSampleResult | undefined} */
    this._liveSample = undefined;
    this._liveSampleUpdate = this._liveSampleUpdate.bind(this);
  }

  get liveSample() {
    return this._liveSample;
  }

  set liveSample(result) {
    if (result) {
      if (this._liveSample) {
        this._liveSample.removeEventListener(
          "mdn-play-runner-src",
          this._liveSampleUpdate,
        );
      }
      this._liveSample = result;
      this._liveSample.addEventListener(
        "mdn-play-runner-src",
        this._liveSampleUpdate,
      );
    }
  }

  _liveSampleUpdate() {
    this.requestUpdate();
  }

  _codeRef = createRef();

  _highlightTask = new Task(this, {
    args: () => [this.language, this.code],
    task: async ([language, code]) => {
      const { highlightString } = await import("./syntax-highlight.js");
      return highlightString(code, language);
    },
  });

  render() {
    return html`
      <div class="code-example">
        <div class="example-header">
          <span class="language-name">${this.language}</span>
          <mdn-copy-button
            .copiesFrom=${this._codeRef.value}
            variant="secondary"
          ></mdn-copy-button>
          ${this.liveSample?.breakoutLink
            ? html`<mdn-button
                variant="secondary"
                href=${this.liveSample?.breakoutLink}
                >Play</mdn-button
              >`
            : nothing}
        </div>
        <pre><code ${ref(this._codeRef)}>${this._highlightTask.render({
          initial: () => this.code,
          pending: () => this.code,
          complete: (highlighted) => unsafeHTML(highlighted),
        })}</code></pre>
      </div>
    `;
  }
}

customElements.define("mdn-code-example", MDNCodeExample);

/**
 * @param {Element} pre
 * @returns {MDNCodeExample | undefined}
 */
export function upgradePre(pre) {
  if (pre instanceof HTMLPreElement) {
    const example = pre.closest("div.code-example");
    const language =
      [...pre.classList].find((c) => LANGUAGE_CLASSES.has(c)) ||
      example?.querySelector(".language-name")?.textContent?.trim();
    const hidden = [...pre.classList].some(
      (c) => c === "hidden" || c.startsWith("interactive-example"),
    );
    const liveSampleClasses = [...pre.classList].filter(
      (c) => c.startsWith("live-sample___") || c.startsWith("live-sample---"),
    );
    const code = pre.querySelector("code")?.textContent;
    if (example && language && code) {
      const newExample = document.createElement("mdn-code-example");
      newExample.language = language;
      newExample.code = code;
      newExample.hidden = hidden;
      newExample.classList = [...liveSampleClasses].join(" ");
      example.replaceWith(newExample);
      return newExample;
    }
  }
  return;
}
