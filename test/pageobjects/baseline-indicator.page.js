import { $, browser } from "@wdio/globals";

import BaselineIndicator from "./components/baseline-indicator.js";
import SandboxPage from "./sandbox.page.js";

class BaselineIndicatorPage {
  open(locale = "en-US") {
    return SandboxPage.open("baseline-indicator", locale);
  }

  /** @param {string} id */
  fixture(id) {
    return $(`#${id}`);
  }

  /** @param {string} id */
  indicator(id) {
    return new BaselineIndicator(() =>
      this.fixture(id).$(".baseline-indicator"),
    );
  }

  async clearStoredState() {
    await browser.execute(() => localStorage.removeItem("baseline-indicator"));
  }

  async getStoredState() {
    return browser.execute(() => localStorage.getItem("baseline-indicator"));
  }
}

export default new BaselineIndicatorPage();
