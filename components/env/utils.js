import { RUNTIME_ENV, runtimeVariables } from "./runtime.js";

/**
 * @typedef {object} Options
 * @property {boolean} [runtime] Allow setting this value at runtime
 */

/**
 * @param {string} name
 * @param {boolean} fallback
 * @param {Options} [options]
 */
export function parseBool(name, fallback, options) {
  try {
    return Boolean(
      JSON.parse(getEnv(name, options) || JSON.stringify(fallback)),
    );
  } catch {
    return fallback;
  }
}

/**
 * @param {string} name
 * @param {number} fallback
 * @param {Options} [options]
 */
export function parseInt(name, fallback, options) {
  const stringValue = getEnv(name, options);
  const numberValue = stringValue ? Number.parseInt(stringValue, 10) : fallback;
  return Number.isNaN(numberValue) ? fallback : numberValue;
}

/**
 * @param {string} name
 * @param {string} fallback
 * @param {Options} [options]
 */
export function parseString(name, fallback, options) {
  return getEnv(name, options) || fallback;
}

/**
 * @param {string} name
 * @param {Options} [options]
 * @returns {string | undefined}
 */
function getEnv(name, options = {}) {
  const { runtime } = { runtime: false, ...options };
  const fullName = `FRED_${name}`;
  if (runtime && RUNTIME_ENV) {
    runtimeVariables.push(fullName);
    return process.env[fullName] || getEnv(name);
  }
  return globalThis.__MDNEnv?.[fullName];
}
