/**
 * Persists the compat table's user settings, in `localStorage` only, as one
 * `compat-table` object with a field per setting (currently `browsers`).
 *
 * All compat tables share the settings, so changes are broadcast via a global
 * event (same tab) and a `BroadcastChannel` (other tabs).
 */

const STORAGE_KEY = "compat-table";
const UPDATE_EVENT = "mdn-compat-table-update";
const CHANNEL_NAME = "mdn-compat-table";

/** @type {BroadcastChannel | undefined} */
let channel;

function getChannel() {
  if (!channel && typeof BroadcastChannel !== "undefined") {
    channel = new BroadcastChannel(CHANNEL_NAME);
  }
  return channel;
}

/**
 * @typedef {{ browsers?: BrowserVisibility } & Record<string, unknown>} Settings
 */

/**
 * @returns {Settings}
 */
function getSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Unable to read compat table settings", error);
  }
  return {};
}

/**
 * Stores the settings (removing the key once none are left) and notifies this
 * tab, which doesn't receive its own channel messages, and others. The value
 * travels with the message: a background tab may still see a stale
 * `localStorage` snapshot (observed in Firefox) when it arrives.
 * @param {Settings} settings
 */
function saveSettings(settings) {
  try {
    if (Object.keys(settings).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn("Unable to write compat table settings", error);
  }
  globalThis.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: settings }));
  getChannel()?.postMessage(settings);
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
 * Validates the `browsers` setting, falling back to no saved choices.
 * @param {unknown} value
 * @returns {BrowserVisibility}
 */
function toBrowserVisibility(value) {
  return value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.values(value).every((choice) => typeof choice === "boolean")
    ? value
    : {};
}

/**
 * @returns {BrowserVisibility}
 */
export function getBrowserVisibility() {
  return toBrowserVisibility(getSettings().browsers);
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
  saveSettings({ ...getSettings(), browsers: visibility });
}

export function resetBrowserVisibility() {
  const settings = getSettings();
  delete settings.browsers;
  saveSettings(settings);
}

/**
 * Calls `callback` with the new visibility whenever the settings change, in
 * this or another tab.
 * @param {(visibility: BrowserVisibility) => void} callback
 * @returns {() => void} Unsubscribes.
 */
export function onBrowserVisibilityChange(callback) {
  const channel = getChannel();
  /** @param {unknown} settings */
  const notify = (settings) => {
    callback(
      toBrowserVisibility(
        settings && typeof settings === "object"
          ? /** @type {Settings} */ (settings).browsers
          : getSettings().browsers,
      ),
    );
  };
  /** @param {Event} event */
  const onLocal = (event) => {
    notify(/** @type {CustomEvent<Settings>} */ (event).detail);
  };
  /** @param {MessageEvent} event */
  const onMessage = ({ data }) => {
    notify(data);
  };
  globalThis.addEventListener(UPDATE_EVENT, onLocal);
  channel?.addEventListener("message", onMessage);
  return () => {
    globalThis.removeEventListener(UPDATE_EVENT, onLocal);
    channel?.removeEventListener("message", onMessage);
  };
}
