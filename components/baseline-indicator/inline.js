if (localStorage.getItem("baseline-indicator") === "open") {
  const indicator = document.querySelector(".baseline-indicator");
  if (indicator instanceof HTMLDetailsElement) {
    indicator.open = true;
  }
}
