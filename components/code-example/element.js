import { Task } from "@lit/task";
import { LitElement, html } from "lit";
import { createRef, ref } from "lit/directives/ref.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import "../copy-button/element.js";
import styles from "./element.css?lit";

export class MDNCodeExample extends LitElement {
  static styles = styles;

  static properties = {
    _code: { state: true },
  };

  constructor() {
    super();
    this.language = "";
    this._code = "";
  }

  _codeRef = createRef();

  /** @param {Event} event */
  _slotchange({ target }) {
    if (target instanceof HTMLSlotElement) {
      this._code = target
        .assignedNodes({ flatten: true })
        .map((node) => node.textContent || "")
        .join("");
    }
  }

  _highlightTask = new Task(this, {
    args: () => [this.language, this._code],
    task: async ([language, code]) => {
      const { highlightString } = await import("./syntax-highlight.js");
      return highlightString(code, language);
    },
  });

  render() {
    return html`
      <div class="wrapper">
        <div class="header">
          ${this.language}
          <mdn-copy-button .copiesFrom=${this._codeRef.value}></mdn-copy-button>
        </div>
        <pre><code ${ref(this._codeRef)}>${this._highlightTask.render({
          initial: () => this._code,
          pending: () => this._code,
          complete: (highlighted) => unsafeHTML(highlighted),
        })}</code></pre>
      </div>
      <slot hidden @slotchange=${this._slotchange}></slot>
    `;
  }
}

customElements.define("mdn-code-example", MDNCodeExample);
