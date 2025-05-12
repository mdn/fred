import { LitElement } from "lit";

export class MDNImageHistory extends LitElement {
  // Force client-side rendering for disabled shadow DOM
  static ssr = false;

  // Disable shadow DOM
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    for (const img of this.renderRoot.querySelectorAll("img")) {
      const regex = /@([0-9]+(?:\.[0-9]+)?)(?=x\.[a-z]+$)/;
      const match = img.src.match(regex);
      if (match?.[1]) {
        const baseRes = Number.parseFloat(match[1]);
        const dpis = [1, 2];
        img.srcset = dpis
          .map(
            (dpi) => `${img.src.replace(regex, `@${baseRes * dpi}`)} ${dpi}x`,
          )
          .join(", ");
      }
    }
  }
}

customElements.define("mdn-image-history", MDNImageHistory);
