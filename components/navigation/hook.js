const button = document.querySelector(`[aria-controls="navigation__popup"]`);
const menu = document.querySelector("#navigation__popup");
if (button instanceof HTMLElement && menu instanceof HTMLElement) {
  button.addEventListener("click", () => {
    const open = (!(menu.dataset.open === "true")).toString();
    menu.dataset.open = open;
    button.setAttribute("aria-expanded", open);
  });
}
