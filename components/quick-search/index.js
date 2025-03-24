import { LitElement, css, html } from "lit";

export class QuickSearch extends LitElement {
  static styles = css`
    .quick-search {
      display: grid;
      grid-template-columns: 1fr min-content min-content;
      padding-inline: 0.75rem 3px;
      width: 5rem;
      height: 2rem;
      align-items: center;
      border-radius: calc(infinity * 1px);
      border: 1px solid var(--text-secondary);

      &:focus-within {
        width: 192px;
        outline: 2px solid var(--brand-blue);
        outline-offset: 2px;
      }
    }

    .quick-search__field {
      margin: 0;
      padding: 0;
      width: 100%;
      border: none;
      background-color: transparent;

      &:focus {
        outline: none;
      }

      &::placeholder {
        font-weight: bold;
        color: var(--brand-blue);
      }
    }

    .quick-search__button {
      margin: 0;
      padding: 0;
      display: grid;
      place-items: center;
      width: 1.5rem;
      height: 1.5rem;
      border: none;
      border-radius: 50%;
      background-color: transparent;
      color: var(--text-secondary);
      cursor: pointer;
      font: inherit;

      &:hover {
        background-color: var(--background-secondary);
      }

      &:focus-visible {
        outline: 2px solid var(--brand-blue);
      }
    }

    .quick-search__button--reset {
      .quick-search:not(:focus-within) & {
        display: none;
      }
    }
  `;
  render() {
    return html`<form class="quick-search" action="">
      <input
        class="quick-search__field"
        type="text"
        placeholder="__"
        required
      />
      <button
        class="quick-search__button quick-search__button--reset"
        type="reset"
      >
        <svg
          class="icon"
          width="16"
          height="16"
          viewBox="-64 0 512 512"
          aria-label="Clear"
        >
          <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          />
        </svg>
      </button>
      <button class="quick-search__button" type="submit">
        <svg
          class="icon"
          width="16"
          height="16"
          viewBox="0 0 512 512"
          aria-label="Send"
        >
          <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
          />
        </svg>
      </button>
    </form>`;
  }
}

customElements.define("quick-search", QuickSearch);
