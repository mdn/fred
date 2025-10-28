import { parseBool, parseInt, parseString } from "./utils.js";

export const PLAYGROUND_BASE_HOST = parseString(
  "PLAYGROUND_BASE_HOST",
  "mdnplay.dev",
);
export const PLAYGROUND_LOCAL = parseBool("PLAYGROUND_LOCAL", false, {
  runtime: true,
});
export const PORT = parseInt("PORT", 3000, { runtime: true });
export const OPEN_BROWSER_ON_START = parseBool("OPEN_BROWSER_ON_START", false, {
  runtime: true,
});
export const PLAYGROUND_PORT = parseInt("PLAYGROUND_PORT", 3001, {
  runtime: true,
});

export const FXA_SIGNIN_URL = parseString(
  "FXA_SIGNIN_URL",
  "/users/fxa/login/authenticate/",
);
export const FXA_SIGNOUT_URL = parseString(
  "FXA_SIGNOUT_URL",
  "/users/fxa/login/logout/",
);

export const GA_ENABLED = parseBool("GA_ENABLED", false);
export const GA_MEASUREMENT_ID = parseString("GA_MEASUREMENT_ID", "");

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

export const WRITER_MODE = parseBool("WRITER_MODE", false, { runtime: true });

export const BCD_BASE_URL = parseString(
  "BCD_BASE_URL",
  "https://bcd.developer.mozilla.org",
);

export const OBSERVATORY_API_URL = parseString(
  "OBSERVATORY_API_URL",
  "https://observatory-api.mdn.mozilla.net",
);
