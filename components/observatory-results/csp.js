import { html } from "lit";

import { PassIcon } from "../observatory/utils.js";

/** @type {(keyof import("@observatory").CSPPolicy)[]} */
const policyTests = [
  "unsafeInline",
  "unsafeEval",
  "unsafeObjects",
  "unsafeInlineStyle",
  "insecureSchemeActive",
  "insecureSchemePassive",
  "antiClickjacking",
  "defaultNone",
  "insecureBaseUri",
  "insecureFormAction",
  "strictDynamic",
];

// Policies where pass means bad
const negatedPolicies = new Set([
  "insecureBaseUri",
  "insecureFormAction",
  "insecureSchemeActive",
  "insecureSchemePassive",
  "unsafeEval",
  "unsafeInline",
  "unsafeInlineStyle",
  "unsafeObjects",
]);

/**
 *
 * @param {{result: import("@observatory").Result}} props
 * @returns { import("@lit").TemplateResult }
 */
export function CSP({ result }) {
  const policy = result.tests["content-security-policy"]?.policy;
  const pass = result.tests["content-security-policy"]?.pass || false;

  if (!policy) {
    if (
      result.tests["content-security-policy"]?.result ===
      "csp-not-implemented-but-reporting-enabled"
    ) {
      return html`
        <table class="csp">
          <tbody>
            <tr>
              <td>
                <p>
                  <code>Content-Security-Policy-Report-Only</code> header
                  detected. Implement an enforced policy; see
                  <a href="/en-US/docs/Web/HTTP/CSP" target="_blank">
                    MDN's Content Security Policy (CSP) documentation </a
                  >.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      `;
    }

    return html`
      <table class="csp">
        <tbody>
          <tr>
            <td>
              <p>No CSP headers detected</p>
            </td>
          </tr>
        </tbody>
      </table>
    `;
  }

  const rows = policyTests.map((pt) => {
    if (!policy[pt]) return null;
    /** @type {import("@observatory").PolicyItem} */
    const p = policy[pt];

    return html`
      <tr>
        <td data-header="Test" .innerHTML=${p.description}></td>
        <td data-header="Pass">
          ${PassIcon({
            pass: negatedPolicies.has(pt) ? !p.pass : p.pass,
          })}
        </td>
        <td data-header="Info" .innerHTML=${p.info}></td>
      </tr>
    `;
  });

  return html`
    <div class="detail-header">
      <p class="arrow">${PassIcon({ pass })}</p>
      <div
        class="detail-header-content"
        .innerHTML=${result.tests["content-security-policy"]
          ?.score_description ?? `<p class="obs-none">None</p>`}
      ></div>
    </div>

    <table class="csp">
      <thead>
        <tr>
          <th>Test</th>
          <th>Result</th>
          <th>Info</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}
