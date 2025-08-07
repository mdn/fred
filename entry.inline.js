try {
  document.documentElement.style.colorScheme =
    localStorage.getItem("theme") || "light dark";
} catch (error) {
  console.warn("Unable to set theme", error);
}

try {
  if (localStorage.getItem("nop") === "yes") {
    document.documentElement.dataset["nop"] = "yes";
  }
} catch (error) {
  console.warn("Unable to set nop", error);
}
