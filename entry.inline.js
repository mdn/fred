try {
  document.documentElement.dataset.theme =
    localStorage.getItem("theme") || "light dark";
} catch (error) {
  console.warn("Unable to set theme", error);
}

try {
  if (localStorage.getItem("nop") === "yes") {
    document.documentElement.dataset["nop"] = "yes";
  }
} catch (error) {
  console.warn("Unable to set nop", error);
}

try {
  if (localStorage.getItem("baseline-indicator") === "open") {
    /** @param {HTMLDetailsElement} indicator */
    const open = (indicator) => {
      observer.disconnect();
      indicator.open = true;
    };
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (
            node instanceof HTMLDetailsElement &&
            node.classList.contains("baseline-indicator")
          ) {
            open(node);
          }
        }
      }
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
    const indicator = document.querySelector(".baseline-indicator");
    if (indicator instanceof HTMLDetailsElement) {
      open(indicator);
    }
  }
} catch (error) {
  console.warn("Unable to set baseline indicator state", error);
}
