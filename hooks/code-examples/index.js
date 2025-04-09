for (const pre of document.querySelectorAll(
  "div.code-example pre:not(.hidden)",
)) {
  const header = pre.parentElement?.querySelector(".example-header");
  if (header) {
    const copy = document.createElement("mdn-copy");
    copy.copiesFrom = pre;
    header.append(copy);

    const { highlightElement } = await import("./syntax-highlight.js");
    highlightElement(
      pre,
      header?.querySelector(".language-name")?.textContent || "plain",
    );
  }
}

export {};
