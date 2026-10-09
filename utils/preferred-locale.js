export const PREFERRED_LOCALE_COOKIE_NAME = "preferredlocale";

const DEFAULT_LOCALE = "en-US";

export const SUPPORTED_LOCALES = Object.freeze([
  "de",
  DEFAULT_LOCALE,
  "es",
  "fr",
  "ja",
  "ko",
  "pt-BR",
  "ru",
  "zh-CN",
  "zh-TW",
]);

const LOCALE_ALIASES = new Map([
  ["en", "en-US"],
  ["pt", "pt-BR"],
  ["cn", "zh-CN"],
  ["zh", "zh-CN"],
  ["zh-hans", "zh-CN"],
  ["zh-hant", "zh-TW"],
]);

const LOCALES_BY_LANGUAGE = new Map();
const LOCALES_BY_NAME = new Map(
  SUPPORTED_LOCALES.map((locale) => [locale.toLowerCase(), locale]),
);

for (const locale of SUPPORTED_LOCALES) {
  const language = locale.split("-", 1)[0]?.toLowerCase() || "";
  const locales = LOCALES_BY_LANGUAGE.get(language) || [];
  locales.push(locale);
  LOCALES_BY_LANGUAGE.set(language, locales);
}

/**
 * @param {{ preferredLocale?: unknown, acceptLanguage?: unknown }} options
 * @returns {string}
 */
export function resolvePreferredLocale({
  preferredLocale,
  acceptLanguage,
} = {}) {
  const cookieLocale = canonicalizeLocale(preferredLocale);
  if (cookieLocale) {
    return cookieLocale;
  }

  if (typeof acceptLanguage === "string") {
    for (const language of parseAcceptLanguage(acceptLanguage)) {
      const locale = matchLocale(language);
      if (locale) {
        return locale;
      }
    }
  }

  return DEFAULT_LOCALE;
}

/** @param {unknown} value */
function canonicalizeLocale(value) {
  if (typeof value !== "string") {
    return;
  }

  const normalized = value.trim().replaceAll("_", "-").toLowerCase();
  return LOCALES_BY_NAME.get(normalized);
}

/** @param {string} value */
function parseAcceptLanguage(value) {
  return value
    .split(",")
    .map((part, index) => {
      const [rangePart, ...parameters] = part.trim().split(";");
      const qualityParameter = parameters.find((parameter) =>
        /^\s*q\s*=/i.test(parameter),
      );
      const quality = qualityParameter
        ? Number(qualityParameter.split("=", 2)[1])
        : 1;

      return {
        range: rangePart?.toLowerCase() || "",
        quality: Number.isNaN(quality) ? 0 : quality,
        index,
      };
    })
    .filter(({ range, quality }) => range && quality > 0)
    .toSorted(
      (first, second) =>
        second.quality - first.quality || first.index - second.index,
    )
    .map(({ range }) => range);
}

/** @param {string} language */
function matchLocale(language) {
  const normalized = language.toLowerCase().replaceAll("_", "-");
  const alias = LOCALE_ALIASES.get(normalized) || normalized;
  const exactLocale = LOCALES_BY_NAME.get(alias.toLowerCase());
  if (exactLocale) {
    return exactLocale;
  }

  const baseLanguage = normalized.split("-", 1)[0];
  if (baseLanguage === "zh") {
    const script = normalized.split("-").find((subtag) => subtag.length === 4);
    if (script === "hant") {
      return "zh-TW";
    }
    if (script === "hans") {
      return "zh-CN";
    }
  }

  return LOCALES_BY_LANGUAGE.get(baseLanguage)?.[0];
}
