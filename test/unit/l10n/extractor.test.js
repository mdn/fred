import assert from "node:assert/strict";

import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import {
  Comment,
  Identifier,
  Message,
  Pattern,
  TextElement,
} from "@fluent/syntax";

import {
  getManualEntries,
  scrapeL10nTags,
} from "../../../l10n/parser/extractor.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("l10n extractor", () => {
  describe("scrapeL10nTags", () => {
    it("finds l10n template tags, but not raw calls, or other template tags", () => {
      const tags = scrapeL10nTags(path.join(__dirname, "fixtures", "tags.js"));
      assert.deepEqual(
        [...tags],
        [
          ["this-l10n", "This L10n"],
          ["context-l10n", "Context L10n"],
        ],
      );
    });

    it("throws if l10n template tag has substitutions", () => {
      assert.throws(
        () =>
          scrapeL10nTags(
            path.join(__dirname, "fixtures", "tags-with-substitutions.js"),
          ),
        {
          name: "Error",
          message:
            'L10n extractor: `this.l10n("id")`This ${foo} substitutions`` has substitutions, which we don\'t support',
        },
      );
    });
  });

  describe("getManualEntries", () => {
    it("returns fluent messages", async () => {
      const entries = await getManualEntries(
        path.join(__dirname, "fixtures", "simple.ftl"),
      );
      const expected = [
        new Message(
          new Identifier("id1"),
          new Pattern([new TextElement("Hello world!")]),
        ),
        new Message(
          new Identifier("id2"),
          new Pattern([new TextElement("Hello dlrow!")]),
        ),
      ];
      assert.partialDeepStrictEqual(entries, expected);
      assert.strictEqual(entries.length, expected.length);
    });

    it("skips WARNING and TODO comments", async () => {
      const entries = await getManualEntries(
        path.join(__dirname, "fixtures", "comments.ftl"),
      );
      const expected = [new Comment("This is a normal comment")];
      assert.partialDeepStrictEqual(entries, expected);
      assert.strictEqual(entries.length, expected.length);
    });
  });
});
