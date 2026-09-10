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
  notifyChange();
}

export function resetVisibleBrowsers() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Unable to remove compat browsers from localStorage", error);
  }
  notifyChange();
}

/**
 * Calls `callback` whenever the visible browsers change, in this or another tab.
 * @param {() => void} callback
 * @returns {() => void} Unsubscribes.
 */
export function onVisibleBrowsersChange(callback) {
  const channel = getChannel();
  globalThis.addEventListener(UPDATE_EVENT, callback);
  channel?.addEventListener("message", callback);
  return () => {
    globalThis.removeEventListener(UPDATE_EVENT, callback);
    channel?.removeEventListener("message", callback);
  };
}
