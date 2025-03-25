// @ts-nocheck

import { LitElement, css, html } from "lit";
import { Task } from "@lit/task";
import { getCurrentSupport } from "./helpers";

export class BCDTable extends LitElement {
  static styles = css`
    .more {
      display: none;
    }

    button:focus-within ~ .more {
      display: initial;
    }

    table {
      display: grid;
      grid-template-columns: repeat(var(--cols), 1fr);
      grid-auto-flow: row dense;
      thead {
        writing-mode: sideways-lr;
        text-orientation: sideways;
        white-space: nowrap;
        line-height: 1;
        display: contents;

        tr {
          display: contents;
          td {
            display: grid;
            grid-template-columns: subgrid;
          }
        }
      }
      tbody {
        display: contents;
        tr {
          display: contents;

          td {
            display: contents;
            button {
              display: grid;
              grid-template-columns: subgrid;
            }

            .more {
              grid-column: 1/-1;
            }
          }
        }
      }
    }
  `;
  static properties = {
    query: { type: String },
  };

  _dataTask = new Task(this, {
    task: async ([query], { signal }) => {
      if (query) {
        const response = await fetch(
          `https://bcd.developer.allizom.org/bcd/api/v0/current/${query}.json`,
          {
            signal,
          },
        );

        if (!response.ok) {
          throw new Error(response.status);
        }

        return response.json();
      } else {
        return null;
      }
    },
    args: () => [this.query],
  });

  render() {
    return this._dataTask.render({
      pending: () => html`<p>Loading data...</p>`,
      complete: (data) => {
        return Table(data);
      },
      error: (e) => html`<p>Error loading data for ${this.bcdKey}: ${e}</p>`,
    });
  }
}

function Table(data) {
  let firstData = data.data.__compat;
  let firstRow = Row([
    firstData.source_file.split("/")?.at(-1)?.slice?.(0, -5),
    data.data,
  ]);

  const rows = [firstRow, ...Object.entries(data.data).map(Row)];

  return (
    data &&
    html`<figure
      style="--cols: ${[...Object.keys(data.browsers).filter((b) => b != "ie")]
        .length + 1};"
    >
      <table>
        <thead>
          ${Browsers(data)}
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </figure> `
  );
}

function Browsers(data) {
  const cells = Object.entries(data.browsers).map(([browser]) =>
    browser != "ie" ? html`<td>${browser}</td>` : null,
  );

  return html`<tr>
    <td></td>
    ${cells}
  </tr>`;
}

function Row([key, row]) {
  if (key == "__compat") {
    return null;
  }

  const cells = Object.entries(row?.__compat?.support ?? {}).map(Cell);

  return html`<tr>
    <td><code>${key}</code></td>
    ${cells}
  </tr>`;
}

function Cell([browser, cell]) {
  if (browser == "ie") {
    return null;
  }
  let support = getCurrentSupport(cell);
  return html`<td>
    <button>${support.support}</button>
    <div class="more">${JSON.stringify(support)}</div>
  </td>`;
}

customElements.define("bcd-table", BCDTable);
