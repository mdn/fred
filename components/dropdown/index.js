const dropdownButtons = document.querySelectorAll(".dropdown");

/**
 * @param {Element} button
 */
function toggleDropdown(button) {
  const isExpanded = button.getAttribute("aria-expanded") === "true";
  const dropdownId = button.getAttribute("aria-controls");
  const dropdown = dropdownId
    ? document.querySelector(`#${dropdownId}`)
    : undefined;

  if (dropdown) {
    button.setAttribute("aria-expanded", String(!isExpanded));
    dropdown.toggleAttribute("hidden");
  }
}

for (const button of dropdownButtons) {
  button.addEventListener("click", () => {
    toggleDropdown(button);
  });
}

document.addEventListener("click", (event) => {
  for (const button of dropdownButtons) {
    const dropdownId = button.getAttribute("aria-controls");
    const dropdown = dropdownId
      ? document.querySelector(`#${dropdownId}`)
      : undefined;

    if (
      event.target instanceof Node &&
      !button.contains(event.target) &&
      dropdown &&
      !dropdown.contains(event.target) &&
      button.getAttribute("aria-expanded") === "true"
    ) {
      toggleDropdown(button);
    }
  }
});
