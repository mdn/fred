globalThis.addEventListener("mdn-color-theme-update", (event) => {
  if (event instanceof CustomEvent && event.detail) {
    // legacy react compatibility:
    document.documentElement.classList.toggle("light", event.detail == "light");
    document.documentElement.classList.toggle("dark", event.detail == "dark");
  }
});
