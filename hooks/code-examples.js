import "../components/code-example/index.js";

for (const pre of document.querySelectorAll(
  "div.code-example pre:not(.hidden)",
)) {
  const example = pre.closest("div.code-example");
  const language = example?.querySelector(".language-name")?.textContent;
  const code = example?.querySelector("code");
  if (example && language && code) {
    const newExample = document.createElement("mdn-code-example");
    newExample.language = language;
    newExample.append(code);
    example.replaceWith(newExample);
  }
}

export {};
