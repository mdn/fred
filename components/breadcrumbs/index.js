import { html, nothing } from "lit";

import "./index.css";

/**
 * @param {Fred.Context} context
 */
export function BreadCrumbs(context) {
  const isDoc = context.renderer === "Doc";
  const colorScheme = context.renderer === "Homepage" ? "dark" : "";

  const items = isDoc
    ? context.doc.parents.map(
        ({ uri, title }, index) =>
          html`${index > 0
              ? html`<li aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 320 512">
                    <path
                      fill="currentColor"
                      d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                    />
                  </svg>
                </li>`
              : nothing}
            <li><a href=${uri}>${title}</a></li>`,
      )
    : nothing;

  return html`<div class="breadcrumbs" data-scheme=${colorScheme}>
    <ul>
      ${items}
    </ul>
    <mdn-color-theme></mdn-color-theme>
    <div class="breadcrumbs__collection">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.41603 11.376L8 11.0986L7.58397 11.376L2.75 14.5986V2C2.75 1.30964 3.30964 0.75 4 0.75H12C12.6904 0.75 13.25 1.30964 13.25 2V14.5986L8.41603 11.376Z"
          stroke="#4E4E4E"
          stroke-width="1.5"
        />
      </svg>
      Save
    </div>
    <div class="breadcrumbs__language">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="8" r="7.25" stroke="#4E4E4E" stroke-width="1.5" />
        <path
          d="M8 15.25C7.7649 15.25 7.48181 15.1442 7.15894 14.8321C6.83246 14.5165 6.50419 14.0235 6.21224 13.3562C5.62932 12.0239 5.25 10.1307 5.25 8C5.25 5.86928 5.62932 3.97615 6.21224 2.64376C6.50419 1.97645 6.83246 1.48352 7.15894 1.16789C7.48181 0.855751 7.7649 0.75 8 0.75C8.2351 0.75 8.51819 0.855751 8.84106 1.16789C9.16754 1.48352 9.49581 1.97645 9.78776 2.64376C10.3707 3.97615 10.75 5.86928 10.75 8C10.75 10.1307 10.3707 12.0239 9.78776 13.3562C9.49581 14.0235 9.16754 14.5165 8.84106 14.8321C8.51819 15.1442 8.2351 15.25 8 15.25Z"
          stroke="#4E4E4E"
          stroke-width="1.5"
        />
        <line
          x1="1"
          y1="5.75"
          x2="15"
          y2="5.75"
          stroke="#4E4E4E"
          stroke-width="1.5"
        />
        <line
          x1="1"
          y1="10.25"
          x2="15"
          y2="10.25"
          stroke="#4E4E4E"
          stroke-width="1.5"
        />
      </svg>
      English (US)
    </div>
  </div>`;
}
