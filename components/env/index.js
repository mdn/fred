/**
 * @file Retrieves environment variables, setting defaults, for other areas of the app.
 *
 * We set safe defaults for prod, unless the risk from doing - and having this set
 * everywhere, across local dev etc. - outweighs the risk of it not being set on prod.
 */

export const PLAYGROUND_BASE_HOST = parseString(
  "PLAYGROUND_BASE_HOST",
  "mdnplay.dev",
);

export const FXA_SIGNIN_URL = parseString(
  "FXA_SIGNIN_URL",
  "/users/fxa/login/authenticate/",
);
export const FXA_SIGNOUT_URL = parseString(
  "FXA_SIGNOUT_URL",
  "/users/fxa/login/logout/",
);

/** Set to non-prod default, because we don't want glean to run without explicitly enabling. */
export const GLEAN_ENABLED = parseBool("GLEAN_ENABLED", false);
/** Set to non-prod default, because we don't want glean to run without explicitly enabling. */
export const GLEAN_CHANNEL = parseString("GLEAN_CHANNEL", "dev");
export const GLEAN_DEBUG = parseBool("GLEAN_DEBUG", false);

/**
 * While there is a risk from not including the `noindex` meta tag on stage etc, we have a
 * `robots.txt` in place, and the effect of accidentally including it on prod is far worse:
 * so this must be the prod default.
 */
export const ROBOTS_GLOBAL_ALLOW = parseBool("ROBOTS_GLOBAL_ALLOW", true);

export const WRITER_MODE = parseBool("WRITER_MODE", false);

export const BCD_BASE_URL = parseString(
  "BCD_BASE_URL",
  "https://bcd.developer.mozilla.org",
);

export const OBSERVATORY_API_URL = parseString(
  "OBSERVATORY_API_URL",
  "https://observatory-api.mdn.mozilla.net",
);

/**
 * @param {string} name
 * @param {boolean} fallback
 */
function parseBool(name, fallback) {
  try {
    return Boolean(
      JSON.parse(process.env[`FRED_${name}`] || JSON.stringify(fallback)),
    );
  } catch {
    return fallback;
  }
}

/**
 * @param {string} name
 * @param {string} fallback
 */
function parseString(name, fallback) {
  return process.env[`FRED_${name}`] || fallback;
}
