# TODO Use kebab-case, see: https://firefox-source-docs.mozilla.org/l10n/fluent/review.html#message-identifiers
# TODO Use comments, see: https://firefox-source-docs.mozilla.org/l10n/fluent/review.html#comments
# TODO Consider using terms, see: https://firefox-source-docs.mozilla.org/l10n/fluent/review.html#terms and https://projectfluent.org/fluent/guide/references.html#message-references

article-footer_last-modified = This page was last modified on <time data-l10n-name="date">{ $date }</timestamp> by <a data-l10n-name="contributors">MDN contributors</a>.
article-footer_source_title = Folder: { $folder } (Opens in a new tab)

baseline_asterisk = { $asterisk } Some parts of this feature may have varying levels of support.
baseline_high_extra = This feature is well established and works across many devices and browser versions. It’s been available across browsers since { $date }.
baseline_low_extra = Since { $date }, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
baseline_not_extra = This feature is not Baseline because it does not work in some of the most widely-used browsers.
baseline_supported_in = Supported in { $browsers }
baseline_unsupported_in = Not widely supported in { $browsers }
baseline_supported_and_unsupported_in = Supported in { $supported }, but not widely supported in { $unsupported }

homepage-hero_title = Resources for <u data-l10n-name="developers">Developers</u>,<br> by Developers
homepage-hero_description = Documenting <a data-l10n-name="css">CSS</a>, <a data-l10n-name="html">HTML</a>, and <a data-l10n-name="js">JavaScript</a>, since 2005.

not_found_title = Page not found
not_found_description = Sorry, the page <code data-l10n-name="url">{ $url }</code> could not be found.
not_found_fallback_english = <strong data-l10n-name="strong">Good news:</strong> The page you requested exists in <em data-l10n-name="em">English</em>.
not_found_fallback_search = The page you requested doesn't exist, but you could try a site search for:
not_found_back = Go back to the home page

reference_toc_header = In this article

footer_mofo = Visit <a data-l10n-name="moco">Mozilla Corporation’s</a> not-for-profit parent, the <a data-l10n-name="mofo">Mozilla Foundation</a>.
footer_copyright = Portions of this content are ©1998–2024 by individual mozilla.org contributors. Content available under <a data-l10n-name="cc">a Creative Commons license</a>.

search_title = Search results for: <em>{ $query }</em>
search_stats = Found { $results } matches in { $time } milliseconds.

search-modal_site-search = Site search for <em>{ $query }</em>

blog_time_to_read = { $minutes ->
    [one]   { $minutes } minute read
   *[other] { $minutes } minutes read
}
blog_post_not_found = Blog post not found.

blog_previous = Previous Post
blog_next = Next Post

Report = Report

obs_title = HTTP Observatory
obs_landing_intro = Launched in 2016, the HTTP Observatory enhances web security by analyzing compliance with best security practices. It has provided insights to over 6.9 million websites through 47 million scans.
obs_assessment = Developed by Mozilla, the HTTP Observatory performs an in-depth assessment of a site’s HTTP headers and other key security configurations.
obs_scanning = Its automated scanning process provides developers and website administrators with detailed, actionable feedback, focusing on identifying and addressing potential security vulnerabilities.
obs_security = The tool is instrumental in helping developers and website administrators strengthen their sites against common security threats in a constantly advancing digital environment.
obs_mdn = The HTTP Observatory provides effective security insights, guided by Mozilla's expertise and commitment to a safer and more secure internet and based on well-established trends and guidelines.


compat_loading = Loading…

compat_browser_version_date = { $browser } { $version } – Released { $date }

compat_link_report_issue = Report problems with this compatibility data
compat_link_report_issue_title = Report an issue with this compatibility data
compat_link_report_missing_title = Report missing compatibility data
compat_link_report_missing = Report this issue
compat_link_source = View data on GitHub
compat_link_source_title = File: { $filename }

compat_deprecated = Deprecated
compat_experimental = Experimental
compat_nonstandard = Non-standard
compat_no = No

compat_support_full = Full support
compat_support_partial = Partial support
compat_support_no = No support
compat_support_unknown = Support unknown
compat_support_preview = Preview browser support
compat_support_prefix = Implemented with the vendor prefix: { $prefix }
compat_support_altname = Alternate name: { $altname }
compat_support_removed = Removed in { $version } and later
compat_support_see_impl_url = See <a data-l10n-name="impl_url">{ $label }</a>

compat_legend = Legend
compat_legend_tip = Tip: you can click/tap on a cell for more information.
compat_legend_yes = { compat_support_full }
compat_legend_partial = { compat_support_partial }
compat_legend_preview = In development. Supported in a pre-release version.
compat_legend_no = { compat_support_no }
compat_legend_unknown = Compatibility unknown
compat_legend_experimental = { compat_experimental }. Expect behavior to change in the future.
compat_legend_nonstandard = { compat_nonstandard }. Check cross-browser support before using.
compat_legend_deprecated = { compat_deprecated }. Not for use in new websites.
compat_legend_footnote = See implementation notes.
compat_legend_disabled = User must explicitly enable this feature.
compat_legend_altname = Uses a non-standard name.
compat_legend_prefix = Requires a vendor prefix or different name for use.
compat_legend_more = Has more compatibility info.

sidebar-filter-matches = { $matches ->
  [0] No matches
  [1] { $matches } match
   *[other] { $matches } matches
}

placement_note = Ad
placement_no = Don't want to see ads?

pagination_next = Next page
pagination_prev = Previous page
pagination_current = Current page
pagination_goto = Go to page { $page }

logout = Sign out
login = Log in
settings = My Settings
