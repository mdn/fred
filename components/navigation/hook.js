const button = document.querySelector(`[aria-controls="navigation__popup"]`);
const navigation = document.querySelector(".navigation");
if (button instanceof HTMLElement && navigation instanceof HTMLElement) {
  button.addEventListener("click", () => {
    const open = (!(navigation.dataset.open === "true")).toString();
    navigation.dataset.open = open;
    button.setAttribute("aria-expanded", open);
  });
}
