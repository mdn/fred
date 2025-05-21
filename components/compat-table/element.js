import { LitElement, html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { L10nMixin } from "../../l10n/mixin.js";

import {
  BCD_TABLE,
  DEFAULT_LOCALE,
  ISSUE_METADATA_TEMPLATE,
} from "./constants.js";
import styles from "./element.css?lit";
import {
  getSupportBrowserReleaseDate,
  getSupportClassName,
  labelFromString,
  versionLabelFromSupport,
} from "./feature-row.js";
import {
  HIDDEN_BROWSERS,
  asList,
  bugURLToString,
  getCurrentSupport,
  getFirst,
  hasMore,
  hasNoteworthyNotes,
  isFullySupportedWithoutLimitation,
  isNotSupportedAtAll,
  listFeatures,
  versionIsPreview,
} from "./utils.js";

/** @type {import("types/compat.js").LegendKey[]} */
const LEGEND_KEYS = [
  "yes",
  "partial",
  "preview",
  "no",
  "unknown",
  "experimental",
  "nonstandard",
  "deprecated",
  "footnote",
  "disabled",
  "altname",
  "prefix",
  "more",
];

/**
 * @param {import("types/bcd.js").BrowserName} browser
 * @returns {string}
 */
function browserToIconName(browser) {
  if (browser.startsWith("firefox")) {
    return "firefox";
  } else if (browser === "webview_android") {
    return "webview";
  } else if (browser === "webview_ios") {
    return "safari";
  } else {
    return browser.split("_")[0] ?? "";
  }
}

export class MDNCompatTable extends L10nMixin(LitElement) {
  static properties = {
    query: {},
    locale: {},
    data: {},
    browserInfo: { attribute: "browserinfo" },
    _pathname: { state: true },
    _platforms: { state: true },
    _browsers: { state: true },
  };

  static styles = styles;

  constructor() {
    super();
    this.query = "";
    /** @type {import("types/bcd.js").Identifier} */
    this.data = {};
    /** @type {import("types/bcd.js").Browsers} */
    this.browserInfo = {};
    this.locale = "";
    this._pathname = "";
    /** @type {string[]} */
    this._platforms = [];
    /** @type {import("types/bcd.js").BrowserName[]} */
    this._browsers = [];
  }

  get _breadcrumbs() {
    return this.query.split(".");
  }

  get _category() {
    return this._breadcrumbs[0] ?? "";
  }

  get _name() {
    return this._breadcrumbs.at(-1) ?? "";
  }

  /**
   * Gets the active legend items based on browser compatibility data.
   * @param {import("types/bcd.js").Identifier} compat - The compatibility data identifier.
   * @param {string} name - The name of the feature.
   * @param {import("types/bcd.js").Browsers} browserInfo - Information about browsers.
   * @param {import("types/bcd.js").BrowserName[]} browsers - The list of displayed browsers.
   * @returns {import("types/compat.js").LegendKey[]} An array of legend keys.
   */
  _getActiveLegendItems(compat, name, browserInfo, browsers) {
    /** @type {Set<import("types/compat.js").LegendKey>} */
    const legendItems = new Set();

    for (const feature of listFeatures(compat, "", name)) {
      const { status } = feature.compat;

      if (status) {
        if (status.experimental) {
          legendItems.add("experimental");
        }
        if (status.deprecated) {
          legendItems.add("deprecated");
        }
        if (!status.standard_track) {
          legendItems.add("nonstandard");
        }
      }

      for (const browser of browsers) {
        const browserSupport = feature.compat.support[browser] ?? {
          version_added: null,
        };

        if (HIDDEN_BROWSERS.includes(browser)) {
          continue;
        }

        const firstSupportItem = getFirst(browserSupport);
        if (firstSupportItem && hasNoteworthyNotes(firstSupportItem)) {
          legendItems.add("footnote");
        }

        for (const versionSupport of asList(browserSupport)) {
          if (versionSupport.version_added) {
            if (versionSupport.flags && versionSupport.flags.length > 0) {
              legendItems.add("no");
            } else if (
              versionIsPreview(
                versionSupport.version_added,
                browserInfo[browser],
              )
            ) {
              legendItems.add("preview");
            } else {
              legendItems.add("yes");
            }
          } else if (versionSupport.version_added == undefined) {
            legendItems.add("unknown");
          } else {
            legendItems.add("no");
          }

          if (versionSupport.partial_implementation) {
            legendItems.add("partial");
          }
          if (versionSupport.prefix) {
            legendItems.add("prefix");
          }
          if (versionSupport.alternative_name) {
            legendItems.add("altname");
          }
          if (versionSupport.flags) {
            legendItems.add("disabled");
          }
        }

        if (hasMore(browserSupport)) {
          legendItems.add("more");
        }
      }
    }

    return LEGEND_KEYS.filter((key) => legendItems.has(key));
  }

  connectedCallback() {
    super.connectedCallback();
    this._pathname = globalThis.location.pathname;
    [this._platforms, this._browsers] = gatherPlatformsAndBrowsers(
      this._category,
      this.data,
      this.browserInfo,
    );
  }

  get _issueUrl() {
    const url = "https://github.com/mdn/browser-compat-data/issues/new";
    const sp = new URLSearchParams();
    const metadata = ISSUE_METADATA_TEMPLATE.replaceAll(
      "$DATE",
      new Date().toISOString(),
    )
      .replaceAll("$QUERY_ID", this.query)
      .trim();
    sp.set("mdn-url", `https://developer.mozilla.org${this._pathname}`);
    sp.set("metadata", metadata);
    sp.set("title", `${this.query} - <SUMMARIZE THE PROBLEM>`);
    sp.set("template", "data-problem.yml");

    return `${url}?${sp.toString()}`;
  }

  _renderIssueLink() {
    const onClick = (/** @type {MouseEvent} */ event) => {
      event.preventDefault();
      window.open(this._issueUrl, "_blank", "noopener,noreferrer");
    };
    const source_file = this.data.__compat?.source_file;
    return html`<div class="bc-on-github">
      <a
        class="bc-github-link external external-icon"
        href="#"
        @click=${onClick}
        target="_blank"
        rel="noopener noreferrer"
        title=${this.l10n(
          "compat_link_report_issue_title",
        )`Report an issue with this compatibility data`}
      >
        ${this.l10n(
          "compat_link_report_issue",
        )`Report problems with this compatibility data`}</a
      >${source_file
        ? html` •
            <a
              class="bc-github-link external external-icon"
              href=${`https://github.com/mdn/browser-compat-data/tree/main/${source_file}`}
              target="_blank"
              rel="noopener noreferrer"
              title=${this.l10n.raw({
                id: "compat_link_source_title",
                args: {
                  filename: source_file,
                },
              })}
            >
              ${this.l10n("compat_link_source")`View data on GitHub`}
            </a>`
        : undefined}
    </div>`;
  }

  _renderTable() {
    return html`<figure class="table-container">
      <figure class="table-container-inner">
        ${this._renderIssueLink()}
        <table
          class="bc-table bc-table-web"
          style="--compat-browser-count: ${Object.keys(this._browsers).length}"
        >
          ${this._renderTableHeader()} ${this._renderTableBody()}
        </table>
      </figure>
    </figure>`;
  }

  _renderTableHeader() {
    return html`<thead>
      ${this._renderPlatformHeaders()} ${this._renderBrowserHeaders()}
    </thead>`;
  }

  _renderPlatformHeaders() {
    const platformsWithBrowsers = this._platforms.map((platform) => ({
      platform,
      browsers: this._browsers.filter(
        (browser) => this.browserInfo[browser].type === platform,
      ),
    }));

    const grid = platformsWithBrowsers.map(({ browsers }) => browsers.length);

    const platformCells = platformsWithBrowsers.map(
      ({ platform, browsers }, index) => {
        // Get the intersection of browsers in the `browsers` array and the
        // `PLATFORM_BROWSERS[platform]`.
        const browserCount = browsers.length;
        const cellClass = `bc-platform bc-platform-${platform}`;
        const iconClass = `icon icon-${platform}`;

        const columnStart =
          2 + grid.slice(0, index).reduce((acc, x) => acc + x, 0);
        const columnEnd = columnStart + browserCount;
        return html`<th
          class=${cellClass}
          colspan=${browserCount}
          title=${platform}
          style="grid-column: ${columnStart} / ${columnEnd}"
        >
          <span class=${iconClass}></span>
          <span class="visually-hidden">${platform}</span>
        </th>`;
      },
    );

    return html`<tr class="bc-platforms">
      <td></td>
      ${platformCells}
    </tr>`;
  }

  _renderBrowserHeaders() {
    // <BrowserHeaders>
    const browserCells = this._browsers.map(
      (browser) =>
        html`<th class=${`bc-browser bc-browser-${browser}`}>
          <div class=${`bc-head-txt-label bc-head-icon-${browser}`}>
            ${this.browserInfo[browser]?.name}
          </div>
          <div
            class=${`bc-head-icon-symbol icon icon-${browserToIconName(
              browser,
            )}`}
          ></div>
        </th>`,
    );

    return html`<tr class="bc-browsers">
      <td></td>
      ${browserCells}
    </tr>`;
  }

  _renderTableBody() {
    // <FeatureListAccordion>
    const { data, _browsers: browsers, browserInfo, locale } = this;
    const features = listFeatures(data, "", this._name);

    const featureRows = features.map((feature) => {
      // <FeatureRow>
      const { name, compat, depth } = feature;

      const title = compat.description
        ? html`<span>${unsafeHTML(compat.description)}</span>`
        : html`<code>${name}</code>`;

      let titleNode;
      const titleContent = html`${title}${compat.status &&
      this._renderStatusIcons(compat.status)}`;
      if (compat.mdn_url && depth > 0) {
        const href = compat.mdn_url.replace(
          `/${DEFAULT_LOCALE}/docs`,
          `/${locale}/docs`,
        );
        titleNode = html`<a
          href=${href}
          class="bc-table-row-header"
          data-glean=${`${BCD_TABLE}: link -> ${href}`}
        >
          ${titleContent}
        </a>`;
      } else {
        titleNode = html`<div class="bc-table-row-header">
          ${titleContent}
        </div>`;
      }

      const handleMousedown = (/** @type {MouseEvent} */ event) => {
        // Blur active element if already focused.
        const activeElement = this.shadowRoot?.activeElement;
        const { currentTarget } = event;

        if (
          activeElement instanceof HTMLElement &&
          currentTarget instanceof HTMLElement
        ) {
          const activeCell = activeElement.closest("td");
          const currentCell = currentTarget.closest("td");

          if (activeCell === currentCell) {
            activeElement.blur();
            event.preventDefault();
            return;
          }
        }

        if (currentTarget instanceof HTMLElement) {
          // Workaround for Safari, which doesn't focus implicitly.
          setTimeout(() => currentTarget.focus(), 0);
        }
      };

      const browserCells = browsers.map((browserName) => {
        // <CompatCell>
        const browser = browserInfo[browserName];
        const support = compat.support[browserName] ?? {
          version_added: null,
        };

        const supportClassName = getSupportClassName(support, browser);
        const notes = this._renderNotes(browser, support);

        return html`<td
          class=${`bc-support bc-browser-${browserName} bc-supports-${supportClassName} ${
            notes ? "bc-has-history" : ""
          }`}
        >
          <button
            type="button"
            title=${ifDefined(notes && "Toggle history")}
            @mousedown=${handleMousedown}
          >
            ${this._renderCellText(support, browser)}
          </button>
          ${notes &&
          html`<div class="timeline" tabindex="0">
            <dl class="bc-notes-list">${notes}</dl>
          </div>`}
        </td>`;
      });

      return html`<tr>
        <th class=${`bc-feature bc-feature-depth-${depth}`} scope="row">
          ${titleNode}
        </th>
        ${browserCells}
      </tr>`;
    });

    return html`<tbody>
      ${featureRows}
    </tbody>`;
  }

  /**
   * @param {import("types/bcd.js").SupportStatement} support
   */
  _renderCellIcons(support) {
    const supportItem = getCurrentSupport(support);
    if (!supportItem) {
      return;
    }

    const icons = [
      supportItem.prefix && this._renderIcon("prefix"),
      hasNoteworthyNotes(supportItem) && this._renderIcon("footnote"),
      supportItem.alternative_name && this._renderIcon("altname"),
      supportItem.flags && this._renderIcon("disabled"),
      hasMore(support) && this._renderIcon("more"),
    ].filter(Boolean);

    return icons.length > 0
      ? html`<div class="bc-icons">${icons}</div>`
      : undefined;
  }

  /**
   * @param {string} name
   * @returns {import("types/lit.js").TemplateResult}
   */
  _renderIcon(name) {
    const title = this.l10n.raw({ id: `compat_legend_${name}` });

    return html`<abbr class="only-icon" title=${ifDefined(title)}>
      <span>${name}</span>
      <i class=${`icon icon-${name}`}></i>
    </abbr>`;
  }

  /**
   * @param {import("types/bcd.js").StatusBlock} status
   */
  _renderStatusIcons(status) {
    // <StatusIcons>
    /**
     * @type {Array<{ title: import("types/lit.js").L10nResult; text: import("types/lit.js").L10nResult; iconClassName: string }>}
     */
    const icons = [];
    if (status.experimental) {
      icons.push({
        title: this.l10n(
          "compat_legend_experimental",
        )`Experimental. Expect behavior to change in the future.`,
        text: this.l10n("compat_experimental")`Experimental`,
        iconClassName: "icon-experimental",
      });
    }

    if (status.deprecated) {
      icons.push({
        title: this.l10n(
          "compat_legend_deprecated",
        )`Deprecated. Not for use in new websites.`,
        text: this.l10n("compat_deprecated")`Experimental`,
        iconClassName: "icon-deprecated",
      });
    }

    if (!status.standard_track) {
      icons.push({
        title: this.l10n(
          "compat_legend_nonstandard",
        )`Non-standard. Expect poor cross-browser support.`,
        text: this.l10n("compat_nonstandard")`Non-standard`,
        iconClassName: "icon-nonstandard",
      });
    }

    const renderedIcons = icons.map(
      (icon) =>
        html`<abbr
          class=${`only-icon icon ${icon.iconClassName}`}
          title=${icon.title}
        >
          <span>${icon.text}</span>
        </abbr>`,
    );

    return icons.length === 0
      ? undefined
      : html`<div class="bc-icons">${renderedIcons}</div>`;
  }

  /**
   *
   * @param {import("types/bcd.js").BrowserStatement} browser
   * @param {import("types/bcd.js").SupportStatement} support
   */
  _renderNotes(browser, support) {
    return [...asList(support)]
      .reverse()
      .flatMap((item, i) => {
        /**
         * @type {Array<{iconName: string; label: string | import("types/lit.js").L10nResult } | undefined>}
         */
        const supportNotes = [
          item.version_removed &&
          !asList(support).some(
            (otherItem) => otherItem.version_added === item.version_removed,
          )
            ? {
                iconName: "footnote",
                label: this.l10n.raw({
                  id: "compat_support_removed",
                  args: {
                    version: labelFromString(item.version_removed, browser),
                  },
                }),
              }
            : undefined,
          item.partial_implementation
            ? {
                iconName: "footnote",
                label: this.l10n("compat_support_partial")`Partial support`,
              }
            : undefined,
          item.prefix
            ? {
                iconName: "prefix",
                label: this.l10n.raw({
                  id: "compat_support_prefix",
                  args: {
                    prefix: item.prefix,
                  },
                }),
              }
            : undefined,
          item.alternative_name
            ? {
                iconName: "altname",
                label: this.l10n.raw({
                  id: "compat_support_altname",
                  args: {
                    altname: item.alternative_name,
                  },
                }),
              }
            : undefined,
          item.flags
            ? {
                iconName: "disabled",
                label: (() => {
                  const hasAddedVersion =
                    typeof item.version_added === "string";
                  const hasRemovedVersion =
                    typeof item.version_removed === "string";
                  const flags = item.flags || [];

                  // TODO l10n
                  const items = [
                    hasAddedVersion && `From version ${item.version_added}`,
                    hasRemovedVersion &&
                      `${hasAddedVersion ? " until" : "Until"} ${item.version_removed} (exclusive)`,
                    hasAddedVersion || hasRemovedVersion ? ": this" : "This",
                    " feature is behind the",
                    ...flags.map(
                      /**
                       * @param {import("types/bcd.js").FlagStatement} flag
                       * @param {number} i
                       */ (flag, i) => {
                        const valueToSet = flag.value_to_set
                          ? html` (needs to be set to
                              <code>${flag.value_to_set}</code>)`
                          : "";

                        return [
                          html`<code>${flag.name}</code>`,
                          flag.type === "preference" &&
                            html` preference${valueToSet}`,
                          flag.type === "runtime_flag" &&
                            html` runtime flag${valueToSet}`,
                          i < flags.length - 1 && " and the ",
                        ].filter(Boolean);
                      },
                    ),
                    ".",
                    browser.pref_url &&
                      flags.some(
                        /** @param {import("types/bcd.js").FlagStatement} flag */ (
                          flag,
                        ) => flag.type === "preference",
                      ) &&
                      ` To change preferences in ${browser.name}, visit ${browser.pref_url}.`,
                  ]
                    .filter(Boolean)
                    .map((value) => html`${value}`);

                  return html` ${items} `;
                })(),
              }
            : undefined,
          item.notes
            ? (Array.isArray(item.notes) ? item.notes : [item.notes]).map(
                /** @param {string} note */ (note) => ({
                  iconName: "footnote",
                  label: note,
                }),
              )
            : undefined,
          item.impl_url
            ? (Array.isArray(item.impl_url)
                ? item.impl_url
                : [item.impl_url]
              ).map(
                /** @param {string} impl_url */ (impl_url) => ({
                  iconName: "footnote",
                  label: this.l10n.raw({
                    id: "compat_support_see_impl_url",
                    args: {
                      label: bugURLToString(impl_url),
                    },
                    elements: {
                      impl_url: {
                        tag: "a",
                        href: impl_url,
                      },
                    },
                  }),
                }),
              )
            : undefined,
          versionIsPreview(item.version_added, browser)
            ? {
                iconName: "footnote",
                label: this.l10n(
                  "compat_support_preview",
                )`Preview browser support`,
              }
            : undefined,
          // If we encounter nothing else than the required `version_added` and
          // `release_date` properties, assume full support.
          // EDIT 1-5-21: if item.version_added doesn't exist, assume no support.
          isFullySupportedWithoutLimitation(item) &&
          !versionIsPreview(item.version_added, browser)
            ? {
                iconName: "footnote",
                label: this.l10n("compat_support_full")`Full support`,
              }
            : isNotSupportedAtAll(item)
              ? {
                  iconName: "footnote",
                  label: this.l10n("compat_support_no")`No support`,
                }
              : undefined,
        ]
          .flat()
          .filter(Boolean);

        if (supportNotes.length === 0) {
          supportNotes.push({
            iconName: "unknown",
            label: this.l10n("compat_support_unknown")`Support unknown`,
          });
        }

        /**
         * @type {Array<{iconName: string; label: string | import("types/lit.js").L10nResult }>}
         */
        const filteredSupportNotes = supportNotes.filter(
          (v) => v !== undefined,
        );

        const notesItems = filteredSupportNotes.map(({ iconName, label }) => {
          return html`<dd class="bc-supports-dd">
            ${this._renderIcon(iconName)}${typeof label === "string"
              ? html`<span>${unsafeHTML(label)}</span>`
              : label}
          </dd>`;
        });
        const hasNotes = notesItems.length > 0;

        return (
          (i === 0 || hasNotes) &&
          html`<div class="bc-notes-wrapper">
            <dt
              class=${`bc-supports-${getSupportClassName(
                item,
                browser,
              )} bc-supports`}
            >
              ${this._renderCellText(item, browser, true)}
            </dt>
            ${notesItems} ${hasNotes ? undefined : html`<dd></dd>`}
          </div>`
        );
      })
      .filter(Boolean);
  }

  /**
   *
   * @param {import("types/bcd.js").SupportStatement | undefined} support
   * @param {import("types/bcd.js").BrowserStatement} browser
   * @param {boolean} [timeline]
   */
  _renderCellText(support, browser, timeline = false) {
    const currentSupport = getCurrentSupport(support);

    const added = currentSupport?.version_added ?? undefined;
    const lastVersion = currentSupport?.version_last ?? undefined;

    const browserReleaseDate = getSupportBrowserReleaseDate(support);
    const supportClassName = getSupportClassName(support, browser);

    let status;
    switch (added) {
      case undefined: {
        status = { isSupported: "unknown" };
        break;
      }
      case true: {
        status = { isSupported: lastVersion ? "no" : "yes" };
        break;
      }
      case false: {
        status = { isSupported: "no" };
        break;
      }
      case "preview": {
        status = { isSupported: "preview" };
        break;
      }
      default: {
        status = {
          isSupported: supportClassName,
          label: versionLabelFromSupport(added, lastVersion, browser),
        };
        break;
      }
    }

    let label;
    /** @type {"" | import("types/lit.js").L10nResult} */
    let title = "";

    switch (status.isSupported) {
      case "yes": {
        title = this.l10n("compat_support_full")`Full support`;
        label = status.label || this.l10n("compat_yes")`Yes`;
        break;
      }

      case "partial": {
        title = this.l10n("compat_support_partial")`Partial support`;
        label = status.label || this.l10n("compat_partial")`Partial`;
        break;
      }

      case "removed-partial": {
        if (timeline) {
          title = this.l10n("compat_support_partial")`Partial support`;
          label = status.label || this.l10n("compat_partial")`Partial`;
        } else {
          title = this.l10n("compat_support_no")`No support`;
          label = status.label || this.l10n("compat_no")`No`;
        }
        break;
      }

      case "no": {
        title = this.l10n("compat_support_no")`No support`;
        label = status.label || this.l10n("compat_no")`No`;
        break;
      }

      case "preview": {
        title = this.l10n("compat_support_preview")`Preview support`;
        label = status.label || browser.preview_name;
        break;
      }

      case "unknown": {
        title = this.l10n("compat_support_unknown")`Support unknown`;
        label = "?";
        break;
      }
    }

    title = `${browser.name} – ${title}`;

    return html`<div
      class=${timeline
        ? "bcd-timeline-cell-text-wrapper"
        : "bcd-cell-text-wrapper"}
    >
      <div class="bcd-cell-icons">
        <span class="icon-wrap">
          <abbr
            class=${`
                bc-level-${supportClassName}
                icon
                icon-${supportClassName}`}
            title=${title}
          >
            <span class="bc-support-level">${title}</span>
          </abbr>
        </span>
      </div>
      <div class="bcd-cell-text-copy">
        <span class="bc-browser-name">${browser.name}</span>
        <span
          class="bc-version-label"
          title=${browserReleaseDate && !timeline
            ? this.l10n.raw({
                id: "compat_browser_version_date",
                args: {
                  browser: browser.name,
                  version: added,
                  date: browserReleaseDate,
                },
              })
            : ""}
        >
          ${!timeline || added ? label : undefined}
          ${browserReleaseDate && timeline
            ? // TODO l10n
              ` (Released ${browserReleaseDate})`
            : ""}
        </span>
      </div>
      ${support && this._renderCellIcons(support)}
    </div>`;
  }

  _renderTableLegend() {
    const { _browsers: browsers, browserInfo } = this;

    if (!browserInfo) {
      throw new Error("Missing browser info");
    }

    const items = this._getActiveLegendItems(
      this.data,
      this._name,
      browserInfo,
      browsers,
    ).map((key) => {
      const label = this.l10n(`compat_legend_${key}`);
      return ["yes", "partial", "no", "unknown", "preview"].includes(key)
        ? html`<div class="bc-legend-item">
            <dt class="bc-legend-item-dt">
              <span class=${`bc-supports-${key} bc-supports`}>
                <abbr
                  class=${`bc-level bc-level-${key} icon icon-${key}`}
                  title=${label}
                >
                  <span class="visually-hidden">${label}</span>
                </abbr>
              </span>
            </dt>
            <dd class="bc-legend-item-dd">${label}</dd>
          </div>`
        : html`<div class="bc-legend-item">
            <dt class="bc-legend-item-dt">
              <abbr class="legend-icons icon icon-${key}" title=${label}></abbr>
            </dt>
            <dd class="bc-legend-item-dd">${label}</dd>
          </div>`;
    });

    return html`<section class="bc-legend">
      <h3 class="visually-hidden" id="Legend">
        ${this.l10n("compat_legend")`Legend`}
      </h3>
      <p class="bc-legend-tip">
        ${this.l10n(
          "compat_legend_tip",
        )`Tip: you can click/tap on a cell for more information.`}
      </p>
      <dl class="bc-legend-items-container">${items}</dl>
    </section>`;
  }

  render() {
    return html` ${this._renderTable()} ${this._renderTableLegend()} `;
  }
}

customElements.define("mdn-compat-table", MDNCompatTable);

/**
 * Return a list of platforms and browsers that are relevant for this category &
 * data.
 *
 * If the category is "webextensions", only those are shown. In all other cases
 * at least the entirety of the "desktop" and "mobile" platforms are shown. If
 * the category is JavaScript, the entirety of the "server" category is also
 * shown. In all other categories, if compat data has info about Deno / Node.js
 * those are also shown. Deno is always shown if Node.js is shown.
 * @param {string} category
 * @param {import("types/bcd.js").Identifier} data
 * @param {import("types/bcd.js").Browsers} browserInfo
 * @returns {[string[], import("types/bcd.js").BrowserName[]]}
 */
export function gatherPlatformsAndBrowsers(category, data, browserInfo) {
  const hasNodeJSData = data.__compat && "nodejs" in data.__compat.support;
  const hasDenoData = data.__compat && "deno" in data.__compat.support;

  let platforms = ["desktop", "mobile"];
  if (category === "javascript" || hasNodeJSData || hasDenoData) {
    platforms.push("server");
  }

  /** @type {import("types/bcd.js").BrowserName[]} */
  let browsers = [];

  // Add browsers in platform order to align table cells
  for (const platform of platforms) {
    /**
     * @type {import("types/bcd.js").BrowserName[]}
     */
    const platformBrowsers = Object.keys(browserInfo);
    browsers.push(
      ...platformBrowsers.filter(
        (browser) =>
          browser in browserInfo && browserInfo[browser].type === platform,
      ),
    );
  }

  // Filter WebExtension browsers in corresponding tables.
  if (category === "webextensions") {
    browsers = browsers.filter(
      (browser) => browserInfo[browser].accepts_webextensions,
    );
  }

  // If there is no Node.js data for a category outside "javascript", don't
  // show it. It ended up in the browser list because there is data for Deno.
  if (category !== "javascript" && !hasNodeJSData) {
    browsers = browsers.filter((browser) => browser !== "nodejs");
  }

  // Hide Internet Explorer compatibility data
  browsers = browsers.filter((browser) => !HIDDEN_BROWSERS.includes(browser));

  return [platforms, [...browsers]];
}
