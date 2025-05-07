import { LitElement, css, html } from "lit";

// This is just a pass-through component for the image history on the about page.

export class MDNImageHistory extends LitElement {
  static styles = css``;

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define("mdn-image-history", MDNImageHistory);
