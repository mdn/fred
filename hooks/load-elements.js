const loaded = new Set();
for (const element of document.querySelectorAll("*")) {
  const tag = element.tagName.toLowerCase();
  if (tag.startsWith("mdn-") || tag === "interactive-example") {
    const component = tag.replace("mdn-", "");
    if (!loaded.has(component)) {
      loaded.add(component);
      // we don't want to await, because we want these to load in parallel
      // eslint-disable-next-line unicorn/prefer-top-level-await
      import(`../components/${component}/element.js`).catch((error) => {
        console.error(
          `couldn't load code for <${component}>: does the element's code not match the naming schema?`,
          error,
        );
      });
    }
  }
}
