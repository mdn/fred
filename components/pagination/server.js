import { html, nothing } from "lit";

import { ServerComponent } from "../server/index.js";

export class Pagination extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   * @param {object} params
   * @param {number} [params.currentPage]
   * @param {number} [params.numPages]
   * @param {(page: number | string) => string} params.pageUrl
   * @param {number} [params.surroundingPages]
   * @returns {import("@lit").TemplateResult | nothing}
   */
  render(
    context,
    { currentPage = 1, numPages = 1, pageUrl, surroundingPages = 2 },
  ) {
    if (numPages <= 1) {
      return nothing;
    }

    const pageNumbers = this.generatePageNumbers(
      currentPage,
      numPages,
      surroundingPages,
    );

    return html`
      <nav class="pagination" aria-label=${context.l10n`Pagination`}>
        <ul class="pagination__list">
          ${this.renderPrevNextButton(
            "prev",
            currentPage - 1,
            currentPage === 1,
            pageUrl,
            context,
          )}
          ${this.renderPageNumbers(context, pageNumbers, currentPage, pageUrl)}
          ${this.renderPrevNextButton(
            "next",
            currentPage + 1,
            currentPage === numPages,
            pageUrl,
            context,
          )}
        </ul>
      </nav>
    `;
  }

  /**
   * @param {number} currentPage
   * @param {number} numPages
   * @param {number} surroundingPages
   * @returns {Array<number|string>}
   */
  generatePageNumbers(currentPage, numPages, surroundingPages) {
    if (numPages < 2 * surroundingPages + 3) {
      return Array.from({ length: numPages }, (_, i) => i + 1);
    }
    const pageNumbers = [];

    // Always add page 1
    pageNumbers.push(1);

    // Calculate start and end of the surrounding pages
    const startPage = Math.max(2, currentPage - surroundingPages);
    const endPage = Math.min(numPages - 1, currentPage + surroundingPages);

    // Add ellipsis after page 1 if needed
    if (startPage > 2) {
      pageNumbers.push("...");
    }

    // Add surrounding pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < numPages - 1) {
      pageNumbers.push("...");
    }

    // Always add last page if it's not page 1
    if (numPages > 1) {
      pageNumbers.push(numPages);
    }

    return pageNumbers;
  }

  /**
   * @param {"next" | "prev"} prevNext
   * @param {number} prevNextPage
   * @param {boolean} disabled
   * @param {(page: number) => string} pageUrl
   * @param {import("@fred").Context} context
   * @returns {import("@lit").TemplateResult | typeof nothing}
   */
  renderPrevNextButton(prevNext, prevNextPage, disabled, pageUrl, context) {
    const url = pageUrl(prevNextPage);

    return disabled
      ? html`
          <li class=${`pagination__item pagination__item--${prevNext}`}>
            <a
              class="pagination__link"
              href=${url}
              aria-label=${context.l10n(`pagination_${prevNext}`)}
            >
              ${prevNext === "next" ? "→" : "←"}
            </a>
          </li>
        `
      : nothing;
  }

  /**
   * @param {import("@fred").Context} context
   * @param {Array<number|string>} pageNumbers
   * @param {number} currentPage
   * @param {(page: number | string) => string} pageUrl
   * @returns {import("@lit").TemplateResult[]}
   */
  renderPageNumbers(context, pageNumbers, currentPage, pageUrl) {
    return pageNumbers.map((pageNumber) => {
      if (pageNumber === "...") {
        return html`
          <li class="pagination__item pagination__item--ellipsis">
            <span class="pagination__ellipsis">…</span>
          </li>
        `;
      }

      const isCurrentPage = pageNumber === currentPage;
      const url = isCurrentPage ? "#" : pageUrl(pageNumber);

      return html`
        <li class="pagination__item">
          <a
            href=${url}
            class="pagination__link ${isCurrentPage
              ? "pagination__link--active"
              : ""}"
            aria-current=${isCurrentPage ? "page" : "false"}
            aria-label=${isCurrentPage
              ? context.l10n("pagination_current")
              : context.l10n.raw({
                  id: "pagination_goto",
                  args: { page: pageNumber },
                })}
          >
            ${pageNumber}
          </a>
        </li>
      `;
    });
  }
}
