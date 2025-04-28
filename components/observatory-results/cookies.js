import { html } from "lit";

import {
  CookiePrefix,
  PassIcon,
  Timestamp,
  upperCaseHeaderName,
} from "../observatory/utils.js";

/**
 *
 * @param {{result: Observatory.Result}} props
 * @returns { Lit.TemplateResult }
 */
export function Cookies({ result }) {
  const cookies = result.tests["cookies"]?.data;
  const pass = result.tests["cookies"]?.pass;

  if (!cookies || Object.keys(cookies).length === 0) {
    return html`
      <table class="cookies">
        <tbody>
          <tr>
            <td>No cookies detected</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  const rows = Object.entries(cookies).map(
    ([key, value]) => html`
      <tr>
        <td data-header="Name" class="cookie-name">${key}</td>
        <td data-header="Expires">
          ${value.expires ? Timestamp({ expires: value.expires }) : "Session"}
        </td>
        <td data-header="Path">
          <code>${value.path}</code>
        </td>
        <td data-header="Secure">${PassIcon({ pass: value.secure })}</td>
        <td data-header="HttpOnly">${PassIcon({ pass: value.httponly })}</td>
        <td data-header="SameSite">
          ${value.samesite
            ? html`<code>${upperCaseHeaderName(value.samesite)}</code>`
            : "-"}
        </td>
        <td data-header="Prefixed">${CookiePrefix({ cookieName: key })}</td>
      </tr>
    `,
  );

  return html`
    <div class="detail-header">
      <p class="arrow">
        ${PassIcon({ pass: pass === undefined ? null : pass })}
      </p>
      <div
        class="detail-header-content"
        .innerHTML=${result.tests["cookies"]?.score_description ??
        `<p class="obs-none">None</p>`}
      ></div>
    </div>
    <table class="cookies">
      <thead>
        <tr>
          <th>Name</th>
          <th>
            <a
              target="_blank"
              href="/en-US/docs/Web/Security/Practical_implementation_guides/Cookies#expires"
              >Expires</a
            >
          </th>
          <th>
            <a
              target="_blank"
              href="/en-US/docs/Web/Security/Practical_implementation_guides/Cookies#path"
              >Path</a
            >
          </th>
          <th>
            <a
              target="_blank"
              href="/en-US/docs/Web/Security/Practical_implementation_guides/Cookies#secure"
              >Secure</a
            >
          </th>
          <th>
            <a
              target="_blank"
              href="/en-US/docs/Web/Security/Practical_implementation_guides/Cookies#httponly"
              >HttpOnly</a
            >
          </th>
          <th>
            <a
              target="_blank"
              href="/en-US/docs/Web/Security/Practical_implementation_guides/Cookies#samesite"
              >SameSite</a
            >
          </th>
          <th>
            <a
              target="_blank"
              href="/en-US/docs/Web/Security/Practical_implementation_guides/Cookies#name"
              >Prefix</a
            >
          </th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}
