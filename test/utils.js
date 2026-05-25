import { browser } from "@wdio/globals";

export async function captureLogs() {
  await browser.sessionSubscribe({ events: ["log.entryAdded"] });
  /** @type {import("webdriver").local.LogEntry[]} */
  const logs = [];
  /** @type {string[]} */
  const messages = [];
  browser.on("log.entryAdded", (event) => {
    if (event.level === "error") {
      logs.push(event);
      if (event.text) {
        messages.push(event.text);
      }
    }
  });
  return { logs, messages };
}
