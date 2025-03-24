const dropdownButtons = document.querySelectorAll(".dropdown");

/**
 * @param {Element} button
 */
function toggleDropdown(button) {
  const isExpanded = button.getAttribute("aria-expanded") === "true";
  const dropdownId = button.getAttribute("aria-controls");
  const dropdown = dropdownId ? document.getElementById(dropdownId) : null;

  if (dropdown) {
    button.setAttribute("aria-expanded", String(!isExpanded));
    dropdown.toggleAttribute("hidden");
  }
}

dropdownButtons.forEach((button) => {
  button.addEventListener("click", () => {
    toggleDropdown(button);
  });
});

document.addEventListener("click", (event) => {
  dropdownButtons.forEach((button) => {
    const dropdownId = button.getAttribute("aria-controls");
    const dropdown = dropdownId ? document.getElementById(dropdownId) : null;

    if (
      event.target instanceof Node &&
      !button.contains(event.target) &&
      dropdown &&
      !dropdown.contains(event.target)
    ) {
      if (button.getAttribute("aria-expanded") === "true") {
        toggleDropdown(button);
      }
    }
  });
});
