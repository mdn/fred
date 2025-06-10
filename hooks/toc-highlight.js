/**
 * @param {HTMLElement} toc
 * @returns {void}
 */
function highlightTOC(toc) {
  // 1. Collect TOC items
  const tocItems = [...toc.querySelectorAll("a")];

  // 2. Map sections to TOC item
  /** @type {Map<HTMLElement, HTMLAnchorElement>} */
  const tocItemBySection = new Map();
  for (const item of tocItems.reverse()) {
    const target = document.querySelector(item.hash);

    if (!target) {
      continue;
    }

    /** @type {Element|null} */
    let section = target.closest("section");

    while (
      section &&
      section instanceof HTMLElement &&
      !tocItemBySection.has(section)
    ) {
      tocItemBySection.set(section, item);
      const next = section.nextElementSibling;
      section = next;
    }
  }

  /** @type {WeakMap<HTMLElement,number>} */
  const visibleCounts = new WeakMap();

  // 3. Handle visibility transitions
  const onIntersect = (/** @type {IntersectionObserverEntry[]} */ entries) => {
    for (const entry of entries) {
      if (!(entry.target instanceof HTMLElement)) {
        continue;
      }
      const item = tocItemBySection.get(entry.target);
      if (!item) {
        continue;
      }

      let visibleCount = visibleCounts.get(item);
      if (typeof visibleCount === "number") {
        visibleCount += entry.isIntersecting ? 1 : -1;
        item.ariaCurrent = visibleCount > 0 ? "true" : null;
        visibleCounts.set(item, visibleCount);
      } else if (entry.isIntersecting) {
        item.ariaCurrent = "true";
        visibleCounts.set(item, 1);
      }
    }
  };

  // 4. Init observer
  const observer = new IntersectionObserver(onIntersect, {
    threshold: 0,
  });

  // 5. Observe sections
  for (const section of tocItemBySection.keys()) {
    observer.observe(section);
  }
}

for (const toc of document.querySelectorAll(".generic-toc, .reference-toc")) {
  if (toc instanceof HTMLElement) {
    highlightTOC(toc);
  }
}
