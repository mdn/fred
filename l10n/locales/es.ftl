article-footer-last-modified = Esta página se modificó por última vez el <time data-l10n-name="date">{ $date }</time> por <a data-l10n-name="contributors">colaboradores de MDN</a>.
article-footer-source-title = Carpeta: { $folder } (se abre en una pestaña nueva)
baseline-asterisk = Algunas partes de esta característica pueden tener distintos niveles de compatibilidad.
baseline-high-extra = Esta característica está consolidada y funciona en muchos dispositivos y versiones de navegador. Está disponible en todos los navegadores desde { $date }.
baseline-low-extra = Desde { $date }, esta característica funciona en los dispositivos y las versiones de navegador más recientes. Es posible que no funcione en dispositivos o navegadores más antiguos.
baseline-not-extra = Esta característica no es Baseline porque no funciona en algunos de los navegadores más usados.
baseline-supported-in = Compatible con { $browsers }
baseline-unsupported-in = No es ampliamente compatible con { $browsers }
baseline-supported-and-unsupported-in = Compatible con { $supported }, pero no ampliamente compatible con { $unsupported }
baseline-signals = ¿Quieres que más navegadores sean compatibles con esta característica? <a data-l10n-name="link">Cuéntanos por qué.</a>
homepage-hero-title = Recursos para desarrolladores,<br> por desarrolladores
playground-user-shared-warning = Este es un playground compartido por un usuario.<br>Revisa siempre el código antes de ejecutarlo.
homepage-hero-description = Documentando <a data-l10n-name="css">CSS</a>, <a data-l10n-name="html">HTML</a> y <a data-l10n-name="js">JavaScript</a> desde 2005.
not-found-title = Página no encontrada
not-found-description = Lo sentimos, no se encontró la página <code data-l10n-name="url">{ $url }</code>.
not-found-fallback-english = <strong data-l10n-name="strong">Buenas noticias:</strong> la página que buscas existe en <em data-l10n-name="em">inglés</em>.
not-found-fallback-search = La página que buscas no existe, pero puedes intentar buscar en el sitio:
not-found-back = Volver a la página de inicio
footer-copyright = Partes de este contenido son ©1998–{ $year } de colaboradores individuales de mozilla.org. Contenido disponible bajo <a data-l10n-name="cc">una licencia Creative Commons</a>.
search-modal-site-search = Buscar en el sitio <em>{ $query }</em>
search-modal-results-status =
    { $results ->
        [0] No se encontraron resultados.
        [one] { $results } resultado disponible.
       *[other] { $results } resultados disponibles.
    }
site-search-search-stats = Se encontraron { $results } documentos.
site-search-suggestion-matches =
    { $relation ->
        [gt]
            más de { $matches ->
                [one] { $matches } coincidencia
               *[other] { $matches } coincidencias
            }
       *[eq]
            { $matches ->
                [one] { $matches } coincidencia
               *[other] { $matches } coincidencias
            }
    }
blog-time-to-read =
    { $minutes ->
        [one] { $minutes } minuto de lectura
       *[other] { $minutes } minutos de lectura
    }
