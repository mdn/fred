import { html } from "lit";

import svg from "./article-footer.svg?lit";

import "./index.css";
import "../content-feedback/index.js";

/**
 * @param {Fred.Context<Rari.DocPage>} context
 */
export function ArticleFooter(context) {
  const { doc } = context;

  if (!doc) {
    return;
  }

  return html`<aside class="article-footer">
    <div class="article-footer-inner">
      <div class="svg-container">${svg}</div>
      <h2 id="article_footer">${context.l10n`Help improve MDN`}</h2>
      <mdn-content-feedback locale=${context.locale}></mdn-content-feedback>
      ${ContributeLink(context)} ${LastModified(context)}
      ${GitHubLinks(context)}
    </div>
  </aside>`;
}

/**
 * @param {Fred.Context<Rari.DocPage>} context
 */
function ContributeLink(context) {
  return html`<a
    class="contribute"
    href="https://github.com/mdn/content/blob/main/CONTRIBUTING.md"
    title=${context.l10n`This will take you to our contribution guidelines on GitHub.`}
    target="_blank"
    rel="noopener noreferrer"
    >${context.l10n`Learn how to contribute`}</a
  >`;
}

/**
 * @param {Fred.Context<Rari.DocPage>} context
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

  return html`<p class="last-modified-date">
    ${context.l10n.raw({
      id: "article_footer_last_modified",
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
 * @param {Fred.Context<Rari.DocPage>} context
 */
function GitHubLinks(context) {
  return html`<div id="on-github" class="on-github">
    ${GitHubSourceLink(context)} • ${GitHubIssueLink(context)}
  </div>`;
}

/**
 * @param {Fred.Context<Rari.DocPage>} context
 */
function GitHubSourceLink(context) {
  const {
    doc: {
      locale,
      source: { folder, github_url },
    },
  } = context;

  return html`<a
    href=${`${github_url}?plain=1`}
    title=${context.l10n.raw({
      id: "article_footer_source_link_title",
      args: {
        folder,
      },
    })}
    target="_blank"
    rel="noopener"
  >
    ${locale === "de"
      ? "Übersetzung auf GitHub anzeigen"
      : context.l10n`View this page on GitHub`}
  </a>`;
}

/**
 * @param {Fred.Context<Rari.DocPage>} context
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
    href=${url.href}
    title=${context.l10n`This will take you to GitHub to file a new issue.`}
    target="_blank"
    rel="noopener"
  >
    ${locale === "de"
      ? "Fehler mit dieser Übersetzung melden"
      : context.l10n`Report a problem with this content`}
  </a>`;
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
 * @param {import("@mdn/rari").Doc} doc
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
