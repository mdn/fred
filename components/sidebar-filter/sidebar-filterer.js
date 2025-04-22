/**
 * Splits a search query into an array of lowercase terms.
 * @param {string} query The input search query.
 * @returns {string[]} The resulting array of query terms.
 */
function splitQuery(query) {
  return query.toLowerCase().split(/\s+/).filter(Boolean);
}

/**
 * @typedef {object} Item
 * @property {string} haystack - The lowercased text for matching.
 * @property {HTMLAnchorElement} link - The anchor element.
 * @property {HTMLElement} container - The container (closest 'li' element).
 * @property {HTMLElement|undefined} heading - The heading element (if any).
 * @property {HTMLDetailsElement[]} parents - The parent details elements.
 */

/**
 * A class to filter sidebar items based on search queries.
 */
export class SidebarFilterer {
  /**
   * @param {HTMLElement} root The root element to search within.
   */
  constructor(root) {
    /**
     * @type {HTMLElement[]}
     */
    this.allHeadings = [...root.querySelectorAll("li strong")].filter(
      (el) => el instanceof HTMLElement,
    );

    /**
     * @type {HTMLDetailsElement[]}
     */
    this.allParents = [...root.querySelectorAll("details")];

    const links = [...root.querySelectorAll("a[href]")];

    /**
     * @type {Item[]}
     */
    this.items = links.map((link) => ({
      haystack: (link.textContent || "").toLowerCase(),
      link,
      container: this.getContainerOf(link),
      heading: this.getHeadingOf(link),
      parents: this.getParentsOf(link),
    }));

    this.toc = root.closest(".sidebar")?.querySelector(".in-nav-toc") || null;
  }

  /**
   * Applies a filter to the sidebar items.
   * @param {string} query The filter query.
   * @returns {number|undefined} The number of matching items if a query is provided; otherwise undefined.
   */
  applyFilter(query) {
    if (query) {
      this.toggleTOC(false);
      return this.showOnlyMatchingItems(query);
    } else {
      this.toggleTOC(true);
      this.showAllItems();
      return;
    }
  }

  /**
   * Toggles the TOC (table of contents) element's visibility.
   * @private
   * @param {boolean} show Whether to show the TOC.
   */
  toggleTOC(show) {
    if (this.toc) {
      this.toggleElement(this.toc, show);
    }
  }

  /**
   * Toggles the display style of an element.
   * @private
   * @param {HTMLElement} el The element to toggle.
   * @param {boolean} show Whether to show (true) or hide (false) the element.
   */
  toggleElement(el, show) {
    el.style.display = show ? "" : "none";
  }

  /**
   * Resets and shows all sidebar items.
   */
  showAllItems() {
    for (const { link } of this.items) this.resetLink(link);
    for (const heading of this.allHeadings) this.resetHeading(heading);
    for (const parent of this.allParents) this.resetParent(parent);
  }

  /**
   * Resets a link by removing any highlighting and ensuring its container is visible.
   * @private
   * @param {HTMLAnchorElement} link The link to reset.
   */
  resetLink(link) {
    this.resetHighlighting(link);
    const container = this.getContainerOf(link);
    this.toggleElement(container, true);
  }

  /**
   * Returns the container element (the closest "li") for the provided element.
   * @private
   * @param {HTMLElement} el The element to find the container for.
   * @returns {HTMLElement} The container element.
   */
  getContainerOf(el) {
    return el.closest("li") || el;
  }

  /**
   * Resets a heading by ensuring its container is visible.
   * @private
   * @param {HTMLElement} heading The heading element to reset.
   */
  resetHeading(heading) {
    const container = this.getContainerOf(heading);
    this.toggleElement(container, true);
  }

  /**
   * Resets a parent details element by showing its container and restoring its open state.
   * @private
   * @param {HTMLDetailsElement} parent The details element to reset.
   */
  resetParent(parent) {
    const container = this.getContainerOf(parent);
    this.toggleElement(container, true);
    if (parent.dataset.wasOpen) {
      parent.open = JSON.parse(parent.dataset.wasOpen);
      delete parent.dataset.wasOpen;
    }
  }

  /**
   * Removes highlighting from the given link element.
   * @private
   * @param {HTMLAnchorElement} link The link element to reset.
   */
  resetHighlighting(link) {
    const nodes = [...link.querySelectorAll("span, mark")];
    const parents = new Set();
    for (const node of nodes) {
      const parent = node.parentElement;
      node.replaceWith(document.createTextNode(node.textContent || ""));
      if (parent) {
        parents.add(parent);
      }
    }
    for (const parent of parents) parent.normalize();
  }

  /**
   * Shows only the items that match the provided query.
   * @param {string} query The search query.
   * @returns {number} The count of matching items.
   */
  showOnlyMatchingItems(query) {
    for (const heading of this.allHeadings) this.hideHeading(heading);
    for (const parent of this.allParents) this.collapseParent(parent);

    // Split the query into search terms.
    const terms = splitQuery(query);
    let matchCount = 0;

    // Evaluate each item.
    for (const { haystack, link, container, heading, parents } of this.items) {
      this.resetHighlighting(link);
      const isMatch = terms.every((needle) => haystack.includes(needle));

      this.toggleElement(container, isMatch);

      if (isMatch) {
        matchCount++;
        this.highlightMatches(link, terms);
        if (heading) {
          this.showHeading(heading);
        }
        for (const parent of parents) {
          this.expandParent(parent);
        }
      }
    }

    return matchCount;
  }

