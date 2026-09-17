const ROW_THRESHOLD = 10;

/**
 * @returns {number}
 */
function getHeaderOffset() {
  const header = document.querySelector(".page-layout__header");
  if (header instanceof HTMLElement) {
    return Math.max(0, header.getBoundingClientRect().bottom);
  }
  return 0;
}

/**
 * @param {HTMLTableElement} table
 * @returns {number}
 */
function countBodyRows(table) {
  let n = 0;
  for (const tbody of table.tBodies) {
    n += tbody.rows.length;
  }
  return n;
}

/**
 * @param {HTMLTableElement} table
 * @param {HTMLElement} container
 * @param {HTMLTableSectionElement} thead
 * @param {Element} section
 */
function setupStickyHeader(table, container, thead, section) {
  const overlay = document.createElement("div");
  // Table styles are scoped to the section wrapper, so mirror its classes.
  overlay.className = `${section.className} sticky-table-header`;
  overlay.hidden = true;

  const clone = /** @type {HTMLTableElement} */ (table.cloneNode(false));
  const colgroup = document.createElement("colgroup");
  clone.append(colgroup);
  clone.append(thead.cloneNode(true));
  clone.removeAttribute("id");
  for (const el of clone.querySelectorAll("[id]")) {
    el.removeAttribute("id");
  }
  // Keeps the clone out of the tab order and the a11y tree. Inert nodes are
  // skipped by hit testing, so the overlay itself stays hittable to swallow
  // clicks that would otherwise reach content underneath.
  clone.inert = true;
  overlay.append(clone);
  document.body.append(overlay);

  function syncSize() {
    const containerRect = container.getBoundingClientRect();
    const tableRect = table.getBoundingClientRect();
    const firstCell = thead.rows[0]?.cells[0];
    const borderTop = firstCell
      ? Number.parseFloat(getComputedStyle(firstCell).borderTopWidth) || 0
      : 0;
    overlay.style.left = `${containerRect.left}px`;
    overlay.style.width = `${containerRect.width}px`;
    overlay.style.top = `${getHeaderOffset() - borderTop}px`;
    clone.style.width = `${tableRect.width}px`;

    // Body cells resolve column boundaries hidden by spanning header cells.
    const boundaries = new Set();
    for (const row of table.rows) {
      for (const cell of row.cells) {
        const { left, right, width } = cell.getBoundingClientRect();
        if (width === 0) {
          continue;
        }
        boundaries.add(left);
        boundaries.add(right);
      }
    }
    // Adjacent cells can report slightly different floats for the same edge.
    const edges = [...boundaries]
      .sort((a, b) => a - b)
      .filter((edge, i, all) => i === 0 || edge - all[i - 1] > 0.5);
    if (getComputedStyle(table).direction === "rtl") {
      edges.reverse();
    }
    const columns = edges.slice(1).map((edge, i) => {
      const col = document.createElement("col");
      col.style.width = `${Math.abs(edge - edges[i])}px`;
      return col;
    });
    colgroup.replaceChildren(...columns);
  }

  function syncScroll() {
    // Geometric offset rather than `scrollLeft`, which is negative in RTL.
    const dx =
      table.getBoundingClientRect().left -
      container.getBoundingClientRect().left;
    clone.style.transform = `translateX(${dx}px)`;
  }

  let stuck = false;
  let rafId = 0;
  let resized = false;

  function check() {
    rafId = 0;
    const headerOffset = getHeaderOffset();
    const tableRect = table.getBoundingClientRect();
    const theadRect = thead.getBoundingClientRect();
    const shouldStick =
      theadRect.top < headerOffset &&
      tableRect.bottom > headerOffset + theadRect.height;

    const wasStuck = stuck;
    if (shouldStick !== stuck) {
      stuck = shouldStick;
      overlay.hidden = !stuck;
    }

    if (stuck) {
      // Cell widths only change on resize, so skip that work on plain scrolls.
      if (resized || !wasStuck) {
        syncSize();
      }
      syncScroll();
    }
    resized = false;
  }

  /**
   * @param {boolean} [sizeChanged]
   */
  function schedule(sizeChanged = false) {
    resized ||= sizeChanged;
    if (rafId) {
      return;
    }
    rafId = requestAnimationFrame(check);
  }

  const onScroll = () => schedule();
  const onResize = () => schedule(true);

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  container.addEventListener(
    "scroll",
    () => {
      if (stuck) {
        syncScroll();
      }
    },
    { passive: true },
  );

  const resizeObserver = new ResizeObserver(onResize);
  resizeObserver.observe(table);
  resizeObserver.observe(container);

  check();
}

for (const table of document.querySelectorAll(".table-container > table")) {
  if (!(table instanceof HTMLTableElement)) {
    continue;
  }
  const container = table.parentElement;
  if (!(container instanceof HTMLElement)) {
    continue;
  }
  const thead = table.tHead;
  if (!thead || thead.rows.length === 0) {
    continue;
  }
  if (countBodyRows(table) < ROW_THRESHOLD) {
    continue;
  }
  const section = container.closest(".content-section");
  if (!section) {
    continue;
  }
  setupStickyHeader(table, container, thead, section);
}
