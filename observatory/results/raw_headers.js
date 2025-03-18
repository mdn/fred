import { html } from "lit-html";
import { HeaderLink } from "../utils";

/**
 * @typedef {import("lit").TemplateResult} TemplateResult
 * @typedef {import('../constants').ObservatoryResult} ObservatoryResult
 */

/**
 *
 * @param {{result: ObservatoryResult}} props
 * @returns { TemplateResult }
 */
export function RawHeaders({ result }) {
  if (!result.scan.response_headers) {
    return html`
      <table class="headers">
        <tbody>
          <tr>
            <td>No headers detected</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  return html`
    <table class="headers">
      <thead>
        <tr>
          <th>Header</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(result.scan.response_headers).map(
          ([header, value]) => html`
            <tr>
              <td data-header="Header">${HeaderLink({ header })}</td>
              <td data-header="Value">${value}</td>
            </tr>
          `
        )}
      </tbody>
    </table>
  `;
}
