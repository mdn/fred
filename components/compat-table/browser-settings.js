/**
 * Persists which browsers the compat table shows, in `localStorage` only.
 *
 * All compat tables on a page share one setting, so changes are broadcast via
 * a global event (same tab) and the `storage` event (other tabs).
 */

const STORAGE_KEY = "compat-browsers";
const UPDATE_EVENT = "mdn-compat-browsers-update";

/**
 * Browsers shown when the user hasn't configured any.
 * @type {readonly import("@bcd").BrowserName[]}
 */
export const DEFAULT_BROWSERS = Object.freeze([
  "chrome",
  "edge",
  "firefox",
  "opera",
  "safari",
  "chrome_android",
  "firefox_android",
  "opera_android",
  "safari_ios",
  "samsunginternet_android",
  "webview_android",
  "webview_ios",
  "bun",
  "deno",
  "nodejs",
]);

/**
 * @returns {import("@bcd").BrowserName[]}
 */
export function getVisibleBrowsers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // An empty selection is valid (the user deselected all browsers).
      if (
        Array.isArray(parsed) &&
        parsed.every((browser) => typeof browser === "string")
      ) {
        return /** @type {import("@bcd").BrowserName[]} */ (parsed);
      }
    }
  } catch (error) {
    console.warn("Unable to read compat browsers from localStorage", error);
  }
  return [...DEFAULT_BROWSERS];
}

/**
 * @param {import("@bcd").BrowserName[]} browsers
 */
export function setVisibleBrowsers(browsers) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(browsers));
  } catch (error) {
    console.warn("Unable to write compat browsers to localStorage", error);
  }
  globalThis.dispatchEvent(new Event(UPDATE_EVENT));
}

export function resetVisibleBrowsers() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Unable to remove compat browsers from localStorage", error);
  }
  globalThis.dispatchEvent(new Event(UPDATE_EVENT));
}

/**
 * Calls `callback` whenever the visible browsers change, in this or another tab.
 * @param {() => void} callback
 * @returns {() => void} Unsubscribes.
 */
export function onVisibleBrowsersChange(callback) {
  /** @param {StorageEvent} event */
  const onStorage = (event) => {
    if (event.key === null || event.key === STORAGE_KEY) {
      callback();
    }
  };
  globalThis.addEventListener(UPDATE_EVENT, callback);
  globalThis.addEventListener("storage", onStorage);
  return () => {
    globalThis.removeEventListener(UPDATE_EVENT, callback);
    globalThis.removeEventListener("storage", onStorage);
  };
}
