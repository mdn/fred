content-feedback-question = War diese Übersetzung hilfreich?
content-feedback-reason = Warum war diese Übersetzung nicht hilfreich?
content-feedback-thanks = Vielen Dank für die Rückmeldung!

reference-toc-header = In diesem Artikel

footer-tagline = Der Bauplan für ein besseres Internet.
footer-mofo = Besuche die gemeinnützige Muttergesellschaft der <a data-l10n-name="moco">Mozilla Corporation</a>, die <a data-l10n-name="mofo">Mozilla Foundation</a>.
footer-copyright = Teile dieses Inhalts sind ©1998–{ $year } von einzelnen mozilla.org-Mitwirkenden. Inhalte sind verfügbar unter <a data-l10n-name="cc">einer Creative-Commons-Lizenz</a>.

search-modal-site-search = Website-Suche nach <em>{ $query }</em>

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


theme-default = System

blog-time-to-read = { $minutes ->
    [one]   { $minutes } Minute Lesezeit
   *[other] { $minutes } Minuten Lesezeit
}
blog-post-not-found = Blogartikel nicht gefunden.

blog-previous = Voriger Artikel
blog-previous = Vorheriger Beitrag
blog-next = Nächster Beitrag

No = Nein
Submit = Absenden
Yes = Ja

obs-report = Bericht

obs-title = HTTP Observatory
obs-landing-intro = Seit 2016 verbessert HTTP Observatory die Sicherheit durch Analyse der Einhaltung bewährter Sicherheitspraktiken. Es hat durch 47 Millionen Scans Einblicke in über 6,9 Millionen Websites geliefert.
obs-assessment = Das von Mozilla entwickelte HTTP Observatory führt eine umfassende Bewertung der HTTP-Header und weiterer zentraler Sicherheitskonfigurationen einer Website durch.
obs-scanning = Der automatisierte Scan-Prozess liefert detailliertes, handlungsorientiertes Feedback für Entwicklungsteams und Website-Administration und konzentriert sich darauf, potenzielle Sicherheitslücken zu erkennen und zu beheben.
obs-security = Das Tool unterstützt Entwicklungsteams und Website-Administration dabei, Websites in einem sich stetig weiterentwickelnden digitalen Umfeld gegen häufige Sicherheitsbedrohungen abzusichern.
obs-mdn = Das HTTP Observatory bietet wirksame Sicherheitseinblicke auf Grundlage von Mozillas Expertise und Engagement für ein sichereres Internet sowie basierend auf etablierten Trends und Richtlinien.

article-footer-last-modified = Diese Seite wurde zuletzt am <time data-l10n-name="date">{ $date }</time> von <a data-l10n-name="contributors">MDN-Mitwirkenden</a> bearbeitet.
article-footer-source-title = Ordner: { $folder } (öffnet in neuem Tab)
baseline-asterisk = Einige Teile dieser Funktion werden möglicherweise unterschiedlich gut unterstützt.
baseline-high-extra = Diese Funktion ist gut etabliert und funktioniert auf vielen Geräten und in vielen Browserversionen. Sie ist seit { $date } browserübergreifend verfügbar.
baseline-low-extra = Seit { $date } funktioniert diese Funktion auf aktuellen Geräten und in aktuellen Browserversionen. Auf älteren Geräten oder in älteren Browsern funktioniert sie möglicherweise nicht.
baseline-not-extra = Diese Funktion ist nicht Baseline, da sie in einigen der am weitesten verbreiteten Browser nicht funktioniert.
baseline-supported-in = Unterstützt in { $browsers }
baseline-unsupported-in = In { $browsers } nicht weitgehend unterstützt
baseline-supported-and-unsupported-in = Unterstützt in { $supported }, aber in { $unsupported } nicht weitgehend unterstützt
homepage-hero-title = Ressourcen für Entwickelnde,<br> von Entwickelnden
homepage-hero-description = Dokumentation zu <a data-l10n-name="css">CSS</a>, <a data-l10n-name="html">HTML</a> und <a data-l10n-name="js">JavaScript</a> – seit 2005.
not-found-title = Seite nicht gefunden
not-found-description = Entschuldigung, die Seite <code data-l10n-name="url">{ $url }</code> wurde nicht gefunden.
not-found-fallback-english = <strong data-l10n-name="strong">Gute Nachricht:</strong> Die angeforderte Seite existiert auf <em data-l10n-name="em">Englisch</em>.
not-found-fallback-search = Die angeforderte Seite existiert nicht, aber Sie könnten eine Website-Suche versuchen nach:
not-found-back = Zurück zur Startseite
compat-browser-version-date = { $browser } { $version } – Veröffentlichungsdatum: { $date }
compat-browser-version-released = Veröffentlichungsdatum: { $date }
compat-link-source-title = Datei: { $filename }
compat-support-prefix = Implementiert mit dem Hersteller-Präfix: { $prefix }
compat-support-altname = Alternativer Name: { $altname }
compat-support-removed = Ab { $version } entfernt
compat-support-see-impl-url = Siehe <a data-l10n-name="impl_url">{ $label }</a>
compat-support-flags =
    { NUMBER($has_added) ->
        [one] Ab Version { $version_added }
        *[other] { "" }
    }{ $has_last ->
        [one]
            { NUMBER($has_added) ->
                *[zero] Bis { $versionLast } muss
                [one] { " " }bis { $versionLast } muss
            }
        *[zero]
            { NUMBER($has_added) ->
                *[zero] muss
                [one] { " " }muss
            }
    }
    { " " }die Einstellung <code data-l10n-name="name">{ $flag_name }</code>{ " " }
    { $flag_type ->
        *[preference] explizit festgelegt werden
        [runtime_flag] als Laufzeit-Flag explizit festgelegt werden

    }{ NUMBER($has_value) ->
        [one] { " " }auf <code data-l10n-name="value">{ $flag_value }</code>
        *[other] { "" }
    }{ "." }
    { NUMBER($has_pref_url) ->
        [one]
            { $flag_type ->
                [preference] Um die Einstellungen in { $browser_name } zu ändern, besuchen Sie { $browser_pref_url }.
                *[other] { "" }
            }
        *[other] { "" }
    }
