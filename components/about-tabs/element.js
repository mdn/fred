import { LitElement, html } from "lit";

import styles from "./element.css?lit";

export class MDNAboutTabs extends LitElement {
  static styles = styles;

  static properties = {
    active_index: { type: Number },
  };

  constructor() {
    super();
    /** @type {number} */
    this.active_index = 0;
  }

  firstUpdated() {
    if (this.shadowRoot === null) {
      return;
    }
    const el = this.shadowRoot.querySelector("slot[name='tab']");
    if (el === null) {
      return;
    }
    el.addEventListener("slotchange", () => this._wireSlots());
    this._wireSlots();
  }

  _wireSlots() {
    if (this.shadowRoot === null) {
      return;
    }
    const tabSlot = this.shadowRoot.querySelector('slot[name="tab"]');
    if (tabSlot === null) {
      return;
    }

    /** @type {HTMLSlotElement[]} */
    // @ts-expect-error
    const tabs = tabSlot.assignedElements({ flatten: true });
    const panelSlot = this.shadowRoot.querySelector('slot[name="panel"]');
    if (panelSlot === null) {
      return;
    }

    /** @type {HTMLSlotElement[]} */
    // @ts-expect-error
    const panels = panelSlot.assignedElements({ flatten: true });

    for (const [i, tabEl] of tabs.entries()) {
      // ensure ARIA roles & attributes
      tabEl.setAttribute("role", "tab");
      tabEl.setAttribute("aria-selected", (i === this.activeIndex).toString());
      tabEl.setAttribute("tabindex", i === this.activeIndex ? "0" : "-1");
      tabEl.classList.toggle("active", i === this.activeIndex);

      // detach any old listener
      tabEl.addEventListener("click", () => {
        this.activeIndex = i;
      });
    }

    for (const [i, panelEl] of panels.entries()) {
      panelEl.setAttribute("role", "tabpanel");
      panelEl.setAttribute("aria-hidden", (i !== this.activeIndex).toString());
      panelEl.classList.toggle("active", i === this.activeIndex);
    }
  }

  /** @param {Map<string | number | symbol, unknown>} changed */
  updated(changed) {
    if (changed.has("activeIndex")) {
      this._wireSlots();
    }
  }

  render() {
    return html`
      <div class="tabs">
        <div class="tablist-wrapper">
          <div class="tablist" role="tablist">
            <slot name="tab"></slot>
          </div>
        </div>
        <slot name="panel"></slot>
      </div>
    `;
  }
}

customElements.define("mdn-about-tabs", MDNAboutTabs);
