import { MDNCodeExample } from "../components/code-example";
import { ColorTheme } from "../components/color-theme";
import { LazyCompatTable } from "../components/compat";
import { MDNCopyButton } from "../components/copy-button";
import { QuickSearch } from "../components/quick-search";

declare global {
  interface HTMLElementTagNameMap {
    "lazy-compat-table": LazyCompatTable;
    "mdn-color-theme": ColorTheme;
    "quick-search": QuickSearch;
    "mdn-copy-button": MDNCopyButton;
    "mdn-code-example": MDNCodeExample;
  }
}
