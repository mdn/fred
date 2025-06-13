const sidebar = document.querySelector(".left-sidebar");
const current = sidebar?.querySelector('[aria-current="page"]');
if (sidebar && current instanceof HTMLElement) {
  sidebar.scrollTo({
    top: current.offsetTop - window.innerHeight / 4,
  });
}