compat-legend-yes = { compat-support-full }
compat-legend-partial = { compat-support-partial }
compat-legend-preview = In Entwicklung. In einer Vorabversion unterstützt.
compat-legend-no = { compat-support-no }
compat-legend-unknown = Kompatibilität unbekannt
compat-legend-experimental = { compat-experimental }. Verhaltensänderungen in der Zukunft sind zu erwarten.
compat-legend-nonstandard = { compat-nonstandard }. Überprüfen Sie die browserübergreifende Unterstützung vor der Verwendung.
compat-legend-deprecated = { compat-deprecated }. Nicht für neue Websites verwenden.
compat-legend-footnote = Implementierungshinweise ansehen.
compat-legend-disabled = Diese Funktion muss explizit aktiviert werden.
compat-legend-altname = Verwendet einen nicht standardmäßigen Namen.
compat-legend-prefix = Erfordert ein Hersteller-Präfix oder einen anderen Namen zur Verwendung.
compat-legend-more = Hat mehr Kompatibilitätsinformationen.
placement-note = Anzeige
placement-no = Keine Werbung erwünscht?
pagination-next = Nächste Seite
pagination-prev = Vorherige Seite
pagination-current = Aktuelle Seite
pagination-goto = Zur Seite { $page }
logout = Abmelden
login = Anmelden
example-play-button-label = Abspielen
example-play-button-title = Beispiel im MDN Playground ausführen (öffnet in neuem Tab)
writer-reload-polling = Aktualisierung alle { $seconds } s
a11y-menu-skip-to-main-content = Zum Hauptinhalt springen
a11y-menu-skip-to-search = Zur Suche springen
article-footer-learn-how-to-contribute = Erfahren Sie, wie Sie beitragen können
article-footer-view-this-page-on-github = Diese Seite auf GitHub ansehen
article-footer-this-will-take-you-to-github-to = Dies führt Sie zu GitHub, um ein neues Problem zu melden.
article-footer-report-a-problem-with-this-conte = Ein Problem mit diesem Inhalt melden
baseline-indicator-baseline-cross = Baseline (nicht erfüllt)
baseline-indicator-baseline-check = Baseline (erfüllt)
baseline-indicator-limited-availability = Eingeschränkt verfügbar
baseline-indicator-baseline = Baseline
baseline-indicator-widely-available = Weitgehend verfügbar
baseline-indicator-newly-available = Neu verfügbar
baseline-indicator-check = Häkchen
baseline-indicator-cross = Kreuz
baseline-indicator-learn-more = Mehr erfahren
baseline-indicator-see-full-compatibility = Vollständige Kompatibilität anzeigen
baseline-indicator-report-feedback = Feedback geben
blog-index-blog-it-better = Blog it better
collection-save-button-save-in-collection = In einer Sammlung speichern
collection-save-button-remove = Entfernen
collection-save-button-save = Speichern
collection-save-button-add-to-collection = Zur Sammlung hinzufügen
collection-save-button-collection = Sammlung:
collection-save-button-saved-articles = Gespeicherte Artikel
collection-save-button-new-collection = Neue Sammlung
collection-save-button-name = Name:
collection-save-button-note = Notiz:
collection-save-button-saving = Wird gespeichert…
collection-save-button-cancel = Abbrechen
collection-save-button-deleting = Wird gelöscht…
collection-save-button-delete = Löschen
theme-default = Systemstandard
color-theme-light = Hell
color-theme-dark = Dunkel
color-theme-switch-color-theme = Farbschema wechseln
color-theme-theme = Farbschema
compat-link-report-issue-title = Ein Problem mit diesen Kompatibilitätsdaten melden
compat-link-report-issue = Probleme mit diesen Kompatibilitätsdaten melden
compat-link-source = Daten auf GitHub ansehen
compat-experimental = Experimentell
compat-deprecated = Veraltet
compat-nonstandard = Nicht standardisiert
compat-support-partial = Teilweise unterstützt
compat-support-preview-browser = Unterstützung in einer Vorabversion des Browsers
compat-support-full = Vollständig unterstützt
compat-support-no = Nicht unterstützt
compat-support-unknown = Unterstützung unbekannt
compat-yes = Ja
compat-partial = Teilweise
compat-no = Nein
compat-support-preview = Unterstützt in Vorabversion
compat-legend = Legende
compat-legend-tip = Tipp: Sie können auf eine Zelle klicken oder tippen, um weitere Informationen zu erhalten.
compat-link-report-missing-title = Fehlende Kompatibilitätsdaten melden
compat-link-report-missing = Dieses Problem melden
compat-js-required = JavaScript aktivieren, um diese Browser-Kompatibilitätstabelle anzuzeigen.
compat-loading = Wird geladen…
content-feedback-content-is-out-of-date = Inhalt ist veraltet
content-feedback-missing-information = Fehlende Informationen
content-feedback-code-examples-not-working-as-exp = Codebeispiele funktionieren nicht wie erwartet
content-feedback-other = Sonstiges
content-feedback-yes = Ja
content-feedback-no = Nein
content-feedback-submit = Absenden
contributor-spotlight-want-to-be-part-of-the-journey = Möchten Sie Teil der Reise sein?
contributor-spotlight-our-constant-quest-for-innovatio = Unsere ständige Suche nach Innovation beginnt hier, mit Ihnen. Jeder Teil von MDN (Dokumentationen, Demos und die Website selbst) entsteht aus unserer großartigen offenen Entwicklergemeinschaft. Bitte machen Sie mit!
contributor-spotlight-get-involved = Mitmachen
contributor-spotlight-contributor-profile = Mitwirkendenprofil
copy-button-copied = Kopiert
copy-button-copy-failed = Kopieren fehlgeschlagen!
copy-button-copy = Kopieren
footer-mdn-on-github = MDN auf GitHub
footer-mdn-on-bluesky = MDN auf Bluesky
footer-mdn-on-x = MDN auf X
footer-mdn-on-mastodon = MDN auf Mastodon
footer-mdn-blog-rss-feed = MDN-Blog-RSS-Feed
footer-mdn = MDN
footer-about = Über uns
footer-blog = Blog
footer-mozilla-careers = Jobs bei Mozilla
footer-advertise-with-us = Mit uns werben
footer-mdn-plus = MDN Plus
footer-product-help = Produkthilfe
footer-contribute = Mitmachen
footer-mdn-community = MDN-Community
footer-community-resources = Community-Ressourcen
footer-writing-guidelines = Schreibrichtlinien
footer-mdn-discord = MDN-Discord
footer-developers = Entwicklung
footer-web-technologies = Webtechnologien
footer-learn-web-development = Webentwicklung lernen
footer-guides = Leitfäden
footer-tutorials = Tutorials
footer-glossary = Glossar
footer-hacks-blog = Hacks-Blog
footer-website-privacy-notice = Datenschutzerklärung der Website
footer-telemetry-settings = Telemetrie-Einstellungen
footer-legal = Rechtliches
footer-community-participation-guidelin = Community-Teilnahmerichtlinien
footer-mdn-logo = MDN-Logo
footer-mozilla-logo = Mozilla-Logo
generic-toc__header = In diesem Artikel
homepage-body-featured-articles = Ausgewählte Artikel
homepage-body-latest-news = Neuigkeiten
homepage-body-recent-contributions = Neueste Beiträge
homepage-contributor-spotlight-contributor-spotlight = Mitwirkende im Fokus
homepage-contributor-spotlight-get-involved = Mitmachen
homepage-search-search-the-site = Website durchsuchen
homepage-search-search = Suche
interactive-example-reset = Zurücksetzen
interactive-example-value-select = Wertauswahl
interactive-example-the-current-value-is-not-support = Der aktuelle Wert wird von Ihrem Browser nicht unterstützt.
interactive-example-run-example-and-show-console-ou = Beispiel ausführen und Konsolenausgabe anzeigen
interactive-example-run = Ausführen
interactive-example-reset-example-and-clear-console = Beispiel zurücksetzen und Konsolenausgabe löschen
interactive-example-console-output = Konsolenausgabe
interactive-example-output = Ausgabe
issues-table-loading-issues = GitHub-Issues werden geladen…
issues-table-title = Titel
issues-table-repository = Repository
language-switcher-remember-language = Sprache merken
language-switcher-enable-this-setting-to-always-sw = Aktivieren Sie diese Einstellung, um immer zur aktuell ausgewählten Sprache zu wechseln, wenn sie verfügbar ist. (Klicken Sie hier, um mehr zu erfahren.)
language-switcher-learn-more = Mehr erfahren
login-button-login = Anmelden
modal-exit-modal = Modal schließen
navigation-toggle-navigation = Navigation umschalten
obs-about-title = Über das HTTP Observatory
observatory-landing-read-our-faq = FAQ lesen
observatory-landing-report-feedback = Feedback geben
observatory-rescan-button-rescan = Erneut scannen
observatory-rescan-button-wait-a-minute-to-rescan = Warten Sie eine Minute, um erneut zu scannen
observatory-results-report-feedback = Feedback geben
observatory-results-faq = FAQ
observatory-tests-and-scores-loading-tests-and-scoring-data = Tests und Bewertungsdaten werden geladen…
observatory-tests-and-scores-see = Siehe
observatory-tests-and-scores-for-guidance = für weitere Hinweise.
observatory-tests-and-scores-test-result = Testergebnis
observatory-tests-and-scores-description = Beschreibung
observatory-tests-and-scores-modifier = Modifikator
observatory-tests-and-scores-failed-to-load-tests-and-scoring = Tests und Bewertungsdaten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.
pagination-pagination = Seitennavigation
playground-do-you-really-want-to-clear-ever = Wirklich alles löschen?
playground-do-you-really-want-to-revert-you = Alle Änderungen zurücksetzen?
playground-playground = Playground
playground-format = Formatieren
playground-run = Ausführen
playground-share = Teilen
playground-clear = Leeren
playground-reset = Zurücksetzen
playground-seeing-something-inappropriate = Sehen Sie etwas Unangemessenes?
playground-console = Konsole
playground-share-markdown = Markdown teilen
playground-copy-markdown-to-clipboard = Markdown in die Zwischenablage kopieren
playground-share-data-url = Code via Daten-URL teilen
playground-copy-data-url-to-clipboard = Daten-URL in die Zwischenablage kopieren
playground-share-your-code-via-permalink = Code via Permalink teilen
playground-copy-to-clipboard = In die Zwischenablage kopieren
playground-create-link = Link erstellen
playground-report-this-malicious-or-inappro = Diesen Playground wegen schädlicher oder unangemessener Inhalte melden
playground-can-you-please-share-some-detail = Bitte beschreiben Sie kurz, was an diesem Inhalt problematisch ist:
playground-cancel = Abbrechen
playground-report = Melden
recently-visited-recently-visited = Zuletzt besucht
scrim-inline-clicking-will-load-content-from = Durch Klicken werden Inhalte von scrimba.com geladen
scrim-inline-toggle-fullscreen = Vollbild umschalten
scrim-inline-open-on-scrimba = Auf Scrimba öffnen
scrim-inline-load-scrim-and-open-dialog = Scrim laden und Dialog öffnen.
search-button-search-the-site = Website durchsuchen
search-modal-loading-search-index = Suchindex wird geladen…
search-modal-search = Suche
search-modal-exit-search = Suche schließen
sidebar-filter-filter-sidebar = Seitenleiste filtern
sidebar-filter-filter = Filtern
sidebar-filter-clear-filter-input = Filterfeld leeren
site-search-search = Suchen
site-search-previous = Zurück
site-search-next = Weiter
site-search-suggestions-text = Meinten Sie …?
site-search-searching = Suche läuft…
site-search-language = Sprache
site-search-both = Beides
specifications-list-this-feature-does-not-appear-to = Diese Funktion scheint in keiner Spezifikation definiert zu sein.
specifications-list-specification = Spezifikation
survey-hide-this-survey = Diese Umfrage ausblenden
survey-take-survey-opens-in-a-new-tab = An der Umfrage teilnehmen (öffnet in neuem Tab)
toggle-sidebar-toggle-sidebar = Seitenleiste umschalten
user-menu-ai-help = KI-Hilfe
user-menu-collections = Sammlungen
user-menu-updates = Updates
user-menu-settings = Meine Einstellungen
user-menu-help = Hilfe
user-menu-feedback = Feedback
user-menu-user = Konto
writer-open-editor-open-in-editor = Im Editor öffnen
writer-toolbar-view-on-mdn = Auf MDN anzeigen
