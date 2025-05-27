import { LitElement } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";

/**
 * This simply takes care of url hashes and maps to the correct tab to be selected on page load
 */
export class MDNCurriculumTabs extends L10nMixin(LitElement) {
  static ssr = false;
  static properties = {
    selectedtab: {},
  };

  // Disable shadow DOM
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    const inputs = this.querySelectorAll('input[type="radio"]');
    const hash = globalThis.location.hash.replace(/^#/, "");

    for (const inputElement of inputs) {
      if (inputElement.id === hash) {
        const input =
          inputElement instanceof HTMLInputElement ? inputElement : undefined;
        if (!input) continue;
        input.checked = true;
        this.selectedtab = input.dataset.index
          ? Number(input.dataset.index)
          : 1;
      }
      inputElement.addEventListener("click", (_event) => {
        const id = inputElement.id;
        if (id) {
          history.pushState(null, "", `#${id}`);
        }
      });
    }
  }

  constructor() {
    super();
    this.selectedtab = 1;
  }
}

customElements.define("mdn-curriculum-tabs", MDNCurriculumTabs);
