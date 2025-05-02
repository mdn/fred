import { Task } from "@lit/task";
import { LitElement, html } from "lit";
import { createRef, ref } from "lit/directives/ref.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import "../copy-button/element.js";
import styles from "./element.css?lit";

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
    const language = [...pre.classList].find((c) => LANGUAGE_CLASSES.has(c));
    const hidden = [...pre.classList].some(
      (c) => c === "hidden" || c.startsWith("interactive-example"),
    );
    const code = pre.querySelector("code")?.textContent;
    if (example && language && code) {
      const newExample = document.createElement("mdn-code-example");
      newExample.language = language;
      newExample.code = code;
      newExample.hidden = hidden;
      example.replaceWith(newExample);
      return newExample;
    }
  }
  return;
}
