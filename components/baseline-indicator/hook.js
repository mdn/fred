try {
  const indicator = document.querySelector(".baseline-indicator");
  if (indicator instanceof HTMLDetailsElement) {
    indicator.addEventListener("toggle", () => {
      saveState(indicator.open);
    });
    saveState(indicator.open);
  }

  /**
   * @param {boolean} open
   */
  function saveState(open) {
    if (open) {
      localStorage.setItem("baseline-indicator", "open");
    } else {
      localStorage.removeItem("baseline-indicator");
    }
  }
} catch (error) {
  console.warn("Unable to attach to baseline indicator", error);
}
