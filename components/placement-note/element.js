import { LitElement, html } from "lit";

import styles from "./element.css?lit";

class MDNPlacementNote extends LitElement {
  static styles = styles;

  render() {
    return html`<a
      href="/en-US/advertising"
      class="placement-note"
      data-glean="pong: pong-&gt;about"
      target="_blank"
      rel="noreferrer"
      >Ad</a
    >`;
  }
}

customElements.define("mdn-placement-note", MDNPlacementNote);
