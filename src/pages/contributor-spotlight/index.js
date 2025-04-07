import { html } from "lit";

import { Section } from "../../components/content/index.js";
import { PageLayout } from "../../components/page-layout/index.js";

/**
 * @param {Fred.Context<Rari.ContributorSpotlightPage>} context
 */
export function ContributorSpotlight(context) {
  return PageLayout(
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
      ${context.hyData.sections.map((section) => Section(context, section))}
    `,
  );
}
