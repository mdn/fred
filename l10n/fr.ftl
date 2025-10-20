article-footer-last-modified = Cette page a été modifiée le <time data-l10n-name="date">{ $date }</time> par les <a data-l10n-name="contributors">contributeurs du MDN</a>.
article-footer-source-title = Dossier : { $folder } (Ouvre un onglet)

baseline-asterisk = Certaines parties de cette fonctionnalité peuvent bénéficier de prise en charge variables.
baseline-high-extra = Cette fonctionnalité est bien établie et fonctionne sur de nombreux appareils et versions de navigateurs. Elle est disponible sur tous les navigateurs depuis { $date }.
baseline-low-extra = Depuis { $date }, cette fonctionnalité fonctionne sur les appareils et les versions de navigateur les plus récents. Elle peut ne pas fonctionner sur les appareils ou navigateurs plus anciens.
baseline-not-extra = Cette fonctionnalité n'est pas Compatible car elle ne fonctionne pas dans certains des navigateurs les plus utilisés.
baseline-supported-in = Pris en charge dans { $browsers }
baseline-unsupported-in = Pas complètement pris en charge dans { $browsers }
baseline-supported-and-unsupported-in = Pris en charge dans { $supported }, mais pas complètement pris en charge dans { $unsupported }

homepage-hero-title = Des ressources pour les Développeurs,<br> par les Développeurs
homepage-hero-description = Documenter le <a data-l10n-name="css">CSS</a>, le <a data-l10n-name="html">HTML</a> et le <a data-l10n-name="js">JavaScript</a>, depuis 2005.

not-found-title = Page non trouvée
not-found-description = Désolé, la page <code data-l10n-name="url">{ $url }</code> n'a pas été trouvée.
not-found-fallback-english = <strong data-l10n-name="strong">Bonne nouvelle :</strong> La page que vous cherchez existe en <em data-l10n-name="em">Anglais</em>.
not-found-fallback-search = La page que vous avez demandée n'existe pas, mais vous pouvez essayer une recherche sur le site pour :
not-found-back = Retour à la page d'accueil

reference-toc-header = Dans cet article

footer-mofo = Visitez la société mère à but non lucratif de <a data-l10n-name="moco">Mozilla Corporation</a>, la <a data-l10n-name="mofo">Fondation Mozilla</a>.
footer-copyright = Certaines parties de ce contenu sont protégées par le droit d'auteur ©1998–{ $year } des contributeurs individuels de mozilla.org. Contenu disponible sous <a data-l10n-name="cc">une licence Creative Commons</a>.

search-modal-site-search = Rechercher sur le site <em>{ $query }</em>

site-search-search-stats = { $results } documents trouvés.
site-search-suggestion-matches =  { $relation ->
    [gt] plus que { $matches ->
        [one]   { $matches } trouvé
       *[other] { $matches } trouvés
    }
   *[eq] { $matches ->
        [one]   { $matches } trouvé
       *[other] { $matches } trouvés
    }
}
site-search-suggestions-text = Voulez-vous dire :

blog-time-to-read = { $minutes ->
    [one]   { $minutes } minute de lecture
   *[other] { $minutes } minutes de lecture
}
blog-post-not-found = Article de blog introuvable.

blog-previous = Article précédent
blog-next = Article suivant

-brand-name-obs = HTTP Observatory
obs-report = Signaler
obs-title = { -brand-name-obs }
obs-landing-intro = Lancé en 2016, { -brand-name-obs } améliore la sécurité du Web en analysant la conformité aux meilleures pratiques en matière de sécurité. Il a fourni des informations à plus de 6,9 millions de sites web grâce à 47 millions d'analyses.
obs-assessment = Développé par Mozilla, { -brand-name-obs } effectue une évaluation approfondie des en-têtes HTTP d'un site et d'autres configurations de sécurité clés.
obs-scanning = Son processus d'analyse automatisé fournit aux développeurs et aux administrateurs de sites web des commentaires détaillés et exploitables, axés sur l'identification et la résolution des failles de sécurité potentielles.
obs-security = Cet outil aide les développeurs et les administrateurs de sites web à renforcer la sécurité de leurs sites contre les menaces courantes dans un environnement numérique en constante évolution.
obs-mdn = { -brand-name-obs } fournit des informations efficaces en matière de sécurité, guidées par l'expertise et l'engagement de Mozilla en faveur d'un Internet plus sûr et plus sécurisé, et basées sur des tendances et des directives bien établies.


