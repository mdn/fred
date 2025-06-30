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

export const GLEAN_ENABLED = parseBool("GLEAN_ENABLED", false);
export const GLEAN_CHANNEL = parseString("GLEAN_CHANNEL", "dev");

export const WRITER_MODE = parseBool("WRITER_MODE", false);

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
