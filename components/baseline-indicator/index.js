import { html } from "lit";

/**
 *
 * @param {Rari.Baseline} status
 */
export function BaselineIndicator(status) {
  return html`<details class="baseline-indicator ${status.baseline}">
    <summary>Baseline</summary>
  </details>`;
}
