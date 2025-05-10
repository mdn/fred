import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";

import styles from "./element.css?lit";

class MDNPlacementNote extends L10nMixin(LitElement) {
  static styles = styles;

  render() {
    return html`<a
      href="/en-US/advertising"
      class="placement-note"
      data-glean="pong: pong-&gt;about"
      target="_blank"
      rel="noreferrer"
      >${this.l10n("placement_note")}</a
    >`;
  }
}

customElements.define("mdn-placement-note", MDNPlacementNote);
