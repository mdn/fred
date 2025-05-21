import { html } from "lit";

import { PageLayout } from "../page-layout/server.js";
import { Section } from "../section/server.js";
import { ServerComponent } from "../server/index.js";

export class ContributorSpotlight extends ServerComponent {
  /**
   * @param {import("types/fred.js").Context<import("types/rari.js").ContributorSpotlightPage>} context
   */
  render(context) {
    return PageLayout.render(
      context,
      html`
        <h1>${context.l10n`Contributor profile`}</h1>
        <img
          src=${context.hyData.profileImg}
          alt=${context.hyData.profileImgAlt}
        />
        <a href=${"https://github.com/" + context.hyData.usernames.github}
          >@${context.hyData.usernames.github}</a
        >
        ${context.hyData.sections.map((section) =>
          Section.render(context, section),
        )}
      `,
    );
  }
}
