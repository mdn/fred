try {
  document.documentElement.style.colorScheme =
    localStorage.getItem("theme") || "light dark";
} catch (error) {
  console.warn("Unable to set theme", error);
}

try {
  if (localStorage.getItem("noads") === "enabled") {
    document.documentElement.dataset["noads"] = "enabled";
  }
} catch (error) {
  console.warn("Unable to set noads", error);
}
