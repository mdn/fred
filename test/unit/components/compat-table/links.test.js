import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  getFeatureLinkTargets,
  getIssueUrl,
} from "../../../../components/compat-table/links.js";

/** @param {string} source_file */
const compat = (source_file = "") => ({
  ...(source_file && { source_file }),
  support: { chrome: { version_added: "1" } },
});

describe("compatibility data links", () => {
  it("preserves full nested queries and each feature's source file", () => {
    const data = {
      __compat: compat("html/elements/meta.json"),
      name: {
        __compat: compat("html/elements/meta.json"),
        viewport: {
          __compat: compat("html/elements/meta/name/viewport.json"),
          width: {
            __compat: compat("html/elements/meta/name/viewport/width.json"),
          },
        },
      },
    };
    assert.deepEqual(
      getFeatureLinkTargets(
        /** @type {import("@bcd").Identifier} */ (
          /** @type {unknown} */ (data)
        ),
        "html.elements.meta",
      ),
      [
        { query: "html.elements.meta", sourceFile: "html/elements/meta.json" },
        {
          query: "html.elements.meta.name",
          sourceFile: "html/elements/meta.json",
        },
        {
          query: "html.elements.meta.name.viewport",
          sourceFile: "html/elements/meta/name/viewport.json",
        },
        {
          query: "html.elements.meta.name.viewport.width",
          sourceFile: "html/elements/meta/name/viewport/width.json",
        },
      ],
    );
  });

  it("handles containers without compatibility data and missing source files", () => {
    assert.deepEqual(
      getFeatureLinkTargets(
        /** @type {import("@bcd").Identifier} */ (
          /** @type {unknown} */ ({
            child: { __compat: compat() },
          })
        ),
        "api",
      ),
      [{ query: "api.child", sourceFile: undefined }],
    );
    assert.deepEqual(getFeatureLinkTargets({}, "api"), []);
  });

  it("omits nested rows hidden by the large-table depth limit", () => {
    const data = /** @type {import("@bcd").Identifier} */ (
      /** @type {unknown} */ ({
        __compat: compat("root.json"),
        child: {
          __compat: compat("child.json"),
          ...Object.fromEntries(
            Array.from({ length: 101 }, (_, i) => [
              `nested${i}`,
              { __compat: compat(`nested${i}.json`) },
            ]),
          ),
        },
      })
    );
    assert.deepEqual(getFeatureLinkTargets(data, "api.Example"), [
      { query: "api.Example", sourceFile: "root.json" },
      { query: "api.Example.child", sourceFile: "child.json" },
    ]);
  });

  it("applies status filters and the 100-row limit to the selector", () => {
    const stable = {
      standard_track: true,
      deprecated: false,
      experimental: false,
    };
    const data = /** @type {import("@bcd").Identifier} */ (
      /** @type {unknown} */ ({
        __compat: { ...compat("root.json"), status: stable },
        nonstandard: {
          __compat: {
            ...compat("nonstandard.json"),
            status: { ...stable, standard_track: false },
          },
        },
        deprecated: {
          __compat: {
            ...compat("deprecated.json"),
            status: { ...stable, deprecated: true },
          },
        },
        experimental: {
          __compat: {
            ...compat("experimental.json"),
            status: { ...stable, experimental: true },
          },
        },
        ...Object.fromEntries(
          Array.from({ length: 105 }, (_, i) => [
            `child${i}`,
            { __compat: { ...compat(`child${i}.json`), status: stable } },
          ]),
        ),
      })
    );
    const targets = getFeatureLinkTargets(data, "api.Example");
    assert.equal(targets.length, 100);
    assert.deepEqual(
      targets.map(({ query }) => query),
      [
        "api.Example",
        ...Array.from({ length: 99 }, (_, i) => `api.Example.child${i}`),
      ],
    );
  });

  it("reports the selected feature in the title and metadata, preserving the page URL", () => {
    const query = "html.elements.meta.name.viewport.width";
    const pathname =
      "/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport";
    const url = new URL(getIssueUrl(query, pathname));
    assert.equal(
      url.origin + url.pathname,
      "https://github.com/mdn/browser-compat-data/issues/new",
    );
    assert.equal(
      url.searchParams.get("title"),
      `${query} - <SUMMARIZE THE PROBLEM>`,
    );
    assert.ok(
      url.searchParams.get("metadata")?.includes(`Query: \`${query}\``),
    );
    assert.equal(
      url.searchParams.get("mdn-url"),
      `https://developer.mozilla.org${pathname}`,
    );
    assert.equal(url.searchParams.get("template"), "data-problem.yml");
  });
});
