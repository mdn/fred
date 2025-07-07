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
    const target = document.querySelector(
      `[id="${decodeURIComponent(item.hash).slice(1)}"]`,
    );

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
  const visibleSectionsByItem = new WeakMap();

  /** @type {Set<HTMLElement>} */
  const everVisibleSections = new Set();

  // 3. Handle visibility transitions
  const onIntersect = (/** @type {IntersectionObserverEntry[]} */ entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!(target instanceof HTMLElement)) {
        continue;
      }

      if (!everVisibleSections.has(target)) {
        if (isIntersecting) {
          everVisibleSections.add(target);
        } else {
          continue;
        }
      }

      const item = tocItemBySection.get(target);

      if (!item) {
        continue;
      }

      const visibleCount =
        (visibleSectionsByItem.get(item) ?? 0) + (isIntersecting ? 1 : -1);

      item.ariaCurrent = visibleCount > 0 ? "true" : null;
      visibleSectionsByItem.set(item, visibleCount);
    }
  };

  // 5. Determine options.
  /** @type {IntersectionObserverInit} */
  const options = {
    threshold: 0,
  };
  const header = document.querySelector("header");
  if (header instanceof HTMLElement) {
    options.rootMargin = `-${header.clientHeight}px 0px 0px 0px`;
  }

  // 5. Init observer.
  const observer = new IntersectionObserver(onIntersect, options);

  // 6. Observe sections.
  for (const section of tocItemBySection.keys()) {
    observer.observe(section);
  }
}

for (const toc of document.querySelectorAll(
  ".generic-toc, .reference-toc, .document-toc, .blog-toc",
)) {
  if (toc instanceof HTMLElement) {
    highlightTOC(toc);
  }
}
