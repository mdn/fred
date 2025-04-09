import { LitElement, css, html } from "lit";

/**
 * This is an indefinite progress bar that can be used to indicate that a process is ongoing. It is used in Observatory.
 * CSS variables:
 * --progress-color: The color of the progress bar. Default is #aaa
 * --border-radius: The border radius of the progress bar. Default is 0
 */
export class ProgressBar extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .progress-bar {
      width: 100%;
      height: 20px;
      background-color: var(--background-color, #eee);
      overflow: hidden;
      position: relative;
      border-radius: var(--border-radius, 0);
    }

    .progress-bar::before {
      content: "";
      position: absolute;
      top: 0;
      left: -200%;
      width: 200%;
      height: 100%;
      background: linear-gradient(
        to right,
        transparent 0%,
        var(--progress-color, #aaa) 50%,
        transparent 100%
      );
      animation: scan 2s infinite alternate ease-in-out;
    }

    @keyframes scan {
      from {
        left: -200%;
      }
      to {
        left: 100%;
      }
    }
  `;

  render() {
    return html`<div class="progress-bar"></div>`;
  }
}

customElements.define("mdn-progress-bar", ProgressBar);
