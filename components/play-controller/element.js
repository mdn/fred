import { LitElement, css, html } from "lit";

/** @import { VConsole } from "../play-console/types.js" */

export class MDNPlayController extends LitElement {
  static properties = {
    runOnStart: { type: Boolean, attribute: "run-on-start" },
    runOnChange: { type: Boolean, attribute: "run-on-change" },
    srcPrefix: { attribute: false },
  };

  static styles = css`
    :host {
      display: contents;
    }
  `;

  constructor() {
    super();
    this.runOnStart = false;
    this.runOnChange = false;
    this.srcPrefix = "";
    /** @type {Record<string, string>} */
    this._code = {};
    /** @type {Record<string, string>} */
    this._hiddenCode = {};
  }

  /** @param {Record<string, string>} code */
  set code(code) {
    this._code = Object.fromEntries(
      Object.entries(code).filter(
        ([language]) => !language.endsWith("-hidden"),
      ),
    );
    this._hiddenCode = Object.fromEntries(
      Object.entries(code)
        .filter(([language]) => language.endsWith("-hidden"))
        .map(([language, value]) => [language.replace(/-hidden$/, ""), value]),
    );
    if (!this.initialCode) {
      this.initialCode = code;
    }
    const editors = this.querySelectorAll("mdn-play-editor");
    for (const editor of editors) {
      const language = editor.language;
      if (language) {
        const value = code[language];
        editor.value = value ?? "";
      }
    }
    if (this.runOnStart) {
      this.run();
    }
  }

  get code() {
    const code = { ...this._code };
    const editors = this.querySelectorAll("mdn-play-editor");
    for (const editor of editors) {
      const language = editor.language;
      if (language) {
        code[language] = editor.value;
      }
    }
    for (const [language, value] of Object.entries(this._hiddenCode)) {
      code[language] = code[language] ? `${value}\n${code[language]}` : value;
    }
    return code;
  }

  async format() {
    try {
      await Promise.all(
        [...this.querySelectorAll("mdn-play-editor")].map((e) => e.format()),
      );
    } catch (error) {
      console.error(error);
    }
  }

  run() {
    this.querySelector("mdn-play-console")?.vconsole.clear();
    const runner = this.querySelector("mdn-play-runner");
    if (runner) {
      runner.srcPrefix = this.srcPrefix;
      runner.code = this.code;
    }
  }

  reset() {
    this.code = this.initialCode ?? {};
    if (this.runOnStart) {
      this.run();
    } else {
      this.querySelector("mdn-play-console")?.vconsole.clear();
      const runner = this.querySelector("mdn-play-runner");
      if (runner) {
        runner.code = undefined;
      }
    }
  }

  clear() {
    this.runOnChange = true;
    this.initialCode = undefined;
    this.srcPrefix = "";
    this.reset();
  }

  _onEditorUpdate() {
    if (this.runOnChange) {
      this.run();
    }
  }

  /** @param {CustomEvent<VConsole>} ev */
  _onConsole(ev) {
    this.querySelector("mdn-play-console")?.onConsole(ev);
  }

  render() {
    return html`
      <slot @update=${this._onEditorUpdate} @console=${this._onConsole}></slot>
    `;
  }
}

customElements.define("mdn-play-controller", MDNPlayController);
