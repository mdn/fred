globalThis.addEventListener("mdn-color-theme-update", (event) => {
  if (event instanceof CustomEvent && event.detail) {
    // legacy react compatibility:
    event.detail == "light"
      ? document.documentElement.classList.add("light")
      : document.documentElement.classList.remove("light");
    event.detail == "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }
});
