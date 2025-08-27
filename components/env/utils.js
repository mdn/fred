import { ALLOW_RUNTIME, runtimeVariables } from "./runtime.js";

/**
 * @param {string} name
 * @param {boolean} fallback
 * @param {boolean} runtime
 */
export function parseBool(name, fallback, runtime = false) {
  try {
    return Boolean(
      JSON.parse(getEnv(name, runtime) || JSON.stringify(fallback)),
    );
  } catch {
    return fallback;
  }
}

/**
 * @param {string} name
 * @param {string} fallback
 * @param {boolean} runtime
 */
export function parseString(name, fallback, runtime = false) {
  return getEnv(name, runtime) || fallback;
}

/**
 * @param {string} name
 * @param {boolean} runtime
 * @returns {string | undefined}
 */
function getEnv(name, runtime = false) {
  name = `FRED_${name}`;
  if (runtime && ALLOW_RUNTIME) {
    runtimeVariables.push(name);
    return process.env[name] || getEnv(name);
  }
  return globalThis.__MDNEnv?.[name];
}
