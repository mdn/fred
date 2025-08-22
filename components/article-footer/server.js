import { html } from "lit";

import { ServerComponent } from "../server/index.js";

import svg from "./article-footer.svg?lit";

export class ArticleFooter extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").DocPage>} context
   */
  render(context) {
    const { doc } = context;

    if (!doc) {
      return;
    }

    return html`
      <section
        class="content-section article-footer"
        aria-labelledby="feedback"
      >
        <div class="article-footer__inner">
          <div class="article-footer__svg-container">${svg}</div>
          <h2 id="feedback">Help improve MDN</h2>
          <mdn-content-feedback locale=${context.locale}></mdn-content-feedback>
          ${Contribute(context)} ${LastModified(context)} ${Links(context)}
        </div>
      </section>
    `;
  }
}

/**
 * @param {import("@fred").Context<import("@rari").DocPage>} context
 */
function Contribute(context) {
  return html`<a
    class="article-footer__contribute"
    href=${`/{context.locale}/docs/MDN/Community/Getting_started`}
    title=${context.l10n`This will take you to our contribution documentation.`}
    target="_blank"
    >${context.l10n`Learn how to contribute`}</a
  >`;
}

/**
 * @param {import("@fred").Context<import("@rari").DocPage>} context
 */
function LastModified(context) {
  const { doc, locale } = context;

  if (locale === "de") {
    return html`Diese Seite wurde automatisch aus dem Englischen übersetzt.`;
  }

  const date = new Date(doc.modified);
  const formattedDate = date.toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return html`<p class="article-footer__last-modified">
    ${context.l10n.raw({
      id: "article-footer-last-modified",
      args: {
        date: formattedDate,
      },
      elements: {
        date: {
          tag: "time",
          datetime: doc.modified,
        },
        contributors: {
          tag: "a",
          href: `${doc.mdn_url}/contributors.txt`,
        },
      },
    })}
  </p>`;
}

/**
 * @param {import("@fred").Context<import("@rari").DocPage>} context
 */
function Links(context) {
  return html`<div class="article-footer__links">
    ${GitHubSourceLink(context)} • ${GitHubIssueLink(context)}
  </div>`;
}

/**
 * @param {import("@fred").Context<import("@rari").DocPage>} context
 */
function GitHubSourceLink(context) {
  const {
    doc: {
      locale,
      source: { folder, github_url },
    },
  } = context;

  return html`<a
    class="external"
    href=${`${github_url}?plain=1`}
    title=${context.l10n.raw({
      id: "article-footer-source-title",
      args: {
        folder,
      },
    })}
    target="_blank"
    rel="noopener"
    >${locale === "de"
      ? "Übersetzung auf GitHub anzeigen"
      : context.l10n`View this page on GitHub`}</a
  >`;
}

/**
 * @param {import("@fred").Context<import("@rari").DocPage>} context
 */
function GitHubIssueLink(context) {
  const { doc } = context;
  const { locale } = doc;
  const url = new URL("https://github.com/");
  const sp = new URLSearchParams();

  url.pathname =
    locale === "en-US"
      ? "/mdn/content/issues/new"
      : locale === "de"
        ? "/mdn/translated-content-de/issues/new"
        : "/mdn/translated-content/issues/new";

  sp.set(
    "template",
    locale === "en-US"
      ? "page-report.yml"
      : `page-report-${locale.toLowerCase()}.yml`,
  );
  sp.set("mdn-url", `https://developer.mozilla.org${doc.mdn_url}`);
  sp.set("metadata", fillMetadata(METADATA_TEMPLATE, doc));

  url.search = sp.toString();

  return html`<a
    class="external"
    href=${url.href}
    title=${context.l10n`This will take you to GitHub to file a new issue.`}
    target="_blank"
    rel="noopener"
    >${locale === "de"
      ? "Fehler mit dieser Übersetzung melden"
      : context.l10n`Report a problem with this content`}</a
  >`;
}

const METADATA_TEMPLATE = `
<!-- Do not make changes below this line -->
<details>
<summary>Page report details</summary>

* Folder: \`$FOLDER\`
* MDN URL: https://developer.mozilla.org$PATHNAME
* GitHub URL: $GITHUB_URL
* Last commit: $LAST_COMMIT_URL
* Document last modified: $DATE

</details>
`;

/**
 *
 * @param {string} template
 * @param {import("@rari").Doc} doc
 * @returns
 */
function fillMetadata(template, doc) {
  let { folder, github_url, last_commit_url } = doc.source;

  if (doc.locale === "de") {
    github_url = github_url.replace(
      "/translated-content/",
      "/translated-content-de/",
    );
    last_commit_url = last_commit_url.replace(
      "/translated-content/",
      "/translated-content-de/",
    );
  }

  return template
    .replaceAll("$PATHNAME", doc.mdn_url)
    .replaceAll("$FOLDER", folder)
    .replaceAll("$GITHUB_URL", github_url)
    .replaceAll("$LAST_COMMIT_URL", last_commit_url)
    .replaceAll(
      "$DATE",
      doc.modified ? new Date(doc.modified).toISOString() : "*date not known*",
    )
    .trim();
}
