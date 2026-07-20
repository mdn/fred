import { LitElement, html } from "lit";

import styles from "./element.css?lit";

export class MDNAboutTabs extends LitElement {
  static styles = styles;

  static get properties() {
    return {
      active_index: { type: Number },
    };
  }

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
        this._activateTab(i, tabs, panels);
      };

      // @ts-expect-error
      tabEl.removeEventListener("click", tabEl.__handleClick);
      tabEl.addEventListener("click", handleClick);
      // @ts-expect-error
      tabEl.__handleClick = handleClick;

      const handleKeydown = (/** @type {KeyboardEvent} */ e) => {
        const nextIndex = this._nextTabIndex(e, i, tabs.length);
        if (nextIndex === null) {
          return;
        }
        e.preventDefault();
        this._activateTab(nextIndex, tabs, panels);
      };

      // @ts-expect-error
      tabEl.removeEventListener("keydown", tabEl.__handleKeydown);
      tabEl.addEventListener("keydown", handleKeydown);
      // @ts-expect-error
      tabEl.__handleKeydown = handleKeydown;
    }

    for (const [i, panelEl] of panels.entries()) {
      panelEl.setAttribute("role", "tabpanel");
      panelEl.setAttribute("aria-hidden", (i !== this.active_index).toString());
      panelEl.classList.toggle("active", i === this.active_index);
      panelEl.classList.add("tabpanel");
    }
  }

  /**
   * Decide which tab should become active in response to a keydown on the
   * currently focused tab. Return the target tab's index, or `null` to let the
   * key through unhandled (e.g. it isn't a navigation key we care about).
   *
   * @param {KeyboardEvent} e - the keydown event on the focused tab
   * @param {number} currentIndex - index of the currently focused tab
   * @param {number} count - total number of tabs
   * @returns {number | null}
   */
  _nextTabIndex(e, currentIndex, count) {
    // Left/Right only, to stay consistent with aria-orientation="horizontal".
    // The observatory-results tablist uses native radios, which additionally
    // move on Up/Down, but those don't apply to a horizontal tablist.
    if (e.key === "ArrowRight") {
      return (currentIndex + 1 + count) % count;
    }
    if (e.key === "ArrowLeft") {
      return (currentIndex - 1 + count) % count;
    }
    return null;
  }

  /**
   * Select the tab at `index`, sync the URL hash, move keyboard focus to it,
   * and scroll its panel into view when it sits above the viewport. The scroll
   * is deferred to the next frame because setting `active_index` reveals the
   * panel asynchronously (Lit `updated` → `_wireSlots`), so the panel is still
   * `display: none` at the moment `location.hash` is assigned.
   * @param {number} index
   * @param {HTMLElement[]} tabs
   * @param {HTMLElement[]} panels
   */
  _activateTab(index, tabs, panels) {
    this.active_index = index;
    const nextTab = tabs[index];
    if (nextTab instanceof HTMLElement) {
      if (nextTab.dataset.panelId) {
        globalThis.location.hash = nextTab.dataset.panelId;
      }
      nextTab.focus();
    }

    requestAnimationFrame(() => {
      const panel = panels[this.active_index];
      if (panel && panel.getBoundingClientRect().top < 0) {
        panel.scrollIntoView({ block: "start", inline: "nearest" });
      }
    });
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
        <div class="tablist" role="tablist" aria-orientation="horizontal">
          <slot name="tab"></slot>
        </div>
      </div>
      <slot name="panel"></slot>
    `;
  }
}

customElements.define("mdn-about-tabs", MDNAboutTabs);
