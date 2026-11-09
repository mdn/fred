import { browser } from "@wdio/globals";

import Component from "./component.js";

export default class BaselineIndicator extends Component {
  get summary() {
    return this.element.$("summary");
  }

  get statusIcon() {
    return this.summary.$(".indicator");
  }

  get title() {
    return this.summary.$(".status-title");
  }

  get pill() {
    return this.summary.$(".pill");
  }

  get asterisk() {
    return this.summary.$(".asterisk");
  }

  get browsers() {
    return this.summary.$(".browsers");
  }

  /** @param {"chrome" | "edge" | "firefox" | "safari"} name */
  browser(name) {
    return this.browsers.$(`.${name}`);
  }

  /** @param {number} index */
  engine(index) {
    return this.browsers.$(`.engine:nth-child(${index + 1})`);
  }

  get extra() {
    return this.element.$(".extra");
  }

  get asteriskNote() {
    return this.extra.$(".asterisk-note");
  }

  get reason() {
    return this.extra.$('p span[lang="en-US"]');
  }

  get reasonCode() {
    return this.reason.$("code");
  }

  get signalsLink() {
    return this.extra.$('[data-glean-id="baseline_link_signals"]');
  }

  /** @param {string} name */
  alternativeLink(name) {
    return this.extra.$(
      `[data-glean-id="baseline_link_alternatives: ${name}"]`,
    );
  }

  get alternativeLinks() {
    return this.extra.$$('[data-glean-id^="baseline_link_alternatives:"]');
  }

  get compatibilityLink() {
    return this.extra.$('[data-glean-id="baseline_link_bcd_table"]');
  }

  get learnMoreLink() {
    return this.extra.$('[data-glean-id="baseline_link_learn_more"]');
  }

  async isOpen() {
    return Boolean(await this.element.getProperty("open"));
  }

  /** @param {boolean} open */
  async setOpen(open) {
    if ((await this.isOpen()) !== open) {
      await this.summary.click();
    }
    await browser.waitUntil(async () => (await this.isOpen()) === open, {
      timeoutMsg: `Baseline indicator did not ${open ? "open" : "close"}`,
    });
  }

  async open() {
    await this.setOpen(true);
  }

  async close() {
    await this.setOpen(false);
  }
}
