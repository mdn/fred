import { LitElement } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";

export class MDNCurriculumTabs extends L10nMixin(LitElement) {
  static ssr = false;
  static properties = {
    selectedtab: {},
  };

  // Disable shadow DOM
  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    this.selectedtab = 1;
  }
}

customElements.define("mdn-curriculum-tabs", MDNCurriculumTabs);
