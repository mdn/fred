# TODO Use comments, see: https://firefox-source-docs.mozilla.org/l10n/fluent/review.html#comments
# TODO Consider using terms, see: https://firefox-source-docs.mozilla.org/l10n/fluent/review.html#terms and https://projectfluent.org/fluent/guide/references.html#message-references

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

reference-toc-header = In this article

footer-mofo = Visit <a data-l10n-name="moco">Mozilla Corporation’s</a> not-for-profit parent, the <a data-l10n-name="mofo">Mozilla Foundation</a>.
footer-copyright = Portions of this content are ©1998–{ $year } by individual mozilla.org contributors. Content available under <a data-l10n-name="cc">a Creative Commons license</a>.

search-modal-site-search = Site search for <em>{ $query }</em>

site-search-search-stats = Found { $results } documents.
site-search-suggestion-matches =  { $relation ->
    [gt] more than { $matches ->
        [one]   { $matches } match
       *[other] { $matches } matches
    }
   *[eq] { $matches ->
        [one]   { $matches } match
       *[other] { $matches } matches
    }
}
site-search-suggestions-text = Did you mean:

blog-time-to-read = { $minutes ->
    [one]   { $minutes } minute read
   *[other] { $minutes } minutes read
}
blog-post-not-found = Blog post not found.

blog-previous = Previous post
blog-next = Next post

-brand-name-obs = HTTP Observatory
obs-report = Report
obs-title = { -brand-name-obs }
obs-landing-intro = Launched in 2016, the { -brand-name-obs } enhances web security by analyzing compliance with best security practices. It has provided insights to over 6.9 million websites through 47 million scans.
obs-assessment = Developed by Mozilla, the { -brand-name-obs } performs an in-depth assessment of a site’s HTTP headers and other key security configurations.
obs-scanning = Its automated scanning process provides developers and website administrators with detailed, actionable feedback, focusing on identifying and addressing potential security vulnerabilities.
obs-security = The tool is instrumental in helping developers and website administrators strengthen their sites against common security threats in a constantly advancing digital environment.
obs-mdn = The { -brand-name-obs } provides effective security insights, guided by Mozilla's expertise and commitment to a safer and more secure internet and based on well-established trends and guidelines.


compat-loading = Loading…

compat-browser-version-date = { $browser } { $version } – Release date: { $date }
compat-browser-version-released = Release date: { $date }

compat-link-report-issue = Report problems with this compatibility data
compat-link-report-issue-title = Report an issue with this compatibility data
compat-link-report-missing-title = Report missing compatibility data
compat-link-report-missing = Report this issue
compat-link-source = View data on GitHub
compat-link-source-title = File: { $filename }

compat-deprecated = Deprecated
compat-experimental = Experimental
compat-nonstandard = Non-standard
compat-no = No

compat-support-full = Full support
compat-support-partial = Partial support
compat-support-no = No support
compat-support-unknown = Support unknown
compat-support-preview = Preview browser support
compat-support-prefix = Implemented with the vendor prefix: { $prefix }
compat-support-altname = Alternate name: { $altname }
compat-support-removed = Removed in { $version } and later
compat-support-see-impl-url = See <a data-l10n-name="impl_url">{ $label }</a>
compat-support-flags =
  { NUMBER($has_added) ->
    [one] From version { $version_added }
    *[other] {""}
  }{ $has_last ->
    [one] { NUMBER($has_added) ->
          *[zero] Until { $versionLast } users
          [one] {" "}until { $versionLast } users
      }
    *[zero] { NUMBER($has_added) ->
          *[zero] Users
          [one] {" "}users
      }
  }
  {" "}must explicitly set the <code data-l10n-name="name">{ $flag_name }</code>{" "}
  { $flag_type ->
    *[preference] preference
    [runtime_flag] runtime flag
  }{ NUMBER($has_value) ->
    [one] {" "}to <code data-l10n-name="value">{ $flag_value }</code>
    *[other] {""}
  }{"."}
  { $flag_type ->
    [preference] To change preferences in { $browser_name }, visit { $browser_pref_url }.
    *[other] {""}
  }

compat-legend = Legend
compat-legend-tip = Tip: you can click/tap on a cell for more information.
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
settings = My settings

example-play-button-label = Play
example-play-button-title = Run example in MDN Playground (opens in new tab)
