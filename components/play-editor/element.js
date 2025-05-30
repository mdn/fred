import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { css as langCSS } from "@codemirror/lang-css";
import { html as langHTML } from "@codemirror/lang-html";
import { javascript as langJS } from "@codemirror/lang-javascript";
import { wast as langWat } from "@codemirror/lang-wast";
import { bracketMatching, indentOnInput } from "@codemirror/language";
import { lintKeymap } from "@codemirror/lint";
import { EditorState, StateEffect } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { highlightActiveLine, keymap, lineNumbers } from "@codemirror/view";
import { EditorView, minimalSetup } from "codemirror";

import { LitElement, html } from "lit";

import { ThemeController } from "../color-theme/controller.js";

import styles from "./element.css?lit";

/** @import { PropertyValues } from "lit" */

export class MDNPlayEditor extends LitElement {
  static properties = {
    language: { type: String },
    minimal: { type: Boolean },
    value: { attribute: false },
    delay: { type: Number },
  };

  static styles = styles;

  /** @type {EditorView | undefined} */
  _editor;

  /** @type {NodeJS.Timeout | number} */
  _updateTimer = -1;

  constructor() {
    super();
    this.theme = new ThemeController(this);
    this.language = "";
    this.minimal = false;
    this._value = "";
    this.delay = 1000;
  }

  /** @param {string} value */
  set value(value) {
    this._value = value;
    if (this._editor) {
      let state = EditorState.create({
        doc: value,
        extensions: this._extensions(),
      });
      this._editor.setState(state);
    }
    this.dispatchEvent(new Event("update", { bubbles: true, composed: true }));
  }

  get value() {
    return this._editor ? this._editor.state.doc.toString() : this._value;
  }

  focus() {
    this._editor?.focus();
  }

  _extensions() {
    const language = (() => {
      switch (this.language) {
        case "js":
          return [langJS()];
        case "html":
          return [langHTML()];
        case "css":
          return [langCSS()];
        case "wat":
          return [langWat()];
        default:
          return [];
      }
    })();

    return [
      minimalSetup,
      bracketMatching(),
      closeBrackets(),
      ...(this.minimal
        ? []
        : [
            lineNumbers(),
            indentOnInput(),
            autocompletion(),
            highlightActiveLine(),
            keymap.of([
              ...closeBracketsKeymap,
              ...defaultKeymap,
              ...completionKeymap,
              ...lintKeymap,
              indentWithTab,
            ]),
            EditorView.lineWrapping,
          ]),
      ...(this.theme.value === "dark" ? [oneDark] : []),
      ...language,
      EditorView.focusChangeEffect.of((_, focusing) => {
        this.dispatchEvent(
          new Event(focusing ? "focus" : "blur", {
            bubbles: true,
            composed: true,
          }),
        );
        return null;
      }),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          if (this._updateTimer !== -1) {
            clearTimeout(this._updateTimer);
          }
          this._updateTimer = globalThis?.setTimeout(() => {
            this._updateTimer = -1;
            this.dispatchEvent(
              new Event("update", { bubbles: true, composed: true }),
            );
          }, this.delay);
        }
      }),
    ];
  }

  async format() {
    const prettier = await import("prettier/standalone");
    const config = (() => {
      switch (this.language) {
        case "js":
          return {
            parser: "babel",
            plugins: [
              import("prettier/plugins/babel"),
              import("prettier/plugins/estree"),
            ],
          };
        case "html":
          return {
            parser: "html",
            plugins: [
              import("prettier/plugins/html"),
              import("prettier/plugins/postcss"),
              import("prettier/plugins/babel"),
              import("prettier/plugins/estree"),
            ],
          };
        case "css":
          return {
            parser: "css",
            plugins: [import("prettier/plugins/postcss")],
          };
        default:
          return;
      }
    })();
    if (config) {
      const plugins = await Promise.all(config.plugins);
      const unformatted = this.value;
      const formatted = await prettier.format(unformatted, {
        parser: config.parser,
        plugins: /** @type {import("prettier").Plugin[]} */ (plugins),
      });
      if (this.value === unformatted && unformatted !== formatted) {
        this.value = formatted;
      }
    }
  }

  /** @param {PropertyValues} changedProperties */
  willUpdate(changedProperties) {
    if (
      changedProperties.has("language") ||
      changedProperties.has("ThemeController.value")
    ) {
      this._editor?.dispatch({
        effects: StateEffect.reconfigure.of(this._extensions()),
      });
    }
  }

  render() {
    return html`<div
      class=${this.minimal ? "editor minimal" : "editor"}
    ></div>`;
  }

  firstUpdated() {
    let startState = EditorState.create({
      doc: this._value,
      extensions: this._extensions(),
    });
    this._editor = new EditorView({
      state: startState,
      parent: this.renderRoot.querySelector("div") || undefined,
    });
  }
}

customElements.define("mdn-play-editor", MDNPlayEditor);
