/**
 * Persists compat settings locally and syncs all tables across tabs.
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
 * Send values because background tabs can read stale storage in Firefox.
 * Notify this tab separately; it does not receive its own channel messages.
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
 * @type {readonly import("@bcd").BrowserName[]}
 */
export const DEFAULT_BROWSERS = Object.freeze([
  // Desktop browsers.
  "chrome",
  "edge",
  "firefox",
  "opera",
  "safari",

  // Mobile browsers.
  "chrome_android",
  "firefox_android",
  "opera_android",
  "safari_ios",
  "samsunginternet_android",
  "webview_android",
  "webview_ios",

  // JavaScript runtimes.
  "bun",
  "deno",
  "nodejs",
]);

/**
 * Missing browsers follow defaults; saved choices survive default changes.
 * @typedef {Partial<Record<import("@bcd").BrowserName, boolean>>} BrowserVisibility
 */

/**
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
 * Subscribes to visibility changes across tabs, including this one.
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
