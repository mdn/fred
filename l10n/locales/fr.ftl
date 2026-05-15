article-footer-last-modified = Cette page a été modifiée le <time data-l10n-name="date">{ $date }</time> par les <a data-l10n-name="contributors">contributeur·ice·s du MDN</a>.
article-footer-source-title = Dossier : { $folder } (Ouvre un onglet)
baseline-asterisk = Certaines parties de cette fonctionnalité peuvent bénéficier de prise en charge variables.
baseline-high-extra = Cette fonctionnalité est bien établie et fonctionne sur de nombreux appareils et versions de navigateurs. Elle est disponible sur tous les navigateurs depuis { $date }.
baseline-low-extra = Depuis { $date }, cette fonctionnalité fonctionne sur les appareils et les versions de navigateur les plus récents. Elle peut ne pas fonctionner sur les appareils ou navigateurs plus anciens.
baseline-not-extra = Cette fonctionnalité n'est pas Compatible car elle ne fonctionne pas dans certains des navigateurs les plus utilisés.
baseline-supported-in = Pris en charge dans { $browsers }
baseline-unsupported-in = Pas complètement pris en charge dans { $browsers }
baseline-supported-and-unsupported-in = Pris en charge dans { $supported }, mais pas complètement pris en charge dans { $unsupported }
homepage-hero-title = Des ressources pour les Développeuses et Développeurs,<br> par des Développeuses et Développeurs
homepage-hero-description = Documenter le <a data-l10n-name="css">CSS</a>, le <a data-l10n-name="html">HTML</a> et le <a data-l10n-name="js">JavaScript</a>, depuis 2005.
not-found-title = Page non trouvée
not-found-description = Désolé, la page <code data-l10n-name="url">{ $url }</code> n'a pas été trouvée.
not-found-fallback-english = <strong data-l10n-name="strong">Bonne nouvelle :</strong> La page que vous cherchez existe en <em data-l10n-name="em">Anglais</em>.
not-found-fallback-search = La page que vous avez demandée n'existe pas, mais vous pouvez essayer une recherche sur le site pour :
not-found-back = Retour à la page d'accueil
footer-mofo = Visitez la société mère à but non lucratif de <a data-l10n-name="moco">Mozilla Corporation</a>, la <a data-l10n-name="mofo">Fondation Mozilla</a>.
footer-copyright = Certaines parties de ce contenu sont protégées par le droit d'auteur ©1998—{ $year } des contributeurs individuels de mozilla.org. Contenu disponible sous <a data-l10n-name="cc">une licence Creative Commons</a>.
search-modal-site-search = Rechercher sur le site <em>{ $query }</em>
site-search-search-stats = { $results } documents trouvés.
site-search-suggestion-matches =
    { $relation ->
        [gt]
            plus que { $matches ->
                [one] { $matches } trouvé
               *[other] { $matches } trouvés
            }
       *[eq]
            { $matches ->
                [one] { $matches } trouvé
                *[other] { $matches } trouvés
            }
    }
blog-time-to-read =
    { $minutes ->
        [one] { $minutes } minute de lecture
        *[other] { $minutes } minutes de lecture
    }
-brand-name-obs = HTTP Observatory
obs-report = Rapport
obs-title = { -brand-name-obs }
obs-landing-intro = Lancé en 2016, { -brand-name-obs } améliore la sécurité du Web en analysant la conformité aux meilleures pratiques en matière de sécurité. Il a fourni des informations à plus de 6,9 millions de sites web grâce à 47 millions d'analyses.
obs-assessment = Développé par Mozilla, { -brand-name-obs } effectue une évaluation approfondie des en-têtes HTTP d'un site et d'autres configurations de sécurité clés.
obs-scanning = Son processus d'analyse automatisé fournit aux développeur·euse·s et aux administrateur·ice·s de sites web des commentaires détaillés et exploitables, axés sur l'identification et la résolution des failles de sécurité potentielles.
obs-security = Cet outil aide les développeur·euse·s et les administrateur·ice·s de sites web à renforcer la sécurité de leurs sites contre les menaces courantes dans un environnement numérique en constante évolution.
obs-mdn = { -brand-name-obs } fournit des informations efficaces en matière de sécurité, guidées par l'expertise et l'engagement de Mozilla en faveur d'un Internet plus sûr et plus sécurisé, et basées sur des tendances et des directives bien établies.
compat-browser-version-date = { $browser } { $version } — Date de sortie : { $date }
compat-browser-version-released = Date de sortie : { $date }
compat-link-source-title = Fichier : { $filename }
compat-support-prefix = Implémenté avec le préfixe vendeur : { $prefix }
compat-support-altname = Nom alternatif : { $altname }
compat-support-removed = Supprimé en version { $version } et supérieure
compat-support-see-impl-url = Voir <a data-l10n-name="impl_url">{ $label }</a>
compat-support-flags =
    { $has_added ->
        [1] De la version { $version_added }
       *[0] { "" }
    }{ $has_last ->
        [1]
            { $has_added ->
               *[0] Jusqu'à la version { $versionLast }, les utilisateur·ice·s
                [1] { " " }jusqu'à { $versionLast }, les utilisateur·ice·s
            }
       *[0]
            { $has_added ->
               *[0] Les utilisateur·ice·s
                [1] {" "}les utilisateur·ice·s
            }
    }
    { " " }doivent explicitement définir
    { $flag_type ->
       *[preference] la préférence
        [runtime_flag] l'indicateur d'exécution
    }
    { " " }<code data-l10n-name="name">{ $flag_name }</code>
    { $has_value ->
        [1] { " " }à <code data-l10n-name="value">{ $flag_value }</code>
       *[0] { "" }
    }{"."}
    { $has_pref_url ->
        [1]
            { $flag_type ->
                [preference] Pour changer vos préférences sur le navigateur { $browser_name }, visitez { $browser_pref_url }.
               *[other] { "" }
            }
       *[0] { "" }
    }
