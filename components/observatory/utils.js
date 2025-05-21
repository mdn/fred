import { html } from "lit";

import failSvg from "./assets/fail-icon.svg?lit";
import passSvg from "./assets/pass-icon.svg?lit";

/**
 *
 * @param {string} host
 * @param {import("types/observatory.js").Result} result
 * @returns
 */
export function hostAsRedirectChain(host, result) {
  const chain = result.tests.redirection?.route;
  if (!chain || chain.length === 0) {
    return host;
  }
  try {
    const firstUrl = new URL(chain[0] || "");
    const lastUrl = new URL(chain.at(-1) || "");
    if (firstUrl.hostname === lastUrl.hostname) {
      return host;
    }
    return `${firstUrl.hostname} → ${lastUrl.hostname}`;
  } catch {
    return host;
  }
}

/**
 *
 * @param {string | null | undefined} term
 * @returns {null | string}
 */
export function formatMinus(term) {
  if (!term) {
    return null;
  }
  // replace dash with unicode minus symbol
  // −
  // MINUS SIGN
  // Unicode: U+2212, UTF-8: E2 88 92
  return `${term}`.replaceAll("-", "−");
}

/**
 *
 * @param {Date} date
 * @returns {string}
 */
export function formatDateTime(date) {
  return date.toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "medium",
  });
}

// Breakpoints for humanized time durations
const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30;
const YEAR = DAY * 364;

/**
 *
 * @param {Date} date
 * @returns {string}
 */
export function humanizedDurationFromNow(date) {
  const currentTime = Date.now();
  const targetTime = date.getTime();
  const diffSecs = Math.round((targetTime - currentTime) / 1000);

  const rtf = new Intl.RelativeTimeFormat("en", { style: "long" });
  const absSecs = Math.abs(diffSecs);

  if (absSecs < MINUTE) {
    return diffSecs < 0 ? "Just now" : "Very soon";
  } else if (absSecs < HOUR) {
    return rtf.format(Math.floor(diffSecs / MINUTE), "minute");
  } else if (absSecs < DAY) {
    return rtf.format(Math.floor(diffSecs / HOUR), "hour");
  } else if (absSecs < MONTH) {
    return rtf.format(Math.floor(diffSecs / DAY), "day");
  } else if (absSecs < YEAR) {
    return rtf.format(Math.floor(diffSecs / MONTH), "month");
  } else {
    return rtf.format(Math.floor(diffSecs / YEAR), "year");
  }
}

/**
 * @param {{pass: boolean | null}} props
 * @returns {import("types/lit.js").TemplateResult}
 */
export function PassIcon({ pass }) {
  if (pass === null) {
    return html`-`;
  }
  return html`
    <span class="obs-pass-icon">
      ${pass ? html`${passSvg}` : html`${failSvg}`}
      <span class="visually-hidden">${pass ? "Passed" : "Failed"}</span>
    </span>
  `;
}

/**
 * @param {{expires: string}} props
 * @returns {import("types/lit.js").TemplateResult}
 */
export function Timestamp({ expires }) {
  const d = new Date(expires);
  if (d.toString() === "Invalid Date") {
    return html`<div class="iso-date">{expires}</div>`;
  }
  const ts = d
    .toISOString()
    .replace("T", " ")
    .replace(/\....Z/, " UTC");
  return html`
    <div class="iso-date">
      <code>${ts}</code>
    </div>
    <div class="humanized-duration">(${humanizedDurationFromNow(d)})</div>
  `;
}

/**
 * Capitalizes header names, i.e. `content-type` -> `Content-Type`
 * @param {string} input
 * @returns {string}
 */
export function upperCaseHeaderName(input) {
  return input
    .split("-")
    .map((p) => (p && p[0] ? p[0].toUpperCase() + p.slice(1) : ""))
    .join("-");
}

/**
 * Returns the cookie prefix, either "Host" or "Secure" if prefixed accordingly (`__host` & `__secure`),
 * or "-" if no prefix is present.
 * @param {{cookieName: string}} props
 * @returns {import("types/lit.js").TemplateResult}
 */
export function CookiePrefix({ cookieName }) {
  if (cookieName.startsWith("__Host-")) {
    return html`<code>Host</code>`;
  } else if (cookieName.startsWith("__Secure-")) {
    return html`<code>Secure</code>`;
  } else {
    return html`-`;
  }
}

/**
 * Link to a header documentation page inside MDN content
 * @param {{header: string}} props
 * @returns {import("types/lit.js").TemplateResult}
 */
export function HeaderLink({ header }) {
  const displayHeaderName = upperCaseHeaderName(header);
  const headerPath = `/en-US/docs/Web/HTTP/Headers/${encodeURIComponent(
    displayHeaderName,
  )}`;

  // Simple approach: always show the link, it will 404 if the page doesn't exist
  // Alternative: you could maintain a list of known valid headers
  return html`
    <a href=${headerPath} target="_blank" rel="noreferrer">
      ${displayHeaderName}
    </a>
  `;
}
