import { $ } from "@wdio/globals";

import Page from "./page.js";

class DocPage extends Page {
  get title() {
    return $("h1:first-of-type");
  }
}

export default new DocPage();
