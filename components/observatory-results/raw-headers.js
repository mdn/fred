import { html } from "lit";

import { headerLink } from "../observatory/utils.js";

import "../observatory-header-link/element.js";

/**
 *
 * @param {{result: import("@observatory").Result}} props
 * @returns { import("@lit").TemplateResult }
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
        <td data-header="Header">
          <mdn-observatory-header-link header=${header}>
            ${headerLink(header)}
          </mdn-observatory-header-link>
        </td>
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