-brand-name-obs = HTTP Observatory
obs-report = Informe
obs-title = { -brand-name-obs }
obs-landing-intro = Lanzado en 2016, { -brand-name-obs } mejora la seguridad web analizando el cumplimiento de las buenas prácticas de seguridad. Ha ofrecido información a más de 6,9 millones de sitios web mediante 47 millones de análisis.
obs-assessment = Desarrollado por Mozilla, { -brand-name-obs } realiza una evaluación exhaustiva de los encabezados HTTP de un sitio y de otras configuraciones de seguridad clave.
obs-scanning = Su proceso de análisis automatizado ofrece a los desarrolladores y administradores de sitios web comentarios detallados y prácticos, centrados en detectar y solucionar posibles vulnerabilidades de seguridad.
obs-security = La herramienta es fundamental para ayudar a los desarrolladores y administradores de sitios web a proteger sus sitios frente a las amenazas de seguridad habituales, en un entorno digital en constante evolución.
obs-mdn = { -brand-name-obs } ofrece información de seguridad eficaz, guiada por la experiencia de Mozilla y su compromiso con una internet más segura, y basada en tendencias y pautas bien establecidas.
compat-browser-version-date = { $browser } { $version } – Fecha de lanzamiento: { $date }
compat-browser-version-released = Fecha de lanzamiento: { $date }
compat-link-source-title = Archivo: { $filename }
compat-settings-hide-browser = Ocultar { $browser }
compat-settings-show-browser = Mostrar { $browser }
compat-branch-prefix = Prefijo: <code data-l10n-name="prefix">{ $prefix }</code>
compat-branch-altname = Nombre alternativo: <code data-l10n-name="altname">{ $altname }</code>
compat-branch-prefix-altname = Prefijo: <code data-l10n-name="prefix">{ $prefix }</code>, nombre alternativo: <code data-l10n-name="altname">{ $altname }</code>
compat-support-removed = Eliminado en la versión { $version } y posteriores
compat-support-see-impl-url = Consulta <a data-l10n-name="impl_url">{ $label }</a>
compat-support-flag-range =
    { $version_range ->
        [range] Desde la versión { $version_added } hasta la { $version_last }, los usuarios
        [from] Desde la versión { $version_added }, los usuarios
        [until] Hasta la versión { $version_last }, los usuarios
       *[none] Los usuarios
    } deben establecer explícitamente { $flag_type ->
       *[preference] la preferencia
        [runtime_flag] el indicador de ejecución
    } <code data-l10n-name="name">{ $flag_name }</code>{ $has_value ->
        [1] { " " }en <code data-l10n-name="value">{ $flag_value }</code>
       *[0] { "" }
    }.{ $has_pref_url ->
        [1]
            { $flag_type ->
                [preference] { " " }Para cambiar las preferencias en { $browser_name }, visita { $browser_pref_url }.
               *[other] { "" }
            }
       *[0] { "" }
    }
