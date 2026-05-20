import { browser } from "@wdio/globals";

/**
 * @import { WebdriverIOEventMap } from "webdriverio"
 * @typedef {WebdriverIOEventMap["network.beforeRequestSent"]} NetworkBeforeRequestSentParameters
 * @typedef {WebdriverIOEventMap["network.responseCompleted"]} NetworkResponseCompletedParameters
 * @typedef {WebdriverIOEventMap["network.fetchError"]} NetworkFetchErrorParameters
 */

export default class Page {
  /**
   * Wait for network to be idle
   * Necessary until https://github.com/webdriverio/webdriverio/issues/15086 is fixed
   * @param {number} idleTime - milliseconds to wait with no network activity (default 500ms)
   * @param {number} timeout - maximum time to wait (default 10000ms)
   */
  async waitForNetworkIdle(idleTime = 500, timeout = 10_000) {
    const activeRequests = new Set();
    let lastActivityTime = Date.now();

    /** @param {NetworkBeforeRequestSentParameters} event */
    const onRequestStart = (event) => {
      lastActivityTime = Date.now();
      if (!event.request.url.endsWith("/__webpack_hmr")) {
        activeRequests.add(event.request.request);
      }
    };

    /** @param {NetworkResponseCompletedParameters | NetworkFetchErrorParameters} event */
    const onRequestEnd = (event) => {
      activeRequests.delete(event.request.request);
      lastActivityTime = Date.now();
    };

    browser.on("network.beforeRequestSent", onRequestStart);
    browser.on("network.responseCompleted", onRequestEnd);
    browser.on("network.fetchError", onRequestEnd);

    try {
      await browser.waitUntil(
        () => {
          const timeSinceLastActivity = Date.now() - lastActivityTime;
          return activeRequests.size === 0 && timeSinceLastActivity >= idleTime;
        },
        {
          timeout,
          timeoutMsg: `Network idle timeout after ${timeout}ms`,
        },
      );
    } finally {
      browser.off("network.beforeRequestSent", onRequestStart);
      browser.off("network.responseCompleted", onRequestEnd);
      browser.off("network.fetchError", onRequestEnd);
    }
  }

  /**
   * Opens a page at path
   * @param {string} path path of page (e.g. /path/to/page.html)
   */
  async open(path) {
    await Promise.all([this.waitForNetworkIdle(), browser.url(path)]);
  }
}
