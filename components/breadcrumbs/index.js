import { html, nothing } from "lit";

import "./index.css";

/**
 * @param {Fred.Context} context
 */
export function BreadCrumbs(context) {
  if (!("doc" in context)) {
    return nothing;
  }

  const { parents } = context.doc;

  if (!parents) {
    return nothing;
  }

  const items = parents.map(
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
  );

  return html`<div class="breadcrumbs">
    <ul>
      ${items}
    </ul>
    <div class="breadcrumbs__collection">Collection</div>
    <div class="breadcrumbs__language">Language</div>
  </div>`;
}
