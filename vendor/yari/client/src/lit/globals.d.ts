import { ContributorList } from "./community/contributor-list";
import { ScrimInline } from "./curriculum/scrim-inline";

declare global {
  interface HTMLElementTagNameMap {
    "contributor-list": ContributorList;
    "scrim-inline": ScrimInline;
  }

  interface WindowEventMap {
    "glean-click": CustomEvent<string>;
  }
}
