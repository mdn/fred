try {
  const mode = localStorage.getItem("theme");
  if (mode) {
    document.documentElement.style.colorScheme =
      mode === "osDefault" ? "light dark" : mode;
  }
} catch (error) {
  console.warn("Unable to set theme", error);
}
