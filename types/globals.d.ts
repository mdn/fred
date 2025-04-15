import { MDNCodeExample } from "../components/code-example";
import { ColorTheme } from "../components/color-theme";
import { LazyCompatTable } from "../components/compat";
import { MDNCopyButton } from "../components/copy-button";
import { MDNSearchModal } from "../components/search-modal/element.js";

declare global {
  interface HTMLElementTagNameMap {
    "lazy-compat-table": LazyCompatTable;
    "mdn-color-theme": ColorTheme;
    "mdn-copy-button": MDNCopyButton;
    "mdn-code-example": MDNCodeExample;
    "mdn-search-modal": MDNSearchModal;
  }
}
