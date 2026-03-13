content-feedback-question = War diese Übersetzung hilfreich?
content-feedback-reason = Warum war diese Übersetzung nicht hilfreich?
content-feedback-thanks = Vielen Dank für die Rückmeldung!

reference-toc-header = In diesem Artikel

footer-tagline = Dein Bauplan für ein besseres Internet.
footer-mofo = Besuche die gemeinnützige Muttergesellschaft der <a data-l10n-name="moco">Mozilla Corporation</a>, die <a data-l10n-name="mofo">Mozilla Foundation</a>.
footer-copyright = Teile dieses Inhalts sind ©1998–{ $year } von einzelnen mozilla.org-Mitwirkenden. Inhalte sind verfügbar unter <a data-l10n-name="cc">einer Creative-Commons-Lizenz</a>.

search-modal-site-search = Erweiterte Suche nach <em>{ $query }</em>

site-search-search-stats = { $results } Dokumente gefunden.
site-search-suggestion-matches =  { $relation ->
    [gt] mehr als { $matches ->
        [one]   { $matches } Übereinstimmung
       *[other] { $matches } Übereinstimmungen
    }
   *[eq] { $matches ->
        [one]   { $matches } Übereinstimmung
       *[other] { $matches } Übereinstimmungen
    }
}
site-search-suggestions-text = Meinten Sie:


theme-default = Systemstandard

blog-time-to-read = { $minutes ->
    [one]   { $minutes } Minute Lesezeit
   *[other] { $minutes } Minuten Lesezeit
}
blog-post-not-found = Blogartikel nicht gefunden.

blog-previous = Voriger Artikel
blog-next = Nächster Artikel

No = Nein
Submit = Abschicken
Yes = Ja

obs-report = Report

obs-title = HTTP Observatory
obs-landing-intro = Seit 2016 verbessert HTTP Observatory die Sicherheit durch Analyse der Einhaltung bewährter Sicherheitspraktiken. Es hat durch 47 Millionen Scans Einblicke in über 6,9 Millionen Websites geliefert.
obs-assessment = Das von Mozilla entwickelte HTTP Observatory führt eine umfassende Bewertung der HTTP-Header und weiterer zentraler Sicherheitskonfigurationen einer Website durch.
obs-scanning = Der automatisierte Scan-Prozess liefert Entwicklern und Website-Administratoren detailliertes, handlungsorientiertes Feedback und konzentriert sich darauf, potenzielle Sicherheitslücken zu erkennen und zu beheben.
obs-security = Das Tool unterstützt Entwickler und Website-Administratoren maßgeblich dabei, ihre Websites in einem sich stetig weiterentwickelnden digitalen Umfeld gegen häufige Sicherheitsbedrohungen abzusichern.
obs-mdn = Das HTTP Observatory bietet wirksame Sicherheitseinblicke auf Grundlage von Mozillas Expertise und Engagement für ein sichereres Internet sowie basierend auf etablierten Trends und Richtlinien.

