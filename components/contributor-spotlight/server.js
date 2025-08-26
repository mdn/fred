import { html, nothing } from "lit";

import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { Button } from "../button/server.js";
import { ContentSection } from "../content-section/server.js";
import arrowRightIcon from "../icon/arrow-right.svg?lit";
import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class ContributorSpotlight extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").ContributorSpotlightPage>} context
   */
  render(context) {
    const { hyData } = context;

    // Render quote component inline since we don't have a separate Quote component
    const renderQuote = (
      /** @type {string} */ name,
      /** @type {string} */ quote,
    ) => html`
      <blockquote class="quote">
        <h4 class="name">${name}</h4>
        <p class="text">
          <span class="icon icon-quote"></span>
          ${quote}
        </p>
      </blockquote>
    `;

    // Render GetInvolved component inline
    const renderGetInvolved = () => html`
      <div class="get-involved-container">
        <section class="get-involved">
          <h2>${context.l10n`Want to be part of the journey?`}</h2>
          <p>
            ${context.l10n`Our constant quest for innovation starts here, with you. Every part of MDN (docs, demos and the site itself) springs from our incredible open community of developers. Please join us!`}
          </p>
          ${Button.render(context, {
            label: context.l10n`Get involved`,
            href: `/${context.locale}/community/`,
            icon: arrowRightIcon,
            iconPosition: "after",
            variant: "primary",
            action: "positive",
          })}
        </section>
      </div>
    `;

    const header = html`
      <h1 class="trailing-underscore">${context.l10n`Contributor profile`}</h1>
    `;

    const baseUrl = context.url;

    return PageLayout.render(
      context,
      html`
        <div class="contributor-spotlight-container">
          <main class="contributor-spotlight">
            ${header}
            <section class="profile-header">
              <img
                class="profile-image"
                src=${`${baseUrl}/${hyData.profileImg}`}
                alt=${hyData.profileImgAlt}
                width="200"
                height="200"
              />
              <a
                class="username"
                href="https://github.com/${hyData.usernames.github}"
              >
                @${hyData.usernames.github}
              </a>
            </section>

            ${hyData.sections && hyData.sections[0]
              ? html`<section>
                  ${unsafeHTML(hyData.sections[0].value.content)}
                </section>`
              : nothing}
            ${hyData.quote
              ? renderQuote(hyData.contributorName, hyData.quote)
              : nothing}
            ${hyData.sections && hyData.sections.length > 1
              ? hyData.sections
                  .slice(1)
                  .map((section) => ContentSection.render(context, section))
              : nothing}
          </main>
        </div>
        ${renderGetInvolved()}
      `,
    );
  }
}
