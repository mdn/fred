import { LitElement, html } from "lit";

import styles from "./element.css?lit";
import { formatOutput } from "./utils.js";

/** @import { VConsole } from "./types.js" */

/** @implements {Partial<Console>} */
class VirtualConsole {
  #host;

  /** @param {MDNPlayConsole} host  */
  constructor(host) {
    this.#host = host;
  }

  clear() {
    this.#host._messages = [];
  }

  /** @param {...any} args */
  debug(...args) {
    return this.log(...args);
  }

  /** @param {...any} args */
  error(...args) {
    return this.log(...args);
  }

  /** @param {...any} args */
  info(...args) {
    return this.log(...args);
  }

  /** @param {...any} args */
  log(...args) {
    if (args.length > 1 && typeof args[0] === "string") {
      // https://developer.mozilla.org/en-US/docs/Web/API/console#using_string_substitutions
      // TODO: add unit testing of this
      args[0] = args[0].replaceAll(
        /%(?:\.([0-9]+))?(.)/g,
        (match, formatArg, format) => {
          switch (format) {
            case "o":
            case "O": {
              const O = args.splice(1, 1)[0];
              return formatOutput(O);
            }
            case "d":
            case "i": {
              const i = args.splice(1, 1)[0];
              return Math.trunc(i).toFixed(0).padStart(formatArg, "0");
            }
            case "s": {
              const s = args.splice(1, 1)[0];
              return s.toString();
            }
            case "f": {
              const f = args.splice(1, 1)[0];
              return (typeof f === "number" ? f : Number.parseFloat(f)).toFixed(
                formatArg ?? 6,
              );
            }
            case "c":
              // TODO: Not implemented yet, so just remove the argument
              args.splice(1, 1);
              return "";
            case "%":
              return "%";
            default:
              return match;
          }
        },
      );
    }
    this.#host._messages = [
      ...this.#host._messages,
      args.map((x) => formatOutput(x)).join(" "),
    ];
  }

  /** @param {...any} args */
  warn(...args) {
    return this.log(...args);
  }
}

export class MDNPlayConsole extends LitElement {
  static properties = {
    _messages: { state: true },
  };

  static styles = styles;

  constructor() {
    super();
    this.vconsole = new VirtualConsole(this);
    /** @type {string[]} */
    this._messages = [];
  }

  /** @param {CustomEvent<VConsole>} e */
  onConsole({ detail }) {
    if (detail.prop in this.vconsole) {
      const prop = /** @type {keyof typeof this.vconsole} */ (detail.prop);
      detail.args ? this.vconsole[prop](...detail.args) : this.vconsole[prop]();
    } else {
      this.vconsole.warn(
        "[Playground] Unsupported console message (see browser console)",
      );
    }
  }

  render() {
    return html`
      <ul aria-live="polite">
        ${this._messages.map(
          (message) => html`<li><code>${message}</code></li>`,
        )}
      </ul>
    `;
  }

  updated() {
    this.scrollTo({ top: this.scrollHeight });
  }
}

customElements.define("mdn-play-console", MDNPlayConsole);