compat-legend-yes = { compat-support-full }
compat-legend-partial = { compat-support-partial }
compat-legend-preview = En desarrollo. Compatible en una versión preliminar.
compat-legend-no = { compat-support-no }
compat-legend-unknown = Compatibilidad desconocida
compat-legend-experimental = { compat-experimental }. Es probable que su comportamiento cambie en el futuro.
compat-legend-nonstandard = { compat-nonstandard }. Comprueba la compatibilidad entre navegadores antes de usarlo.
compat-legend-deprecated = { compat-deprecated }. No debe usarse en sitios web nuevos.
compat-legend-footnote = Consulta las notas de implementación.
compat-legend-disabled = El usuario debe activar explícitamente esta característica.
compat-legend-altname = Usa un nombre no estándar.
compat-legend-prefix = Requiere un prefijo de proveedor o un nombre distinto para usarse.
compat-legend-more = Tiene más información de compatibilidad.
placement-note = Anuncio
placement-no = ¿No quieres ver anuncios?
pagination-next = Página siguiente
pagination-prev = Página anterior
pagination-current = Página actual
pagination-goto = Ir a la página { $page }
logout = Cerrar sesión
login = Iniciar sesión
example-play-button-label = Play
example-play-button-title = Ejecutar el ejemplo en MDN Playground (se abre en una pestaña nueva)
writer-reload-polling = Consultando cada { $seconds } s
a11y-menu-skip-to-main-content = Saltar al contenido principal
a11y-menu-skip-to-search = Saltar a la búsqueda
article-footer-title = Ayuda a mejorar MDN
article-footer-learn-how-to-contribute = Aprende cómo colaborar
article-footer-view-this-page-on-github = Ver esta página en GitHub
article-footer-this-will-take-you-to-github-to = Esto te llevará a GitHub para crear un nuevo issue.
article-footer-report-a-problem-with-this-conte = Informar de un problema con este contenido
baseline-indicator-deprecated = Obsoleto
baseline-indicator-limited-availability = Disponibilidad limitada
baseline-indicator-baseline = Baseline
baseline-indicator-widely-available = Ampliamente disponible
baseline-indicator-newly-available = Disponible recientemente
baseline-indicator-to-be-removed = Se eliminará
baseline-indicator-pending-removal = Esta característica está pendiente de eliminarse de los navegadores. Usarla ahora puede hacer que algo deje de funcionar en futuras actualizaciones.
baseline-indicator-avoid-using = Evita usar esta característica en proyectos nuevos.
baseline-indicator-candidate-for-removal = Esta característica podría eliminarse de los estándares web o de los navegadores.
baseline-indicator-alternatives-use = Usa en su lugar las siguientes características:
baseline-indicator-alternatives-consider = Considera usar en su lugar las siguientes características:
baseline-indicator-alternatives-end = .
baseline-indicator-baseline-discouraged = Baseline desaconsejado
baseline-indicator-baseline-discouraged-cross = Baseline desaconsejado (cruz)
baseline-indicator-baseline-cross = Baseline (cruz)
baseline-indicator-baseline-check = Baseline (marca de verificación)
baseline-indicator-check = marca de verificación
baseline-indicator-cross = cruz
baseline-indicator-see-full-compatibility = Ver la compatibilidad completa
baseline-indicator-learn-more = Más información
blog-previous = Artículo anterior
blog-next = Artículo siguiente
blog-index-blog-it-better = Blog it better
reference-toc-header = En este artículo
blog-post-not-found = No se encontró el artículo del blog.
collection-save-button-save-in-collection = Guardar en una colección
collection-save-button-remove = Quitar
collection-save-button-save = Guardar
collection-save-button-add-to-collection = Añadir a una colección
collection-save-button-collection = Colección:
collection-save-button-saved-articles = Artículos guardados
collection-save-button-new-collection = Nueva colección
collection-save-button-name = Nombre:
collection-save-button-note = Nota:
collection-save-button-saving = Guardando…
collection-save-button-cancel = Cancelar
collection-save-button-deleting = Eliminando…
collection-save-button-delete = Eliminar
theme-default = Predeterminado del sistema
color-theme-light = Claro
color-theme-dark = Oscuro
color-theme-switch-color-theme = Cambiar el tema de color
color-theme-theme = Tema
compat-link-report-issue-title = Informar de un problema con estos datos de compatibilidad
compat-link-report-issue = Informar de problemas con estos datos de compatibilidad
compat-link-source = Ver los datos en GitHub
compat-no-browsers = No hay navegadores seleccionados. Usa "Configuración" para elegir qué navegadores mostrar.
compat-experimental = Experimental
compat-deprecated = Obsoleto
compat-nonstandard = No estándar
compat-support-partial = Compatibilidad parcial
compat-support-preview-browser = Compatibilidad en la versión preliminar del navegador
compat-support-full = Compatibilidad total
compat-support-no = Sin compatibilidad
compat-support-unknown = Compatibilidad desconocida
compat-yes = Sí
compat-partial = Parcial
compat-no = No
compat-support-preview = Compatibilidad en versión preliminar
compat-legend = Leyenda
compat-legend-tip = Consejo: puedes hacer clic o tocar en una celda para ver más información.
compat-link-report-missing-title = Informar de datos de compatibilidad que faltan
compat-link-report-missing = Informar de este problema
compat-js-required = Activa JavaScript para ver esta tabla de compatibilidad con navegadores.
compat-loading = Cargando…
compat-settings-platform-desktop = Escritorio
compat-settings-platform-mobile = Móvil
compat-settings-platform-server = Servidor
compat-settings-platform-xr = XR
compat-settings-hidden-no-data = El navegador no está disponible para esta característica. No hay datos de compatibilidad.
compat-settings-hidden-not-applicable = El navegador no está disponible para esta característica. Las características de WebExtensions no se aplican.
compat-settings-legend = Leyenda
compat-settings-open = Configuración
compat-settings-title = Configuración de compatibilidad con navegadores
compat-settings-intro = Selecciona los navegadores que quieres mostrar en las tablas de compatibilidad. Tu selección se guarda en este navegador.
compat-settings-restore-defaults = Restablecer valores predeterminados
compat-settings-cancel = Cancelar
compat-settings-save = Guardar
content-feedback-content-is-out-of-date = El contenido está desactualizado
content-feedback-missing-information = Falta información
content-feedback-code-examples-not-working-as-exp = Los ejemplos de código no funcionan como se esperaba
content-feedback-other = Otro
content-feedback-question = ¿Te resultó útil esta página?
content-feedback-yes = Sí
content-feedback-no = No
content-feedback-reason = ¿Por qué no te resultó útil esta página?
content-feedback-submit = Enviar
content-feedback-thanks = ¡Gracias por tus comentarios!
contributor-spotlight-want-to-be-part-of-the-journey = ¿Quieres formar parte de este camino?
contributor-spotlight-our-constant-quest-for-innovatio = Nuestra búsqueda constante de innovación empieza aquí, contigo. Cada parte de MDN (la documentación, las demostraciones y el propio sitio) nace de nuestra increíble comunidad abierta de desarrolladores. ¡Únete a nosotros!
contributor-spotlight-get-involved = Participa
contributor-spotlight-contributor-profile = Perfil del colaborador
copy-button-copied = Copiado
copy-button-copy-failed = ¡No se pudo copiar!
copy-button-copy = Copiar
footer-mdn-on-github = MDN en GitHub
footer-mdn-on-bluesky = MDN en Bluesky
footer-mdn-on-x = MDN en X
footer-mdn-on-mastodon = MDN en Mastodon
footer-mdn-blog-rss-feed = Canal RSS del blog de MDN
footer-mdn = MDN
footer-about = Acerca de
footer-blog = Blog
footer-mozilla-careers = Empleo en Mozilla
footer-advertise-with-us = Anúnciate con nosotros
footer-mdn-plus = MDN Plus
footer-product-help = Ayuda del producto
footer-contribute = Colabora
footer-mdn-community = Comunidad de MDN
footer-community-resources = Recursos para la comunidad
footer-writing-guidelines = Pautas de redacción
footer-mdn-discord = Discord de MDN
footer-developers = Desarrolladores
footer-web-technologies = Tecnologías web
footer-learn-web-development = Aprende desarrollo web
footer-guides = Guías
footer-tutorials = Tutoriales
footer-glossary = Glosario
footer-hacks-blog = Blog Hacks
footer-website-privacy-notice = Aviso de privacidad del sitio web
footer-telemetry-settings = Configuración de telemetría
footer-legal = Aviso legal
footer-community-participation-guidelin = Pautas de participación en la comunidad
footer-mdn-logo = Logotipo de MDN
footer-tagline = Tu plano para una internet mejor.
footer-mozilla-logo = Logotipo de Mozilla
generic-toc__header = En este artículo
homepage-body-featured-articles = Artículos destacados
homepage-body-latest-news = Últimas noticias
homepage-body-recent-contributions = Contribuciones recientes
homepage-contributor-spotlight-contributor-spotlight = Colaborador destacado
homepage-contributor-spotlight-get-involved = Participa
homepage-search-search-the-site = Buscar en el sitio
homepage-search-search = Buscar
interactive-example-reset-disabled = Restablecer está desactivado hasta que edites el ejemplo
interactive-example-reset = Restablecer
interactive-example-value-select = Selección de valor
interactive-example-the-current-value-is-not-support = Tu navegador no admite el valor actual.
interactive-example-run-example-and-show-console-ou = Ejecutar el ejemplo y mostrar la salida de la consola
interactive-example-run = Ejecutar
interactive-example-reset-example-and-clear-console = Restablecer el ejemplo y borrar la salida de la consola
interactive-example-console-output = Salida de la consola
interactive-example-output = Salida
issues-table-loading-issues = cargando issues…
issues-table-title = Título
issues-table-repository = Repositorio
language-switcher-remember-language = Recordar el idioma
language-switcher-enable-this-setting-to-always-sw = Activa esta opción para cambiar siempre al idioma actual cuando esté disponible. (Haz clic para obtener más información).
language-switcher-learn-more = Más información
login-button-login = Iniciar sesión
modal-exit-modal = Cerrar ventana
navigation-toggle-navigation = Mostrar u ocultar la navegación
obs-about-title = Acerca de HTTP Observatory
observatory-landing-read-our-faq = Lee nuestras preguntas frecuentes
observatory-landing-report-feedback = Enviar comentarios
observatory-rescan-button-rescan = Volver a analizar
observatory-rescan-button-wait-a-minute-to-rescan = Espera un minuto para volver a analizar
observatory-results-report-feedback = Enviar comentarios
observatory-results-faq = Preguntas frecuentes
observatory-tests-and-scores-loading-tests-and-scoring-data = Cargando las pruebas y los datos de puntuación...
observatory-tests-and-scores-see = Consulta
observatory-tests-and-scores-for-guidance = para obtener orientación.
observatory-tests-and-scores-test-result = Resultado de la prueba
observatory-tests-and-scores-description = Descripción
observatory-tests-and-scores-modifier = Modificador
observatory-tests-and-scores-failed-to-load-tests-and-scoring = No se pudieron cargar las pruebas ni los datos de puntuación. Inténtalo de nuevo más tarde.
blog-rss-title = Canal RSS del blog de MDN
brand-web-docs = MDN Web Docs
meta-description = El sitio MDN Web Docs ofrece información sobre las tecnologías de la web abierta, como HTML, CSS y las API, tanto para sitios web como para aplicaciones web progresivas.
logo-alt = El logotipo de MDN
pagination-pagination = Paginación
playground-do-you-really-want-to-clear-ever = ¿Seguro que quieres borrarlo todo?
playground-do-you-really-want-to-revert-you = ¿Seguro que quieres deshacer tus cambios?
playground-playground = Playground
playground-format = Formatear
playground-run = Ejecutar
playground-share = Compartir
playground-clear = Borrar
playground-reset = Restablecer
playground-seeing-something-inappropriate = ¿Ves algo inapropiado?
playground-console = Consola
playground-share-markdown = Compartir en Markdown
playground-copy-markdown-to-clipboard = Copiar el Markdown al portapapeles
playground-share-data-url = Compartir como URL de datos
playground-copy-data-url-to-clipboard = Copiar la URL de datos al portapapeles
playground-share-your-code-via-permalink = Compartir tu código mediante un enlace permanente
playground-copy-to-clipboard = Copiar al portapapeles
playground-create-link = Crear enlace
playground-report-this-malicious-or-inappro = Denunciar este playground compartido por malicioso o inapropiado.
playground-can-you-please-share-some-detail = ¿Puedes darnos algunos detalles sobre qué problema tiene este contenido?
playground-cancel = Cancelar
playground-report = Denunciar
recently-visited-recently-visited = Visitado recientemente
scrim-inline-clicking-will-load-content-from = Al hacer clic se cargará contenido de scrimba.com
scrim-inline-toggle-fullscreen = Activar o desactivar la pantalla completa
scrim-inline-open-on-scrimba = Abrir en Scrimba
scrim-inline-load-scrim-and-open-dialog = Cargar el scrim y abrir el cuadro de diálogo.
search-button-search-the-site = Buscar en el sitio
search-modal-loading-search-index = Cargando el índice de búsqueda…
search-modal-search = Buscar
search-modal-exit-search = Salir de la búsqueda
search-modal-results-label = Resultados de la búsqueda
sidebar-filter-filter-sidebar = Filtrar la barra lateral
sidebar-filter-filter = Filtrar
sidebar-filter-clear-filter-input = Borrar el filtro
site-search-search = Buscar
site-search-previous = Anterior
site-search-next = Siguiente
site-search-suggestions-text = ¿Quisiste decir…
site-search-searching = Buscando…
site-search-language = Idioma
site-search-both = Ambos
specifications-list-this-feature-does-not-appear-to = Esta característica no parece estar definida en ninguna especificación.
specifications-list-specification = Especificación
survey-hide-this-survey = Ocultar esta encuesta
survey-take-survey-opens-in-a-new-tab = Responder la encuesta (se abre en una pestaña nueva)
toggle-sidebar-toggle-sidebar = Mostrar u ocultar la barra lateral
user-menu-ai-help = Ayuda de IA
user-menu-collections = Colecciones
user-menu-updates = Novedades
user-menu-settings = Mi configuración
user-menu-help = Ayuda
user-menu-feedback = Comentarios
user-menu-user = Usuario
writer-open-editor-open-in-editor = Abrir en el editor
writer-toolbar-view-on-mdn = Ver en MDN
