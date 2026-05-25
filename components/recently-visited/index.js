export class RecentlyVisitedPages {
  static #key = "recently-visited";
  #pages;

  constructor() {
    this.#pages = this.#getFromStorage();
  }

  #getFromStorage() {
    const storage = localStorage.getItem(RecentlyVisitedPages.#key);
    if (storage) {
      let pages;
      try {
        pages = JSON.parse(storage);
        if (Array.isArray(pages)) {
          return pages.map((page) => new RecentlyVisitedPage(page));
        }
      } catch {
        console.error(`Parsing ${RecentlyVisitedPages.#key} failed`);
      }
    }
    return [];
  }

  #saveToStorage() {
    localStorage.setItem(
      RecentlyVisitedPages.#key,
      JSON.stringify(this.#pages),
    );
  }

  /**
   * @template T
   * @param {(value: RecentlyVisitedPage, index: number, array: RecentlyVisitedPage[]) => T} callback
   * @returns {T[]}
   */
  map(callback) {
    return this.#pages.map(callback);
  }

  /**
   * @param {RecentlyVisitedPage} page
   */
  add(page) {
    this.#pages = [
      ...new Map([page, ...this.#pages].map((p) => [p.path, p])).values(),
    ].slice(0, 10);
    this.#saveToStorage();
  }
}

export class RecentlyVisitedPage {
  title = "";
  path = "";

  /**
   * @param {object} data
   * @param {string} data.title
   * @param {string} data.path
   */
  constructor(data) {
    Object.assign(this, data);
  }
}
