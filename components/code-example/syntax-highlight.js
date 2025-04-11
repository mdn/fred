import Prism from "prismjs";
import components from "prismjs/components.js";

Prism.manual = true;

/** @type {Record<string, import("./types.js").PrismLanguage>} */
const PRISM_LANGUAGES = components.languages;

// Add things to this list to help make things convenient. Sometimes
// there are `<pre class="brush: foo">` whose name is not that which
// Prism expects. It'd be hard to require that content writers
// have to stick to the exact naming conventions that Prism uses
// because Prism is an implementation detail.
const ALIASES = new Map([
  ["vue", "markup"], // See https://github.com/PrismJS/prism/issues/1665#issuecomment-536529608
  ["wat", "wasm"],
  ...Object.entries(PRISM_LANGUAGES).flatMap(([lang, config]) => {
    if (config.alias) {
      const aliases =
        typeof config.alias === "string" ? [config.alias] : config.alias;
      return aliases.map((alias) => /** @type {const} */ ([alias, lang]));
    }
    return [];
  }),
]);

/**
 * @param {Element} element
 * @param {string} language
 */
export async function highlightElement(element, language) {
  const highlighted = await highlightString(
    element.textContent || "",
    language,
  );
  if (highlighted) {
    element.innerHTML = `<code>${highlighted}</code>`;
  }
}

/**
 * @param {string} text
 * @param {string} language
 * @returns {Promise<string | undefined>}
 */
export async function highlightString(text, language) {
  const resolvedLanguage = ALIASES.get(language) || language;

  try {
    await importLanguage(resolvedLanguage);
  } catch {
    return;
  }

  return highlightStringSync(text, language);
}

/**
 * @param {string} text
 * @param {string} language
 * @returns {string | undefined}
 */
function highlightStringSync(text, language) {
  const resolvedLanguage = ALIASES.get(language) || language;
  const prismLanguage = Prism.languages[resolvedLanguage];
  if (prismLanguage) {
    try {
      return Prism.highlight(text, prismLanguage, resolvedLanguage);
    } catch {
      console.warn("Syntax highlighting: prism error");
    }
  }
  return;
}

/**
 * @param {string} language
 * @param {number} recursiveDepth
 */
async function importLanguage(language, recursiveDepth = 0) {
  if (recursiveDepth > 100) {
    console.warn("Syntax highlighting: recursion error");
    throw new Error("Syntax highlighting: recursion error");
  }

  const prismLanguage = Prism.languages[language];

  if (!prismLanguage) {
    if (language === "svelte") {
      try {
        await import(
          /* webpackChunkName: "prism-svelte" */
          // @ts-expect-error
          "prism-svelte"
        );
      } catch (error) {
        console.warn(
          `Syntax highlighting: failed to import ${language} prism language`,
        );
        throw error;
      }
    } else {
      const config = PRISM_LANGUAGES[language];
      if (config?.require) {
        try {
          await Promise.all(
            (typeof config.require === "string"
              ? [config.require]
              : config.require
            ).map((dependency) =>
              importLanguage(dependency, recursiveDepth + 1),
            ),
          );
        } catch {
          return;
        }
      }
      if (config?.optional) {
        await Promise.allSettled(
          (typeof config.optional === "string"
            ? [config.optional]
            : config.optional
          ).map((dependency) => importLanguage(dependency, recursiveDepth + 1)),
        );
      }
      try {
        await import(
          /* webpackChunkName: "[request]" */
          /* webpackExclude: /\.min\.js$/ */
          `prismjs/components/prism-${language}.js`
        );
      } catch (error) {
        console.warn(
          `Syntax highlighting: failed to import ${language} prism language`,
        );
        throw error;
      }
    }
  }
}
