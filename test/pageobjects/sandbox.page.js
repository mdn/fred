import Page from "./page.js";

class SandboxPage extends Page {
  /**
   * Opens a component's sandbox page.
   * @param {string} component component directory name
   * @param {string} [locale] page locale
   */
  open(component, locale = "en-US") {
    return super.open(
      `${encodeURIComponent(locale)}/sandbox/${encodeURIComponent(component)}`,
    );
  }
}

export default new SandboxPage();
