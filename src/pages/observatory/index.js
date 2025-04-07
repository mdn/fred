import { html } from "lit";

import { Footer } from "../../components/footer/index.js";
import { Navigation } from "../../components/navigation/index.js";
import { Landing } from "../../observatory/landing/index.js";
import { Results } from "../../observatory/results/index.js";

import "./index.css";
import "../../components/index.css";

/**
 *
 * @param {Fred.Context<Rari.SpaPage>} context
 * @returns {Lit.TemplateResult}
 */
export function ObservatoryBody(context) {
  return html`
    <body class="page-layout">
      <header class="page-layout__header">
        ${Navigation(context)} ${ObservatoryBreadCrumbs(context)}
      </header>
      <div class="page-layout__main">${Landing(context)}</div>
      <div class="page-layout__footer">${Footer(context)}</div>
    </body>
  `;
}

/**
 *
 * @param {Fred.Context<Rari.SpaPage>} context
 * @returns {Lit.TemplateResult}
 */
export function ObservatoryResults(context) {
  return html`
    <body class="page-layout">
      <header class="page-layout__header">
        ${Navigation(context)} ${ObservatoryBreadCrumbs(context)}
      </header>
      <div class="page-layout__main">${Results(context)}</div>
      <div class="page-layout__footer">${Footer(context)}</div>
    </body>
  `;
}

/**
 *
 * @param {Fred.Context<Rari.SpaPage>} _context
 * @returns {Lit.TemplateResult}
 */
export function ObservatoryBreadCrumbs(_context) {
  const items = [{ title: "HTTP Observatory", uri: "/en-US/observatory/" }].map(
    ({ uri, title }) =>
      html`<a class="breadcrumbs__link" href=${uri}> ${title} </a>
        <svg
          class="breadcrumbs__icon icon"
          width="16"
          height="16"
          viewBox="0 0 320 512"
        >
          <path
            d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
          />
        </svg> `,
  );

  return html`<div class="breadcrumbs">
    <div class="breadcrumbs__path">${items}</div>
    <div class="breadcrumbs__collection">Collection</div>
    <div class="breadcrumbs__language">Language</div>
  </div>`;
}
