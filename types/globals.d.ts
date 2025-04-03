import { ColorTheme } from "../components/color-theme";
import { LazyCompatTable } from "../components/compat";
import { QuickSearch } from "../components/quick-search";

declare global {
  interface HTMLElementTagNameMap {
    "lazy-compat-table": LazyCompatTable;
    "mdn-color-theme": ColorTheme;
    "quick-search": QuickSearch;
  }
}
