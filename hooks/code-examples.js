for (const pre of document.querySelectorAll(
  `div.code-example pre:not(.hidden):not([class*="live-sample"]):not([class*="interactive-example"])`,
)) {
  const { upgradePre } = await import("../components/code-example/element.js");
  upgradePre(pre);
}
