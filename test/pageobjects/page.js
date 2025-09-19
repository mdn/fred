import { browser } from "@wdio/globals";

export default class Page {
  /**
   * Opens a page at path
   * @param {string} path path of page (e.g. /path/to/page.html)
   */
  open(path) {
    return browser.url(`http://localhost:3000/${path}`);
  }
}
