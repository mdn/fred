for (const pre of document.querySelectorAll(`pre.css-formal-syntax`)) {
  const code = pre.textContent;
  if (!code) {
    continue;
  }

  const outer = document.createElement("div");
  outer.className = "code-example";

  const footer = pre.nextElementSibling;

  pre.replaceWith(outer);
  outer.append(pre);

  if (footer) {
    footer.remove();
    outer.append(footer);
  }
}

export {};