article-footer-last-modified = This page was last modified on <time data-l10n-name="date">{ $date }</time> by <a data-l10n-name="contributors">MDN contributors</a>.
article-footer-source-title = Folder: { $folder } (Opens in a new tab)
baseline-asterisk = Some parts of this feature may have varying levels of support.
baseline-high-extra = This feature is well established and works across many devices and browser versions. It’s been available across browsers since { $date }.
baseline-low-extra = Since { $date }, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
baseline-not-extra = This feature is not Baseline because it does not work in some of the most widely-used browsers.
baseline-supported-in = Supported in { $browsers }
baseline-unsupported-in = Not widely supported in { $browsers }
baseline-supported-and-unsupported-in = Supported in { $supported }, but not widely supported in { $unsupported }
homepage-hero-title = Resources for Developers,<br> by Developers
homepage-hero-description = Documenting <a data-l10n-name="css">CSS</a>, <a data-l10n-name="html">HTML</a>, and <a data-l10n-name="js">JavaScript</a>, since 2005.
not-found-title = Page not found
not-found-description = Sorry, the page <code data-l10n-name="url">{ $url }</code> could not be found.
not-found-fallback-english = <strong data-l10n-name="strong">Good news:</strong> The page you requested exists in <em data-l10n-name="em">English</em>.
not-found-fallback-search = The page you requested doesn't exist, but you could try a site search for:
not-found-back = Go back to the home page
compat-browser-version-date = { $browser } { $version } – Release date: { $date }
compat-browser-version-released = Release date: { $date }
compat-link-source-title = File: { $filename }
compat-support-prefix = Implemented with the vendor prefix: { $prefix }
compat-support-altname = Alternate name: { $altname }
compat-support-removed = Removed in { $version } and later
compat-support-see-impl-url = See <a data-l10n-name="impl_url">{ $label }</a>
compat-support-flags =
    { NUMBER($has_added) ->
        [one] From version { $version_added }
       *[other] { "" }
    }{ $has_last ->
        [one]
            { NUMBER($has_added) ->
               *[zero] Until { $versionLast } users
                [one] { " " }until { $versionLast } users
            }
       *[zero]
            { NUMBER($has_added) ->
               *[zero] Users
                [one] { " " }users
            }
    }
    { " " }must explicitly set the <code data-l10n-name="name">{ $flag_name }</code>{ " " }
    { $flag_type ->
       *[preference] preference
        [runtime_flag] runtime flag
    }{ NUMBER($has_value) ->
        [one] { " " }to <code data-l10n-name="value">{ $flag_value }</code>
       *[other] { "" }
    }{ "." }
    { NUMBER($has_pref_url) ->
        [one]
            { $flag_type ->
                [preference] To change preferences in { $browser_name }, visit { $browser_pref_url }.
               *[other] { "" }
            }
       *[other] { "" }
    }
