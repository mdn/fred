import { LitElement, html } from "lit";

import { styleMap } from "lit/directives/style-map.js";

import styles from "./element.css?lit";
import "../play-runner/element.js";

export class MDNLiveSampleResult extends LitElement {
  static styles = styles;

  static properties = {
    code: { type: Object },
    allowed: {},
    sandbox: {},
    srcPrefix: { attribute: "src-prefix" },
    height: {},
  };

  constructor() {
    super();
    this.code = {};
    /** @type {string | undefined} */
    this.allow = undefined;
    /** @type {string | undefined} */
    this.sandbox = undefined;
    /** @type {string | undefined} */
    this.srcPrefix = undefined;
    /** @type {string | undefined} */
    this.height = undefined;
  }

  render() {
    return html`
      <div class="code-example">
        <div class="example-header"></div>
        <mdn-play-runner
          .code=${this.code}
          .allow=${this.allow}
          .sandbox=${this.sandbox}
          .srcPrefix=${this.srcPrefix}
          style=${styleMap({
            height: this.height ? this.height + "px" : undefined,
          })}
        ></mdn-play-runner>
      </div>
    `;
  }
}

customElements.define("mdn-live-sample-result", MDNLiveSampleResult);