  /**
   * Hides a heading element by toggling its container.
   * @private
   * @param {HTMLElement} heading The heading element to hide.
   */
  hideHeading(heading) {
    const container = this.getContainerOf(heading);
    this.toggleElement(container, false);
  }

  /**
   * Collapses a parent details element and hides its container.
   * @private
   * @param {HTMLDetailsElement} parent The details element to collapse.
   */
  collapseParent(parent) {
    const container = this.getContainerOf(parent);
    this.toggleElement(container, false);
    parent.dataset.wasOpen = parent.dataset.wasOpen || String(parent.open);
    parent.open = false;
  }

  /**
   * Highlights matching terms within an element by wrapping them with a <mark> element.
   * @private
   * @param {HTMLElement} el The element to highlight.
   * @param {string[]} terms The search terms.
   */
  highlightMatches(el, terms) {
    const nodes = this.getTextNodesOf(el);

    for (const node of nodes) {
      const haystack = node.textContent?.toLowerCase();
      if (!haystack) {
        continue;
      }

      const ranges = new Map();
      for (const needle of terms) {
        const index = haystack.indexOf(needle);
        if (index !== -1) {
          ranges.set(index, index + needle.length);
        }
      }
      const sortedRanges = [...ranges.entries()].sort(
        ([x1, y1], [x2, y2]) => x1 - x2 || y1 - y2,
      );

      const span = this.replaceChildNode(node, "span");
      span.className = "highlight-container";

      let rest = span.childNodes[0];
      let cursor = 0;

      for (const [rangeBegin, rangeEnd] of sortedRanges) {
        if (rangeBegin < cursor) {
          // Ignore overlapping or conflicting ranges.
          continue;
        }

        // Split the text node to isolate the matching segment.
        const match = rest.splitText(rangeBegin - cursor);
        const newRest = match.splitText(rangeEnd - rangeBegin);

        // Replace the matching text node with a <mark> element.
        this.replaceChildNode(match, "mark");

        rest = newRest;
        cursor = rangeEnd;
      }
    }
  }

  /**
   * Recursively collects all text nodes under a given node.
   * @private
   * @param {Node} node The node to search within.
   * @returns {Array<Node>} An array of text nodes.
   */
  getTextNodesOf(node) {
    const parents = [node];
    const nodes = [];

    for (const parent of parents) {
      for (const childNode of parent.childNodes) {
        if (childNode.nodeType === Node.TEXT_NODE) {
          nodes.push(childNode);
        } else if (childNode.hasChildNodes && childNode.hasChildNodes()) {
          parents.push(childNode);
        }
      }
    }
    return nodes;
  }

  /**
   * Replaces a child node with a new element of the specified tag.
   * @private
   * @param {ChildNode} node The node to be replaced.
   * @param {string} tagName The tag name for the new element.
   * @returns {HTMLElement} The newly created element.
   */
  replaceChildNode(node, tagName) {
    const text = node.textContent;
    const newNode = document.createElement(tagName);
    newNode.textContent = text || "";
    node.replaceWith(newNode);
    return newNode;
  }

  /**
   * Ensures that the container for the given heading is visible.
   * @private
   * @param {HTMLElement} heading The heading element to show.
   */
  showHeading(heading) {
    const container = heading && this.getContainerOf(heading);
    if (container) {
      this.toggleElement(container, true);
    }
  }

  /**
   * Retrieves the first heading element (from allHeadings) that appears before the specified element.
   * @private
   * @param {HTMLElement} el The reference element.
   * @returns {HTMLElement|undefined} The matching heading or undefined.
   */
  getHeadingOf(el) {
    return this.findFirstElementBefore(el, this.allHeadings);
  }

  /**
   * Finds the first element among candidates that occurs before the specified element in the document.
   * @private
   * @param {HTMLElement} el The reference element.
   * @param {HTMLElement[]} candidates An array of candidate elements.
   * @returns {HTMLElement|undefined} The found element or undefined if none found.
   */
  findFirstElementBefore(el, candidates) {
    return [...candidates]
      .reverse()
      .find(
        (candidate) =>
          candidate.compareDocumentPosition(el) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      );
  }

  /**
   * Expands a parent details element and ensures its container is visible.
   * @private
   * @param {HTMLDetailsElement} parent The details element to expand.
   */
  expandParent(parent) {
    const container = this.getContainerOf(parent);
    this.toggleElement(container, true);
    parent.open = true;
  }

  /**
   * Retrieves all parent <details> elements for the given element.
   * @private
   * @param {HTMLElement} el The element for which to find parent details.
   * @returns {HTMLDetailsElement[]} An array of parent <details> elements.
   */
  getParentsOf(el) {
    const parents = [];
    let parent = el.parentElement ? el.parentElement.closest("details") : null;

    while (parent) {
      parents.push(parent);
      parent = parent.parentElement
        ? parent.parentElement.closest("details")
        : null;
    }

    return parents;
  }
}