compat-legend-yes = { compat-support-full }
compat-legend-partial = { compat-support-partial }
compat-legend-preview = En cours de développement. Pris en charge dans une pré-version.
compat-legend-no = { compat-support-no }
compat-legend-unknown = Compatibilité inconnue
compat-legend-experimental = { compat-experimental }. Attendez-vous à ce que les comportements changent à l'avenir.
compat-legend-nonstandard = { compat-nonstandard }. Vérifiez la compatibilité entre les navigateurs avant utilisation.
compat-legend-deprecated = { compat-deprecated }. Ne pas utiliser dans les nouveaux sites web.
compat-legend-footnote = Voir les notes de mise en application.
compat-legend-disabled = L'utilisateur·ice doit explicitement activer cette fonctionnalité.
compat-legend-altname = Utilise un nom hors standard.
compat-legend-prefix = Nécessite un préfixe vendeur ou un nom différent pour être utilisé.
compat-legend-more = Contient davantage d'informations sur la compatibilité.
placement-note = Publicité
placement-no = Vous ne voulez pas voir de publicités ?
pagination-next = Page suivante
pagination-prev = Page précédente
pagination-current = Page actuelle
pagination-goto = Aller à la page { $page }
logout = Se déconnecter
login = Se connecter
example-play-button-label = Exécuter
example-play-button-title = Exécutez l'exemple dans MDN Playground (ouvre un nouvel onglet)
writer-reload-polling = Analyse toutes les { $seconds }s
a11y-menu-skip-to-main-content = Passer au contenu principal
a11y-menu-skip-to-search = Passer à la recherche
article-footer-title = Aider à améliorer MDN
article-footer-learn-how-to-contribute = Apprendre à contribuer
article-footer-view-this-page-on-github = Voir cette page sur GitHub
article-footer-this-will-take-you-to-github-to = Cela vous mènera à GitHub pour créer un nouveau problème.
article-footer-report-a-problem-with-this-conte = Signaler un problème avec ce contenu
baseline-indicator-baseline-cross = Croix de Baseline
baseline-indicator-baseline-check = Coche de Baseline
baseline-indicator-limited-availability = Disponibilité limitée
baseline-indicator-baseline = Baseline
baseline-indicator-widely-available = Large disponibilité
baseline-indicator-newly-available = Nouvellement disponible
baseline-indicator-check = coche
baseline-indicator-cross = croix
baseline-indicator-learn-more = En savoir plus
baseline-indicator-see-full-compatibility = Voir la compatibilité complète
baseline-indicator-report-feedback = Faire un retour
blog-previous = Article précédent
blog-next = Article suivant
blog-index-blog-it-better = Bloguez mieux
reference-toc-header = Dans cet article
blog-post-not-found = Article de blog introuvable.
collection-save-button-save-in-collection = Enregistrer dans la collection
collection-save-button-remove = Supprimer
collection-save-button-save = Enregistrer
collection-save-button-add-to-collection = Ajouter à la collection
collection-save-button-collection = Collection :
collection-save-button-saved-articles = Articles enregistrés
collection-save-button-new-collection = Nouvelle collection
collection-save-button-name = Nom :
collection-save-button-note = Note :
collection-save-button-saving = Enregistrement…
collection-save-button-cancel = Annuler
collection-save-button-deleting = Suppression…
collection-save-button-delete = Supprimer
theme-default = Automatique
color-theme-light = Clair
color-theme-dark = Sombre
color-theme-switch-color-theme = Changer le thème de couleur
color-theme-theme = Thème
compat-link-report-issue-title = Signaler un problème avec ces données de compatibilité
compat-link-report-issue = Signaler des problèmes avec ces données de compatibilité
compat-link-source = Voir les données sur GitHub
compat-experimental = Expérimental
compat-deprecated = Obsolète
compat-nonstandard = Non standard
compat-support-partial = Prise en charge partielle
compat-support-preview-browser = Pris en charge dans une pré-version du navigateur
compat-support-full = Prise en charge complète
compat-support-no = Pas de prise en charge
compat-support-unknown = Prise en charge inconnue
compat-support-preview = Pris en charge dans une pré-version.
compat-yes = Oui
compat-partial = Partiel
compat-no = Non
compat-legend = Légende
compat-legend-tip = Astuce : cliquer/appuyer sur une cellule pour obtenir plus d'informations.
compat-link-report-missing-title = Signaler des données de compatibilité manquantes
compat-link-report-missing = Signaler le problème
compat-js-required = Activez JavaScript pour afficher ce tableau de compatibilité des navigateurs.
compat-loading = Chargement…
content-feedback-content-is-out-of-date = Le contenu n'est pas à jour
content-feedback-missing-information = Informations manquantes
content-feedback-code-examples-not-working-as-exp = Les exemples de code ne fonctionnent pas comme prévu
content-feedback-other = Autre
content-feedback-question = Cette page vous a-t-elle été utile ?
content-feedback-yes = Oui
content-feedback-no = Non
content-feedback-reason = Pourquoi cette page ne vous a-t-elle pas été utile ?
content-feedback-submit = Envoyer
content-feedback-thanks = Merci pour votre commentaire !
contributor-spotlight-want-to-be-part-of-the-journey = Voulez-vous faire partie de l'aventure ?
contributor-spotlight-our-constant-quest-for-innovatio = Notre quête constante d'innovation commence ici, avec vous. Chaque partie de MDN (docs, démos et le site lui-même) provient de notre incroyable communauté ouverte de développeur·euse·s. Rejoignez-nous !
contributor-spotlight-get-involved = Participez
contributor-spotlight-contributor-profile = Profil de contributeur·ice
copy-button-copied = Copié
copy-button-copy-failed = Échec de la copie !
copy-button-copy = Copier
footer-mdn-on-github = MDN sur GitHub
footer-mdn-on-bluesky = MDN sur Bluesky
footer-mdn-on-x = MDN sur X
footer-mdn-on-mastodon = MDN sur Mastodon
footer-mdn-blog-rss-feed = Flux RSS du blog MDN
footer-mdn = MDN
footer-about = À propos
footer-blog = Blog
footer-mozilla-careers = Offres d'emploi chez Mozilla
footer-advertise-with-us = Faites de la publicité avec nous
footer-mdn-plus = MDN Plus
footer-product-help = Assistance produit
footer-contribute = Contribuer
footer-mdn-community = Communauté MDN
footer-community-resources = Ressources communautaires
footer-writing-guidelines = Directives de rédaction
footer-mdn-discord = Discord MDN
footer-developers = Développeur·euse·s
footer-web-technologies = Technologies web
footer-learn-web-development = Apprendre le développement web
footer-guides = Guides
footer-tutorials = Tutoriels
footer-glossary = Glossaire
footer-hacks-blog = Blog Hacks
footer-website-privacy-notice = Politique de confidentialité du site web
footer-telemetry-settings = Paramètres de télémétrie
footer-legal = Mentions légales
footer-community-participation-guidelin = Directives de participation communautaire
footer-mdn-logo = Logo MDN
footer-tagline = Votre modèle pour un internet meilleur.
footer-mozilla-logo = Logo Mozilla
generic-toc__header = Dans cet article
homepage-body-featured-articles = Articles en vedette
homepage-body-latest-news = Dernières nouvelles
homepage-body-recent-contributions = Contributions récentes
homepage-contributor-spotlight-contributor-spotlight = Projecteur sur les contributeur·ice·s
homepage-contributor-spotlight-get-involved = Participez
homepage-search-search-the-site = Rechercher sur le site
homepage-search-search = Rechercher
interactive-example-reset = Réinitialiser
interactive-example-value-select = Sélectionner une valeur
interactive-example-the-current-value-is-not-support = La valeur actuelle n'est pas prise en charge par votre navigateur.
interactive-example-run-example-and-show-console-ou = Exécuter l'exemple et afficher la sortie de la console
interactive-example-run = Exécuter
interactive-example-reset-example-and-clear-console = Réinitialiser l'exemple et effacer la console
interactive-example-console-output = Sortie de la console
interactive-example-output = Sortie
issues-table-loading-issues = chargement des problèmes…
issues-table-title = Titre
issues-table-repository = Dépôt
language-switcher-remember-language = Se souvenir de la langue
language-switcher-enable-this-setting-to-always-sw = Activez ce paramètre pour toujours passer à la langue actuelle lorsque disponible. (Cliquez pour en savoir plus.)
language-switcher-learn-more = En savoir plus
login-button-login = Se connecter
modal-exit-modal = Quitter la fenêtre contextuelle
navigation-toggle-navigation = Basculer la navigation
obs-about-title = À propos de l'HTTP Observatory
observatory-landing-read-our-faq = Lire notre FAQ
observatory-landing-report-feedback = Faire un retour
observatory-rescan-button-rescan = Re-scanner
observatory-rescan-button-wait-a-minute-to-rescan = Attendez une minute pour re-scanner
observatory-results-report-feedback = Faire un retour
observatory-results-faq = FAQ
observatory-tests-and-scores-loading-tests-and-scoring-data = Chargement des tests et des données de notation...
observatory-tests-and-scores-see = Voir
observatory-tests-and-scores-for-guidance = pour des conseils.
observatory-tests-and-scores-test-result = Résultat du test
observatory-tests-and-scores-description = Description
observatory-tests-and-scores-modifier = Modifier
observatory-tests-and-scores-failed-to-load-tests-and-scoring = Échec du chargement des tests et des données de notation. Veuillez réessayer plus tard.
brand-web-docs = MDN Web Docs
blog-rss-title = Flux RSS du Blog MDN
meta-description = Le site MDN Web Docs fournit des informations sur les technologies Web ouvertes, y compris HTML, CSS et les API pour les sites Web et les applications Web progressives.
logo-alt = Logo MDN
pagination-pagination = Pagination
playground-do-you-really-want-to-clear-ever = Voulez-vous vraiment tout effacer ?
playground-do-you-really-want-to-revert-you = Voulez-vous vraiment revenir sur vos modifications ?
playground-playground = Terrain d'essai
playground-format = Format
playground-run = Exécuter
playground-share = Partager
playground-clear = Effacer
playground-reset = Réinitialiser
playground-seeing-something-inappropriate = Voir quelque chose d'inapproprié ?
playground-user-shared-warning = Il s'agit d'un terrain d'essai partagé par un·e utilisateur·ice.<br>Inspectez toujours le code avant de l'exécuter.
playground-console = Console
playground-share-markdown = Partager le Markdown
playground-copy-markdown-to-clipboard = Copier le Markdown dans le presse-papiers
playground-share-data-url = Partager l'URL des données
playground-copy-data-url-to-clipboard = Copier l'URL des données dans le presse-papiers
playground-share-your-code-via-permalink = Partager votre code avec un lien permanent
playground-copy-to-clipboard = Copier dans le presse-papiers
playground-create-link = Créer un lien
playground-report-this-malicious-or-inappro = Signaler ce terrain d'essai partagé comme malveillant ou inapproprié.
playground-can-you-please-share-some-detail = Pouvez-vous partager quelques détails sur ce qui ne va pas avec ce contenu :
playground-cancel = Annuler
playground-report = Signaler
recently-visited-recently-visited = Récemment visité
scrim-inline-clicking-will-load-content-from = Cliquer chargera le contenu depuis scrimba.com
scrim-inline-toggle-fullscreen = Basculer en plein écran
scrim-inline-open-on-scrimba = Ouvrir sur Scrimba
scrim-inline-load-scrim-and-open-dialog = Charger le scrim et ouvrir la boîte de dialogue.
search-button-search-the-site = Rechercher sur le site
search-modal-loading-search-index = Chargement de l'index de recherche…
search-modal-search = Rechercher
search-modal-exit-search = Quitter la recherche
sidebar-filter-filter-sidebar = Filtrer la barre latérale
sidebar-filter-filter = Filtrer
sidebar-filter-clear-filter-input = Effacer le filtre
site-search-search = Rechercher
site-search-previous = Précédent
site-search-next = Suivant
site-search-suggestions-text = Voulez-vous dire…
site-search-searching = Recherche en cours…
site-search-language = Langue
site-search-both = Les deux
specifications-list-this-feature-does-not-appear-to = Cette fonctionnalité ne semble pas être définie dans une spécification.
specifications-list-specification = Spécification
survey-hide-this-survey = Masquer ce sondage
survey-take-survey-opens-in-a-new-tab = Participer au sondage (s'ouvre dans un nouvel onglet)
toggle-sidebar-toggle-sidebar = Basculer la barre latérale
user-menu-ai-help = Aide IA
user-menu-collections = Collections
user-menu-updates = Mises à jour
user-menu-settings = Mes paramètres
user-menu-help = Aide
user-menu-feedback = Retour
user-menu-user = Utilisateur·ice
writer-open-editor-open-in-editor = Ouvrir dans l'éditeur
writer-toolbar-view-on-mdn = Voir sur MDN
