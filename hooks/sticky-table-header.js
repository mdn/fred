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
 */
function setupStickyHeader(table, container, thead) {
  const overlay = document.createElement("div");
  overlay.className = "content-section sticky-table-header";
  // Keeps the clone out of the tab order, hit testing, and the a11y tree.
  overlay.inert = true;
  overlay.hidden = true;

  const clone = /** @type {HTMLTableElement} */ (table.cloneNode(false));
  for (const colgroup of table.querySelectorAll(":scope > colgroup")) {
    clone.append(colgroup.cloneNode(true));
  }
  clone.append(thead.cloneNode(true));
  clone.removeAttribute("id");
  for (const el of clone.querySelectorAll("[id]")) {
    el.removeAttribute("id");
  }
  overlay.append(clone);
  document.body.append(overlay);

  const cloneHead = clone.tHead;

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

    if (!cloneHead) {
      return;
    }
    for (let r = 0; r < thead.rows.length; r++) {
      const srcRow = thead.rows[r];
      const dstRow = cloneHead.rows[r];
      if (!srcRow || !dstRow) {
        continue;
      }
      for (let c = 0; c < srcRow.cells.length; c++) {
        const src = srcRow.cells[c];
        const dst = dstRow.cells[c];
        if (!src || !dst) {
          continue;
        }
        const w = src.getBoundingClientRect().width;
        dst.style.width = `${w}px`;
        dst.style.minWidth = `${w}px`;
        dst.style.maxWidth = `${w}px`;
      }
    }
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

  function check() {
    rafId = 0;
    const headerOffset = getHeaderOffset();
    const tableRect = table.getBoundingClientRect();
    const theadHeight = thead.getBoundingClientRect().height;
    const shouldStick =
      tableRect.top < headerOffset &&
      tableRect.bottom > headerOffset + theadHeight;

    if (shouldStick !== stuck) {
      stuck = shouldStick;
      overlay.hidden = !stuck;
    }

    if (stuck) {
      syncSize();
      syncScroll();
    }
  }

  function schedule() {
    if (rafId) {
      return;
    }
    rafId = requestAnimationFrame(check);
  }

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  container.addEventListener(
    "scroll",
    () => {
      if (stuck) {
        syncScroll();
      }
    },
    { passive: true },
  );

  const resizeObserver = new ResizeObserver(schedule);
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
  setupStickyHeader(table, container, thead);
}
