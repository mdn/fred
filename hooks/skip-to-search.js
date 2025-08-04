import { MDNSearchModal } from "../components/search-modal/element.js";

const skipToSearch = document.querySelector(`.a11y-menu a[href="#search"]`);

if (skipToSearch instanceof HTMLAnchorElement) {
  const search = document.querySelector("#search");

  if (search instanceof MDNSearchModal) {
    skipToSearch.addEventListener("click", (event) => {
      const { target } = event;

      if (target instanceof HTMLElement) {
        target.blur();
        event.preventDefault();
      }

      search.showModal();
    });
  } else {
    console.error("MDNSearchModal not found!");
    skipToSearch.hidden = true;
  }
}
