import { LitElement } from "lit";
import { createRef } from "lit/directives/ref.js";

import { gleanClick } from "../../utils/glean.js";
import { upgradePre } from "../code-example/element.js";

import styles from "./element.css?lit";
import { InteractiveExampleWithChoices } from "./with-choices.js";
import { InteractiveExampleWithConsole } from "./with-console.js";
import { InteractiveExampleWithTabs } from "./with-tabs.js";

/**
 * @import { Ref } from 'lit/directives/ref.js';
 * @import { MDNPlayController } from "../play-controller/element.js";
 * @import { MDNPlayRunner } from "../play-runner/element.js";
 */

const GLEAN_EVENT_TYPES = ["focus", "copy", "cut", "paste", "click"];

// eslint-disable-next-line fred/custom-element-name
export class InteractiveExampleBase extends LitElement {
  static ssr = false;

  static properties = { name: { type: String } };

  static styles = styles;

  constructor() {
    super();
    this.name = "";
    /** @type {string[]} */
    this._languages = [];
    /** @type {Record<string, string>} */
    this._code = {};
  }

  /** @type {Ref<MDNPlayController>} */
  _controller = createRef();
  /** @type {Ref<MDNPlayRunner>} */
  _runner = createRef();

  _run() {
    this._controller.value?.run();
  }

  _reset() {
    this._controller.value?.reset();
  }

  _initialCode() {
    /** @type {Record<string, string>} */
    const initialCode = {};
    for (const pre of this.closest("section")?.querySelectorAll(
      ".code-example pre.interactive-example",
    ) ?? []) {
      const example = upgradePre(pre);
      if (example) {
        const { language, code } = example;
        initialCode[language] = initialCode[language]
          ? `${initialCode[language]}\n${code}`
          : code;
      }
    }

    this._choices = [
      ...(this.closest("section")?.querySelectorAll(
        ".code-example pre.interactive-example-choice",
      ) || []),
    ]
      .map((pre) => upgradePre(pre)?.code.trim())
      .filter((x) => x !== undefined);

    this._languages = Object.keys(initialCode);
    this._template =
      this._choices.length > 0
        ? "choices"
        : (this._languages.length === 1 && this._languages[0] === "js") ||
            (this._languages.includes("js") && this._languages.includes("wat"))
          ? "console"
          : "tabbed";

    return initialCode;
  }

  /** @param {string} lang */
  _langName(lang) {
    switch (lang) {
      case "js":
        return "JavaScript";
      default:
        return lang.toUpperCase();
    }
  }

  /** @param {Event} ev  */
  _telemetryHandler(ev) {
    let action = ev.type;
    if (
      ev.type === "click" &&
      ev.target instanceof HTMLElement &&
      ev.target.id
    ) {
      action = `click@${ev.target.id}`;
    }
    gleanClick(`interactive-example: ${action}`);
  }

  connectedCallback() {
    super.connectedCallback();
    this._telemetryHandler = this._telemetryHandler.bind(this);
    for (const type of GLEAN_EVENT_TYPES) {
      this.renderRoot.addEventListener(type, this._telemetryHandler);
    }
    this._code = this._initialCode();
  }

  firstUpdated() {
    if (this._controller.value) {
      this._controller.value.code = this._code;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    for (const type of GLEAN_EVENT_TYPES) {
      this.renderRoot.removeEventListener(type, this._telemetryHandler);
    }
  }
}

export class MDNInteractiveExample extends InteractiveExampleWithChoices(
  InteractiveExampleWithTabs(
    InteractiveExampleWithConsole(InteractiveExampleBase),
  ),
) {}

// TODO: rari outputs <interactive-example> rather than <mdn-interactive-example>
// customElements.define("mdn-interactive-example", MDNInteractiveExample);
customElements.define("interactive-example", MDNInteractiveExample);
