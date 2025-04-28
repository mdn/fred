import { LitElement, html } from "lit";

import styles from "./index.css?lit";

/**
 * This is an indefinite progress bar that can be used to indicate that a process is ongoing. It is used in Observatory.
 * CSS variables:
 * --progress-color: The color of the progress bar. Default is #aaa
 * --border-radius: The border radius of the progress bar. Default is 0
 */
export class MDNProgressBar extends LitElement {
  static styles = styles;

  render() {
    return html`<div class="progress-bar"></div>`;
  }
}

customElements.define("mdn-progress-bar", MDNProgressBar);