compat-legend-yes = { compat-support-full }
compat-legend-partial = { compat-support-partial }
compat-legend-preview = In development. Supported in a pre-release version.
compat-legend-no = { compat-support-no }
compat-legend-unknown = Compatibility unknown
compat-legend-experimental = { compat-experimental }. Expect behavior to change in the future.
compat-legend-nonstandard = { compat-nonstandard }. Check cross-browser support before using.
compat-legend-deprecated = { compat-deprecated }. Not for use in new websites.
compat-legend-footnote = See implementation notes.
compat-legend-disabled = User must explicitly enable this feature.
compat-legend-altname = Uses a non-standard name.
compat-legend-prefix = Requires a vendor prefix or different name for use.
compat-legend-more = Has more compatibility info.
placement-note = Ad
placement-no = Don't want to see ads?
pagination-next = Next page
pagination-prev = Previous page
pagination-current = Current page
pagination-goto = Go to page { $page }
logout = Sign out
login = Log in
example-play-button-label = Play
example-play-button-title = Run example in MDN Playground (opens in new tab)
writer-reload-polling = Polling every { $seconds }s
a11y-menu-skip-to-main-content = Skip to main content
a11y-menu-skip-to-search = Skip to search
article-footer-learn-how-to-contribute = Learn how to contribute
article-footer-view-this-page-on-github = View this page on GitHub
article-footer-this-will-take-you-to-github-to = This will take you to GitHub to file a new issue.
article-footer-report-a-problem-with-this-conte = Report a problem with this content
baseline-indicator-baseline-cross = Baseline Cross
baseline-indicator-baseline-check = Baseline Check
baseline-indicator-limited-availability = Limited availability
baseline-indicator-baseline = Baseline
baseline-indicator-widely-available = Widely available
baseline-indicator-newly-available = Newly available
baseline-indicator-check = check
baseline-indicator-cross = cross
baseline-indicator-learn-more = Learn more
baseline-indicator-see-full-compatibility = See full compatibility
baseline-indicator-report-feedback = Report feedback
blog-index-blog-it-better = Blog it better
collection-save-button-save-in-collection = Save in collection
collection-save-button-remove = Remove
collection-save-button-save = Save
collection-save-button-add-to-collection = Add to collection
collection-save-button-collection = Collection:
collection-save-button-saved-articles = Saved articles
collection-save-button-new-collection = New collection
collection-save-button-name = Name:
collection-save-button-note = Note:
collection-save-button-saving = Saving…
collection-save-button-cancel = Cancel
collection-save-button-deleting = Deleting…
collection-save-button-delete = Delete
color-theme-light = Light
color-theme-dark = Dark
color-theme-switch-color-theme = Switch color theme
color-theme-theme = Theme
compat-link-report-issue-title = Report an issue with this compatibility data
compat-link-report-issue = Report problems with this compatibility data
compat-link-source = View data on GitHub
compat-experimental = Experimental
compat-deprecated = Deprecated
compat-nonstandard = Non-standard
compat-support-partial = Partial support
compat-support-preview-browser = Preview browser support
compat-support-full = Full support
compat-support-no = No support
compat-support-unknown = Support unknown
compat-yes = Yes
compat-partial = Partial
compat-no = No
compat-support-preview = Preview support
compat-legend = Legend
compat-legend-tip = Tip: you can click/tap on a cell for more information.
compat-link-report-missing-title = Report missing compatibility data
compat-link-report-missing = Report this issue
compat-js-required = Enable JavaScript to view this browser compatibility table.
compat-loading = Loading…
content-feedback-content-is-out-of-date = Content is out of date
content-feedback-missing-information = Missing information
content-feedback-code-examples-not-working-as-exp = Code examples not working as expected
content-feedback-other = Other
content-feedback-yes = Yes
content-feedback-no = No
content-feedback-submit = Submit
contributor-spotlight-want-to-be-part-of-the-journey = Want to be part of the journey?
contributor-spotlight-our-constant-quest-for-innovatio = Our constant quest for innovation starts here, with you. Every part of MDN (docs, demos and the site itself) springs from our incredible open community of developers. Please join us!
contributor-spotlight-get-involved = Get involved
contributor-spotlight-contributor-profile = Contributor profile
copy-button-copied = Copied
copy-button-copy-failed = Copy failed!
copy-button-copy = Copy
footer-mdn-on-github = MDN on GitHub
footer-mdn-on-bluesky = MDN on Bluesky
footer-mdn-on-x = MDN on X
footer-mdn-on-mastodon = MDN on Mastodon
footer-mdn-blog-rss-feed = MDN blog RSS feed
footer-mdn = MDN
footer-about = About
footer-blog = Blog
footer-mozilla-careers = Mozilla careers
footer-advertise-with-us = Advertise with us
footer-mdn-plus = MDN Plus
footer-product-help = Product help
footer-contribute = Contribute
footer-mdn-community = MDN Community
footer-community-resources = Community resources
footer-writing-guidelines = Writing guidelines
footer-mdn-discord = MDN Discord
footer-developers = Developers
footer-web-technologies = Web technologies
footer-learn-web-development = Learn web development
footer-guides = Guides
footer-tutorials = Tutorials
footer-glossary = Glossary
footer-hacks-blog = Hacks blog
footer-website-privacy-notice = Website Privacy Notice
footer-telemetry-settings = Telemetry Settings
footer-legal = Legal
footer-community-participation-guidelin = Community Participation Guidelines
footer-mdn-logo = MDN logo
footer-mozilla-logo = Mozilla logo
generic-toc__header = In this article
homepage-body-featured-articles = Featured articles
homepage-body-latest-news = Latest news
homepage-body-recent-contributions = Recent contributions
homepage-contributor-spotlight-contributor-spotlight = Contributor Spotlight
homepage-contributor-spotlight-get-involved = Get involved
homepage-search-search-the-site = Search the site
homepage-search-search = Search
interactive-example-reset = Reset
interactive-example-value-select = Value select
interactive-example-the-current-value-is-not-support = The current value is not supported by your browser.
interactive-example-run-example-and-show-console-ou = Run example, and show console output
interactive-example-run = Run
interactive-example-reset-example-and-clear-console = Reset example, and clear console output
interactive-example-console-output = Console output
interactive-example-output = Output
issues-table-loading-issues = loading issues…
issues-table-title = Title
issues-table-repository = Repository
language-switcher-remember-language = Remember language
language-switcher-enable-this-setting-to-always-sw = Enable this setting to always switch to the current language when available. (Click to learn more.)
language-switcher-learn-more = Learn more
login-button-login = Login
modal-exit-modal = Exit modal
navigation-toggle-navigation = Toggle navigation
obs-about-title = About the HTTP Observatory
observatory-landing-read-our-faq = Read our FAQ
observatory-landing-report-feedback = Report Feedback
observatory-rescan-button-rescan = Rescan
observatory-rescan-button-wait-a-minute-to-rescan = Wait a minute to rescan
observatory-results-report-feedback = Report Feedback
observatory-results-faq = FAQ
observatory-tests-and-scores-loading-tests-and-scoring-data = Loading tests and scoring data...
observatory-tests-and-scores-see = See
observatory-tests-and-scores-for-guidance = for guidance.
observatory-tests-and-scores-test-result = Test result
observatory-tests-and-scores-description = Description
observatory-tests-and-scores-modifier = Modifier
observatory-tests-and-scores-failed-to-load-tests-and-scoring = Failed to load tests and scoring data. Please try again later.
pagination-pagination = Pagination
playground-do-you-really-want-to-clear-ever = Do you really want to clear everything?
playground-do-you-really-want-to-revert-you = Do you really want to revert your changes?
playground-playground = Playground
playground-format = Format
playground-run = Run
playground-share = Share
playground-clear = Clear
playground-reset = Reset
playground-seeing-something-inappropriate = Seeing something inappropriate?
playground-console = Console
playground-share-markdown = Share Markdown
playground-copy-markdown-to-clipboard = Copy markdown to clipboard
playground-share-data-url = Share Data URL
playground-copy-data-url-to-clipboard = Copy data URL to clipboard
playground-share-your-code-via-permalink = Share your code via Permalink
playground-copy-to-clipboard = Copy to clipboard
playground-create-link = Create link
playground-report-this-malicious-or-inappro = Report this malicious or inappropriate shared playground.
playground-can-you-please-share-some-detail = Can you please share some details on what's wrong with this content:
playground-cancel = Cancel
playground-report = Report
recently-visited-recently-visited = Recently visited
scrim-inline-clicking-will-load-content-from = Clicking will load content from scrimba.com
scrim-inline-toggle-fullscreen = Toggle fullscreen
scrim-inline-open-on-scrimba = Open on Scrimba
scrim-inline-load-scrim-and-open-dialog = Load scrim and open dialog.
search-button-search-the-site = Search the site
search-modal-loading-search-index = Loading search index…
search-modal-search = Search
search-modal-exit-search = Exit search
sidebar-filter-filter-sidebar = Filter sidebar
sidebar-filter-filter = Filter
sidebar-filter-clear-filter-input = Clear filter input
site-search-search = Search
site-search-previous = Previous
site-search-next = Next
site-search-searching = Searching…
site-search-language = Language
site-search-both = Both
specifications-list-this-feature-does-not-appear-to = This feature does not appear to be defined in any specification.
specifications-list-specification = Specification
survey-hide-this-survey = Hide this survey
survey-take-survey-opens-in-a-new-tab = Take survey (Opens in a new tab)
toggle-sidebar-toggle-sidebar = Toggle sidebar
user-menu-ai-help = AI Help
user-menu-collections = Collections
user-menu-updates = Updates
user-menu-settings = My settings
user-menu-help = Help
user-menu-feedback = Feedback
user-menu-user = User
writer-open-editor-open-in-editor = Open in editor
writer-toolbar-view-on-mdn = View on MDN
