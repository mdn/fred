try {
  document.documentElement.style.colorScheme =
    localStorage.getItem("theme") || "light dark";
} catch (error) {
  console.warn("Unable to set theme", error);
}
