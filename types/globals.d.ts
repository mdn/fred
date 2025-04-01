import { BCDTable } from "../components/bcd";
import { ColorTheme } from "../components/color-theme";
import { QuickSearch } from "../components/quick-search";

declare global {
  interface HTMLElementTagNameMap {
    "bcd-table": BCDTable;
    "mdn-color-theme": ColorTheme;
    "quick-search": QuickSearch;
  }
}
