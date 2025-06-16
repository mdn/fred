import { html, nothing } from "lit";

import Button from "../button/pure.js";
import { ServerComponent } from "../server/index.js";

import contributorPng from "./mdn_contributor.png?url";

export class HomepageContributorSpotlight extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").HomePage>} context
   */
  render(context) {
    const { featuredContributor: contributor } = context.hyData;

    if (!contributor) {
      return nothing;
    }

    return html`<section class="homepage-contributor-spotlight">
      <div class="homepage-contributor-spotlight__spotlight">
        <h2>${context.l10n`Contributor Spotlight`}</h2>
        <a class="homepage-contributor-spotlight__name" href=${contributor.url}
          >${contributor.contributorName}</a
        >
        <blockquote class="homepage-contributor-spotlight__quote">
          ${contributor.quote}
        </blockquote>

        ${Button({
          label: context.l10n`Get involved →`,
          href: `/${context.locale}/community`,
        })}
      </div>

      <figure class="homepage-contributor-spotlight__logo">
        <img
          loading="lazy"
          width="512"
          height="323"
          src=${contributorPng}
          alt="Tiled Mozilla Logo"
        />
      </figure>
    </section>`;
  }
}
