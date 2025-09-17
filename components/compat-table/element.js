import { LitElement, html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { L10nMixin } from "../../l10n/mixin.js";

import { randomIdString } from "../utils/index.js";

import { DEFAULT_LOCALE, ISSUE_METADATA_TEMPLATE } from "./constants.js";
import styles from "./element.css?lit";
import {
  getSupportBrowserReleaseDate,
  getSupportClassName,
  labelFromString,
  versionLabelFromSupport,
} from "./feature-row.js";
import {
  SHOW_BROWSERS,
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

/** @type {import("@compat").IconName[]} */
const ICON_NAMES = [
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
 * @param {import("@bcd").BrowserName} browser
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
    /** @type {import("@bcd").Identifier} */
    this.data = {};
    /** @type {Partial<import("@bcd").Browsers>} */
    this.browserInfo = {};
    this.locale = "";
    this._pathname = "";
    /** @type {string[]} */
    this._platforms = [];
    /** @type {import("@bcd").BrowserName[]} */
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
   * @param {import("@bcd").Identifier} compat - The compatibility data identifier.
   * @param {string} name - The name of the feature.
   * @param {Partial<import("@bcd").Browsers>} browserInfo - Information about browsers.
   * @param {import("@bcd").BrowserName[]} browsers - The list of displayed browsers.
   * @returns {import("@compat").IconName[]} An array of legend keys.
   */
  _getActiveLegendItems(compat, name, browserInfo, browsers) {
    /** @type {Set<import("@compat").IconName>} */
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
          version_added: false,
        };

        if (!SHOW_BROWSERS.includes(browser)) {
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
              browserInfo[browser] &&
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

    return ICON_NAMES.filter((key) => legendItems.has(key));
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
          "compat-link-report-issue-title",
        )`Report an issue with this compatibility data`}
      >
        ${this.l10n(
          "compat-link-report-issue",
        )`Report problems with this compatibility data`}</a
      >${source_file
        ? html` •
            <a
              class="bc-github-link external external-icon"
              href=${`https://github.com/mdn/browser-compat-data/tree/main/${source_file}`}
              target="_blank"
              rel="noopener noreferrer"
              title=${this.l10n.raw({
                id: "compat-link-source-title",
                args: {
                  filename: source_file,
                },
              })}
            >
              ${this.l10n("compat-link-source")`View data on GitHub`}
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
        (browser) => this.browserInfo[browser]?.type === platform,
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
    let features = listFeatures(data, "", this._name);

    const MAX_FEATURES = 100;

    // If there are too many features, hide nested features.
    if (features.length > MAX_FEATURES) {
      features = features.filter(({ depth }) => depth < 2);
    }

    // If there are still too many features, hide non-standard features.
    if (features.length > MAX_FEATURES) {
      features = features.filter(
        ({ compat: { status } }) => status?.standard_track,
      );
    }

    // If there are still too many features, hide deprecated features.
    if (features.length > MAX_FEATURES) {
      features = features.filter(
        ({ compat: { status } }) => !status?.deprecated,
      );
    }

    // If there are still too many features, hide experimental features.
    if (features.length > MAX_FEATURES) {
      features = features.filter(
        ({ compat: { status } }) => !status?.experimental,
      );
    }

    // At this point, we did all we can to reduce the number of features shown.
    if (features.length > MAX_FEATURES) {
      features = features.slice(0, MAX_FEATURES);
    }

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
          data-glean-id=${`bcd: link -> ${href}`}
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

      const toggleAriaExpanded =
        /**
         * @param {Event} event
         * @param {boolean} expanded
         */
        (event, expanded) => {
          const target = event.composedPath()?.[0] || event.target;
          if (target instanceof HTMLElement) {
            const controls = target.getAttribute("aria-controls");
            if (controls) {
              const controlsElement = this.shadowRoot?.querySelector(
                `#${controls}`,
              );
              if (controlsElement instanceof HTMLElement) {
                controlsElement.setAttribute(
                  "aria-expanded",
                  expanded ? "true" : "false",
                );
              }
            }
          }
        };

      const handleFocus = /** @param {Event} event */ (event) =>
        toggleAriaExpanded(event, true);
      const handleBlur = /** @param {Event} event */ (event) =>
        toggleAriaExpanded(event, false);

      const browserCells = browsers.map((browserName) => {
        // <CompatCell>
        const browser = browserInfo[browserName];
        if (!browser) {
          return nothing;
        }
        const support = compat.support[browserName] ?? {
          version_added: false,
        };

        const timelineId = randomIdString("timeline-");
        const supportClassName = getSupportClassName(support, browser);
        const notes = this._renderNotes(browser, support);

        return html`<td
          class=${`bc-support bc-browser-${browserName} bc-supports-${supportClassName} ${
            notes ? "bc-has-history" : ""
          }`}
        >
          <button
            type="button"
            aria-controls=${timelineId}
            title=${ifDefined(notes && "Toggle history")}
            @focus=${handleFocus}
            @blur=${handleBlur}
            @mousedown=${handleMousedown}
          >
            ${this._renderCellText(support, browser)}
          </button>
          ${notes &&
          html`<div id=${timelineId} class="timeline" aria-expanded="false">
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
   * @param {import("@bcd").SupportStatement} support
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
   * @param {import("@compat").IconName} name
   * @returns {import("@lit").TemplateResult}
   */
  _renderIcon(name) {
    const title = this._getLegendLabel(name);

    return html`
      <span class="icon-wrap">
        <abbr class="only-icon" title=${ifDefined(title)}>
          <span>${name}</span>
          <i class=${`icon icon-${name}`}></i>
        </abbr>
      </span>
    `;
  }

  /**
   * @param {import("@compat").IconName} name
   */
  _getLegendLabel(name) {
    return {
      yes: () => this.l10n("compat-legend-yes"),
      partial: () => this.l10n("compat-legend-partial"),
      preview: () => this.l10n("compat-legend-preview"),
      no: () => this.l10n("compat-legend-no"),
      unknown: () => this.l10n("compat-legend-unknown"),
      experimental: () => this.l10n("compat-legend-experimental"),
      nonstandard: () => this.l10n("compat-legend-nonstandard"),
      deprecated: () => this.l10n("compat-legend-deprecated"),
      footnote: () => this.l10n("compat-legend-footnote"),
      disabled: () => this.l10n("compat-legend-disabled"),
      altname: () => this.l10n("compat-legend-altname"),
      prefix: () => this.l10n("compat-legend-prefix"),
      more: () => this.l10n("compat-legend-more"),
    }[name]();
  }

  /**
   * @param {import("@bcd").StatusBlock} status
   */
  _renderStatusIcons(status) {
    // <StatusIcons>
    /**
     * @type {Array<{ title: import("@lit").L10nResult; text: import("@lit").L10nResult; iconClassName: string }>}
     */
    const icons = [];

    if (status.experimental) {
      icons.push({
        title: this._getLegendLabel("experimental"),
        text: this.l10n("compat-experimental")`Experimental`,
        iconClassName: "icon-experimental",
      });
    }

    if (status.deprecated) {
      icons.push({
        title: this._getLegendLabel("deprecated"),
        text: this.l10n("compat-deprecated")`Experimental`,
        iconClassName: "icon-deprecated",
      });
    }

    if (!status.standard_track) {
      icons.push({
        title: this._getLegendLabel("nonstandard"),
        text: this.l10n("compat-nonstandard")`Non-standard`,
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
   * @param {import("@bcd").BrowserStatement} browser
   * @param {import("@bcd").SupportStatement} support
   */
  _renderNotes(browser, support) {
    return [...asList(support)]
      .reverse()
      .flatMap((item, i) => {
        const notes = this._getNotes(browser, support, item);

        const notesItems = notes.map(({ iconName, label }) => {
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
   * @param {import("@bcd").BrowserStatement} browser
   * @param {import("@bcd").SupportStatement} support
   * @param {import("@bcd").SimpleSupportStatement} item
   * @returns
   */
  _getNotes(browser, support, item) {
    /**
     * @type {Array<{iconName: import("@compat").IconName; label: string | import("@lit").L10nResult | undefined }>}
     */
    const supportNotes = [];

    if (
      item.version_removed &&
      !asList(support).some(
        (otherItem) => otherItem.version_added === item.version_removed,
      )
    ) {
      supportNotes.push({
        iconName: "footnote",
        label: this.l10n.raw({
          id: "compat-support-removed",
          args: {
            version: labelFromString(item.version_removed, browser),
          },
        }),
      });
    }

    if (item.partial_implementation) {
      supportNotes.push({
        iconName: "footnote",
        label: this.l10n("compat-support-partial")`Partial support`,
      });
    }

    if (item.prefix) {
      supportNotes.push({
        iconName: "prefix",
        label: this.l10n.raw({
          id: "compat-support-prefix",
          args: {
            prefix: item.prefix,
          },
        }),
      });
    }

    if (item.alternative_name) {
      supportNotes.push({
        iconName: "altname",
        label: this.l10n.raw({
          id: "compat-support-altname",
          args: {
            altname: item.alternative_name,
          },
        }),
      });
    }

    if (item.flags) {
      for (const { type, name, value_to_set } of item.flags) {
        supportNotes.push({
          iconName: "disabled",
          label: this.l10n.raw({
            id: "compat-support-flags",
            args: {
              has_added: Number(
                typeof item.version_added === "string" &&
                  item.version_added !== "preview",
              ),
              version_added: item.version_added,
              has_last: Number(typeof item.version_last === "string"),
              versionLast: item.version_last,
              flag_type: type,
              flag_name: name,
              has_value: Number(typeof value_to_set === "string"),
              flag_value: value_to_set,
              has_pref_url: Number(typeof browser.pref_url === "string"),
              browser_name: browser.name,
              browser_pref_url: browser.pref_url,
            },
            elements: {
              name: {
                tag: "code",
              },
              value: {
                tag: "code",
              },
            },
          }),
        });
      }
    }

    if (item.notes) {
      const notes = Array.isArray(item.notes) ? item.notes : [item.notes];
      for (const note of notes) {
        supportNotes.push({
          iconName: "footnote",
          label: note,
        });
      }
    }

    if (item.impl_url) {
      const impl_urls = Array.isArray(item.impl_url)
        ? item.impl_url
        : [item.impl_url];

      for (const impl_url of impl_urls) {
        supportNotes.push({
          iconName: "footnote",
          label: this.l10n.raw({
            id: "compat-support-see-impl-url",
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
        });
      }
    }

    if (versionIsPreview(item.version_added, browser)) {
      supportNotes.push({
        iconName: "footnote",
        label: this.l10n("compat-support-preview")`Preview browser support`,
      });
    }

    // If we encounter nothing else than the required `version_added` and
    // `release_date` properties, assume full support.
    // EDIT 1-5-21: if item.version_added doesn't exist, assume no support.
    if (
      isFullySupportedWithoutLimitation(item) &&
      !versionIsPreview(item.version_added, browser)
    ) {
      supportNotes.push({
        iconName: "footnote",
        label: this.l10n("compat-support-full")`Full support`,
      });
    } else if (isNotSupportedAtAll(item)) {
      supportNotes.push({
        iconName: "footnote",
        label: this.l10n("compat-support-no")`No support`,
      });
    }

    if (supportNotes.length === 0) {
      supportNotes.push({
        iconName: "unknown",
        label: this.l10n("compat-support-unknown")`Support unknown`,
      });
    }

    return supportNotes;
  }

  /**
   *
   * @param {import("@bcd").SupportStatement | undefined} support
   * @param {import("@bcd").BrowserStatement} browser
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
    /** @type {"" | import("@lit").L10nResult} */
    let title = "";

    switch (status.isSupported) {
      case "yes": {
        title = this.l10n("compat-support-full")`Full support`;
        label = status.label || this.l10n("compat-yes")`Yes`;
        break;
      }

      case "partial": {
        title = this.l10n("compat-support-partial")`Partial support`;
        label = status.label || this.l10n("compat-partial")`Partial`;
        break;
      }

      case "removed-partial": {
        if (timeline) {
          title = this.l10n("compat-support-partial")`Partial support`;
          label = status.label || this.l10n("compat-partial")`Partial`;
        } else {
          title = this.l10n("compat-support-no")`No support`;
          label = status.label || this.l10n("compat-no")`No`;
        }
        break;
      }

      case "no": {
        title = this.l10n("compat-support-no")`No support`;
        label = status.label || this.l10n("compat-no")`No`;
        break;
      }

      case "preview": {
        title = this.l10n("compat-support-preview")`Preview support`;
        label = status.label || browser.preview_name;
        break;
      }

      case "unknown": {
        title = this.l10n("compat-support-unknown")`Support unknown`;
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
                id: "compat-browser-version-date",
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
            ? ` (${this.l10n.raw({ id: "compat-browser-version-released", args: { date: browserReleaseDate } })})`
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
      const label = this._getLegendLabel(key);
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
        ${this.l10n("compat-legend")`Legend`}
      </h3>
      <p class="bc-legend-tip">
        ${this.l10n(
          "compat-legend-tip",
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
 * @param {import("@bcd").Identifier} data
 * @param {Partial<import("@bcd").Browsers>} browserInfo
 * @returns {[string[], import("@bcd").BrowserName[]]}
 */
export function gatherPlatformsAndBrowsers(category, data, browserInfo) {
  const runtimes = Object.entries(browserInfo)
    .filter(([, { type }]) => type == "server")
    .map(([key]) => key);

  let platforms = ["desktop", "mobile"];
  if (
    category === "javascript" ||
    runtimes.some(
      (runtime) => data.__compat && runtime in data.__compat.support,
    )
  ) {
    platforms.push("server");
  }

  /** @type {import("@bcd").BrowserName[]} */
  let browsers = [];

  // Add browsers in platform order to align table cells
  for (const platform of platforms) {
    const platformBrowsers = /** @type {import("@bcd").BrowserName[]} */ (
      Object.keys(browserInfo)
    );
    browsers.push(
      ...platformBrowsers.filter(
        (browser) =>
          browser in browserInfo && browserInfo[browser]?.type === platform,
      ),
    );
  }

  // Filter WebExtension browsers in corresponding tables.
  if (category === "webextensions") {
    browsers = browsers.filter(
      (browser) => browserInfo[browser]?.accepts_webextensions,
    );
  }

  // If there is no data for a runtime in a category outside "javascript", hide it.
  if (category !== "javascript") {
    for (const runtime of runtimes) {
      if (data.__compat && !(runtime in data.__compat.support)) {
        browsers = browsers.filter((browser) => browser !== runtime);
      }
    }
  }

  browsers = browsers.filter((browser) => SHOW_BROWSERS.includes(browser));

  return [platforms, [...browsers]];
}
