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
    const tabSlot = this.shadowRoot.querySelector("slot[name='tab']");
    if (tabSlot === null) {
      return;
    }

    // Check for URL hash and set active_index accordingly
    const hash = globalThis.location.hash.slice(1);
    if (hash) {
      const tabHash = hash.startsWith("our_team")
        ? "our_team"
        : hash.startsWith("our_partners") ||
            hash === "product_advisory_board" ||
            hash === "open_web_docs"
          ? "our_partners"
          : hash;

      // @ts-expect-error
      const tabs = tabSlot.assignedElements({ flatten: true });
      if (tabs && tabs.length > 0) {
        for (const [i, tabEl] of tabs.entries()) {
          if (
            tabEl instanceof HTMLElement &&
            tabEl.dataset.panelId === tabHash
          ) {
            this.active_index = i;
            break;
          }
        }
      }
    }

    tabSlot.addEventListener("slotchange", () => this._wireSlots());
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
      tabEl.setAttribute("aria-selected", (i === this.active_index).toString());
      tabEl.setAttribute("tabindex", i === this.active_index ? "0" : "-1");
      tabEl.classList.toggle("active", i === this.active_index);

      const handleClick = (/** @type {Event} */ e) => {
        e.preventDefault();
        if (tabEl.dataset.panelId) {
          globalThis.location.hash = tabEl.dataset.panelId;
        }
        this.active_index = i;

        requestAnimationFrame(() => {
          const panel = panels[this.active_index];
          if (panel && panel.getBoundingClientRect().top < 0) {
            panel.scrollIntoView({ block: "start", inline: "nearest" });
          }
        });
      };

      // @ts-expect-error
      tabEl.removeEventListener("click", tabEl.__handleClick);
      tabEl.addEventListener("click", handleClick);
      // @ts-expect-error
      tabEl.__handleClick = handleClick;
    }

    for (const [i, panelEl] of panels.entries()) {
      panelEl.setAttribute("role", "tabpanel");
      panelEl.setAttribute("aria-hidden", (i !== this.active_index).toString());
      panelEl.classList.toggle("active", i === this.active_index);
      panelEl.classList.add("tabpanel");
    }
  }

  /** @param {Map<string | number | symbol, unknown>} changed */
  updated(changed) {
    if (changed.has("active_index")) {
      this._wireSlots();
    }
  }

  render() {
    return html`
      <div class="tablist-wrapper">
        <div class="tablist">
          <slot name="tab"></slot>
        </div>
      </div>
      <slot name="panel"></slot>
    `;
  }
}

customElements.define("mdn-about-tabs", MDNAboutTabs);
