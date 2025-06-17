import { Task } from "@lit/task";
import { LitElement, html } from "lit";

import { upperCaseHeaderName } from "../observatory/utils.js";

import styles from "./element.css?lit";

export class MDNObservatoryHeaderLink extends LitElement {
  static styles = styles;

  static properties = {
    header: { type: String },
    _headerExists: { type: Boolean, state: true },
    _isChecking: { type: Boolean, state: true },
    _hasChecked: { type: Boolean, state: true },
  };

  constructor() {
    super();
    this.header = "";
    this._headerExists = false;
    this._isChecking = false;
    this._hasChecked = false;
  }

  // Task to check if the header documentation page exists
  _checkHeaderTask = new Task(this, {
    task: async ([header]) => {
      if (!header) return { exists: false };

      const displayHeaderName = upperCaseHeaderName(header);
      const headerPath = `/en-US/docs/Web/HTTP/Reference/Headers/${encodeURIComponent(displayHeaderName)}`;

      try {
        const response = await fetch(`${headerPath}/index.json`, {
          method: "HEAD",
        });
        return {
          exists: response.ok,
          displayHeaderName,
          headerPath,
        };
      } catch {
        return {
          exists: false,
          displayHeaderName,
          headerPath,
        };
      }
    },
    args: () => [this.header],
    onComplete: (result) => {
      this._headerExists = result.exists;
      this._isChecking = false;
      this._hasChecked = true;
    },
    onError: () => {
      this._headerExists = false;
      this._isChecking = false;
      this._hasChecked = true;
    },
  });

  connectedCallback() {
    super.connectedCallback();
    if (this.header && !this._hasChecked) {
      this._isChecking = true;
      this._checkHeaderTask.run();
    }
  }

  render() {
    const displayHeaderName = upperCaseHeaderName(this.header || "");

    if (this._isChecking || !this._hasChecked) {
      return html`${displayHeaderName}`;
    }

    if (this._headerExists) {
      const headerPath = `/en-US/docs/Web/HTTP/Reference/Headers/${encodeURIComponent(displayHeaderName)}`;
      return html`
        <a href=${headerPath} target="_blank" rel="noreferrer">
          ${displayHeaderName}
        </a>
      `;
    }

    return html`${displayHeaderName}`;
  }
}

customElements.define("mdn-observatory-header-link", MDNObservatoryHeaderLink);
