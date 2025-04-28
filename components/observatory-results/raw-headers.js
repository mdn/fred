import { html } from "lit";

import { HeaderLink } from "../observatory/utils.js";

/**
 *
 * @param {{result: Observatory.Result}} props
 * @returns { Lit.TemplateResult }
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

  const rows = Object.entries(result.scan.response_headers).map(
    ([header, value]) => html`
      <tr>
        <td data-header="Header">${HeaderLink({ header })}</td>
        <td data-header="Value">${value}</td>
      </tr>
    `,
  );

  return html`
    <table class="headers">
      <thead>
        <tr>
          <th>Header</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}
