/**
 * Persists which browsers the compat table shows, in `localStorage` only.
 *
 * All compat tables share one setting, so changes are broadcast via a global
 * event (same tab) and a `BroadcastChannel` (other tabs).
 */

const STORAGE_KEY = "compat-browsers";
const UPDATE_EVENT = "mdn-compat-browsers-update";
const CHANNEL_NAME = "mdn-compat-browsers";

/** @type {BroadcastChannel | undefined} */
let channel;

function getChannel() {
  if (!channel && typeof BroadcastChannel !== "undefined") {
    channel = new BroadcastChannel(CHANNEL_NAME);
  }
  return channel;
}

/** Notifies this tab (which doesn't receive its own channel messages) and others. */
function notifyChange() {
  globalThis.dispatchEvent(new Event(UPDATE_EVENT));
  getChannel()?.postMessage("update");
}

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
 * Explicit per-browser visibility, as saved by the user. Browsers missing from
 * the map (e.g. added to BCD later) follow `DEFAULT_BROWSERS`, while saved
 * choices stay stable even if the defaults change.
 * @typedef {Partial<Record<import("@bcd").BrowserName, boolean>>} BrowserVisibility
 */

/**
 * @returns {BrowserVisibility}
 */
export function getBrowserVisibility() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed) &&
        Object.values(parsed).every((value) => typeof value === "boolean")
      ) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Unable to read compat browsers from localStorage", error);
  }
  return {};
}

/**
 * @param {import("@bcd").BrowserName} browser
 * @param {BrowserVisibility} visibility
 */
export function isBrowserVisible(browser, visibility) {
  return visibility[browser] ?? DEFAULT_BROWSERS.includes(browser);
}

/**
 * @param {BrowserVisibility} visibility
 */
export function setBrowserVisibility(visibility) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visibility));
  } catch (error) {
    console.warn("Unable to write compat browsers to localStorage", error);
  }
  notifyChange();
}

export function resetBrowserVisibility() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Unable to remove compat browsers from localStorage", error);
  }
  notifyChange();
}

/**
 * Calls `callback` whenever the visibility changes, in this or another tab.
 * @param {() => void} callback
 * @returns {() => void} Unsubscribes.
 */
export function onBrowserVisibilityChange(callback) {
  const channel = getChannel();
  globalThis.addEventListener(UPDATE_EVENT, callback);
  channel?.addEventListener("message", callback);
  return () => {
    globalThis.removeEventListener(UPDATE_EVENT, callback);
    channel?.removeEventListener("message", callback);
  };
}
