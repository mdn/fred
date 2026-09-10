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

/**
 * Notifies this tab (which doesn't receive its own channel messages) and
 * others. The value travels with the message: a background tab may still see
 * a stale `localStorage` snapshot (observed in Firefox) when it arrives.
 * @param {BrowserVisibility} visibility
 */
function notifyChange(visibility) {
  globalThis.dispatchEvent(
    new CustomEvent(UPDATE_EVENT, { detail: visibility }),
  );
  getChannel()?.postMessage(visibility);
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
  notifyChange(visibility);
}

export function resetBrowserVisibility() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Unable to remove compat browsers from localStorage", error);
  }
  notifyChange({});
}

/**
 * Calls `callback` with the new visibility whenever it changes, in this or
 * another tab.
 * @param {(visibility: BrowserVisibility) => void} callback
 * @returns {() => void} Unsubscribes.
 */
export function onBrowserVisibilityChange(callback) {
  const channel = getChannel();
  /** @param {Event} event */
  const onLocal = (event) => {
    callback(/** @type {CustomEvent<BrowserVisibility>} */ (event).detail);
  };
  /** @param {MessageEvent} event */
  const onMessage = ({ data }) => {
    callback(data && typeof data === "object" ? data : getBrowserVisibility());
  };
  globalThis.addEventListener(UPDATE_EVENT, onLocal);
  channel?.addEventListener("message", onMessage);
  return () => {
    globalThis.removeEventListener(UPDATE_EVENT, onLocal);
    channel?.removeEventListener("message", onMessage);
  };
}