compat-loading = Chargement…

compat-browser-version-date = { $browser } { $version } – Release date: { $date }
compat-browser-version-released = Release date: { $date }

compat-link-report-issue = Signaler des problèmes avec ces données de compatibilité
compat-link-report-issue-title = Signaler un problème avec ces données de compatibilité
compat-link-report-missing-title = Signaler des données de compatibilité manquantes
compat-link-report-missing = Signaler le problème
compat-link-source = Voir les données sur GitHub
compat-link-source-title = Fichier : { $filename }

compat-deprecated = Obsolète
compat-experimental = Expérimental
compat-nonstandard = Non standard
compat-no = Non

compat-support-full = Prise en charge complète
compat-support-partial = Prise en charge partielle
compat-support-no = Pas de prise en charge
compat-support-unknown = Prise en charge inconnue
compat-support-preview = Pré-version du navigateur
compat-support-prefix = Implémenté avec le préfixe vendeur : { $prefix }
compat-support-altname = Nom alternatif : { $altname }
compat-support-removed = Supprimé en version { $version } et supérieure
compat-support-see-impl-url = Voir <a data-l10n-name="impl_url">{ $label }</a>
compat-support-flags =
  { NUMBER($has_added) ->
    [one] De la version { $version_added }
    *[other] {""}
  }{ $has_last ->
    [one] { NUMBER($has_added) ->
          *[zero] Jusqu'à { $versionLast } des utilisateurs
          [one] {" "}jusqu'à { $versionLast } des utilisateurs
      }
    *[zero] { NUMBER($has_added) ->
          *[zero] Utilisateurs
          [one] {" "}utilisateurs
      }
  }
  {" "}doit explicitement définir le <code data-l10n-name="name">{ $flag_name }</code>{" "}
  { $flag_type ->
    *[preference] préférences
    [runtime_flag] indicateur d'exécution
  }{ NUMBER($has_value) ->
    [one] {" "}à <code data-l10n-name="value">{ $flag_value }</code>
    *[other] {""}
  }{"."}
  { NUMBER($has_pref_url) ->
    [one] { $flag_type ->
      [preference] Pour changer vos préférences sur le navigateur { $browser_name }, visitez { $browser_pref_url }.
      *[other] {""}
    }
    *[other] {""}
  }

compat-legend = Légende
compat-legend-tip = Astuce : cliquer/appuyer sur une cellule pour obtenir plus d'informations.
compat-legend-yes = { compat-support-full }
compat-legend-partial = { compat-support-partial }
compat-legend-preview = En cours de développement. Pris en charge dans une pré-version.
compat-legend-no = { compat-support-no }
compat-legend-unknown = Compatibilité inconnue
compat-legend-experimental = { compat-experimental }. Attendez-vous à ce que les comportements changent à l'avenir.
compat-legend-nonstandard = { compat-nonstandard }. Vérifiez la compatibilité entre les navigateurs avant utilisation.
compat-legend-deprecated = { compat-deprecated }. Ne pas utiliser dans les nouveaux sites web.
compat-legend-footnote = Voir les notes de mise en application.
compat-legend-disabled = L'utilisateur doit explicitement activer cette fonctionnalité.
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
settings = Mes paramètres

example-play-button-label = Exécuter
example-play-button-title = Exécutez l'exemple dans MDN Playground (ouvre un nouvel onglet)
