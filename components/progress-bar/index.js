import { LitElement, css, html } from "lit";

export class ProgressBar extends LitElement {
  static styles = css``;

  render() {
    return html`<progress>Yeah</progress>`;
  }
}

customElements.define("mdn-progress-bar", ProgressBar);
