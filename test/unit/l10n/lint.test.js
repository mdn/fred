import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { lintMarkup, lintResource } from "../../../l10n/parser/lint.js";

const REFERENCE = `
plain = Hello
link = Hello <a data-l10n-name="link">world</a>!
select = { $count ->
    [one] <code data-l10n-name="one">{ $count }</code> item
   *[other] <code data-l10n-name="other">{ $count }</code> items
  }
attr = Hello
  .title = Hello <a data-l10n-name="link">world</a>!
`;

/** @type {{ name: string, source: string, errors: string[] }[]} */
const CASES = [
  {
    name: "plain text",
    source: "plain = Hallo { $name } &lt;3 -> &amp;",
    errors: [],
  },
  {
    name: "allowed tags",
    source: "plain = <i>a</i> <strong>b</strong><br> <em>c</em><br/>",
    errors: [],
  },
  {
    name: "named element with allowed attributes",
    source:
      'link = Hallo <a data-l10n-name="link" title="Titel" aria-label="Label">{ $name }</a>!',
    errors: [],
  },
  {
    name: "named elements in other variants",
    source: `select = { $count ->
   *[other] { " " }<code data-l10n-name="one">{ $count }</code> <code data-l10n-name="other">x</code>
  }`,
    errors: [],
  },
  {
    name: "named element in attribute",
    source: `attr = Hallo
  .title = Hallo <a data-l10n-name="link">Welt</a>!`,
    errors: [],
  },
  {
    name: "message that does not exist in reference",
    source: "unknown = <em>a</em>",
    errors: [],
  },
  {
    name: "tag that is not allowed",
    source: "plain = <script>alert(1)</script>",
    errors: [
      "1: `plain`: tag `<script>` is not allowed without `data-l10n-name` (allowed: `<i>`, `<strong>`, `<br>`, `<em>`)",
    ],
  },
  {
    name: "attribute on tag without name",
    source: 'plain = <em title="a">a</em>',
    errors: [
      "1: `plain`: attribute `title` is not allowed on `<em>` without `data-l10n-name`",
    ],
  },
  {
    name: "attribute that is not allowed",
    source:
      '# Comment\nlink = <a data-l10n-name="link" href="https://example.com/">a</a>',
    errors: [
      "2: `link`: attribute `href` is not allowed on `<a>` (allowed: `title`, `aria-label`)",
    ],
  },
  {
    name: "name that does not exist in reference message",
    source: 'plain = <a data-l10n-name="link">a</a>',
    errors: [
      '1: `plain`: `data-l10n-name="link"` does not exist in the en-US message',
    ],
  },
  {
    name: "name that only exists in attribute of reference message",
    source: 'attr = <a data-l10n-name="link">a</a>',
    errors: [
      '1: `attr`: `data-l10n-name="link"` does not exist in the en-US message',
    ],
  },
  {
    name: "name in message that does not exist in reference",
    source: 'unknown = <a data-l10n-name="link">a</a>',
    errors: [],
  },
  {
    name: "name with different tag",
    source: 'link = <code data-l10n-name="link">a</code>',
    errors: [
      '1: `link`: `data-l10n-name="link"` is a `<a>` in the en-US message, not a `<code>`',
    ],
  },
  {
    name: "malformed tags",
    source: `plain = <a href='x'>a</a> <em >b</em> 1 < 2 <!-- c -->`,
    errors: [
      "1: `plain`: `<` that is not part of a well-formed tag (use `&lt;` for a literal `<`, and double-quoted attribute values without placeables)",
      "1: `plain`: unexpected closing tag `</a>`",
      "1: `plain`: `<` that is not part of a well-formed tag (use `&lt;` for a literal `<`, and double-quoted attribute values without placeables)",
      "1: `plain`: `<` that is not part of a well-formed tag (use `&lt;` for a literal `<`, and double-quoted attribute values without placeables)",
    ],
  },
  {
    name: "placeable in tag",
    source: 'link = <a data-l10n-name="link" title="{ $title }">a</a>',
    errors: ["1: `link`: placeable in an attribute of `<a>`"],
  },
  {
    name: "unbalanced tags",
    source: "plain = </i><em>a <strong>b</em>",
    errors: [
      "1: `plain`: unexpected closing tag `</i>`",
      "1: `plain`: unexpected closing tag `</em>`",
      "1: `plain`: unclosed tag `<em>`",
      "1: `plain`: unclosed tag `<strong>`",
    ],
  },
  {
    name: "self-closing tag that is not void",
    source: "plain = <em/>a",
    errors: ["1: `plain`: unclosed tag `<em>`"],
  },
  {
    name: "tag that is not allowed in variant",
    source: `select = { $count ->
   *[other] <u>{ $count }</u>
  }`,
    errors: [
      "2: `select`: tag `<u>` is not allowed without `data-l10n-name` (allowed: `<i>`, `<strong>`, `<br>`, `<em>`)",
    ],
  },
  {
    name: "errors on different lines of a message",
    source: `# Comment
plain =
    <em>a
    { $name } </i> 1 < 2
attr = Hallo
  .title = </i>`,
    errors: [
      "4: `plain`: unexpected closing tag `</i>`",
      "4: `plain`: `<` that is not part of a well-formed tag (use `&lt;` for a literal `<`, and double-quoted attribute values without placeables)",
      "3: `plain`: unclosed tag `<em>`",
      "6: `attr.title`: unexpected closing tag `</i>`",
    ],
  },
  {
    name: "term",
    source: "-brand = <u>MDN</u>",
    errors: [
      "1: `-brand`: tag `<u>` is not allowed without `data-l10n-name` (allowed: `<i>`, `<strong>`, `<br>`, `<em>`)",
    ],
  },
];

describe("l10n lint", () => {
  describe("lintResource", () => {
    for (const { name, source, errors } of CASES) {
      it(name, () => {
        assert.deepEqual(lintResource(source, REFERENCE), errors);
      });
    }

    it("allows any name without reference", () => {
      assert.deepEqual(
        lintResource('plain = <a data-l10n-name="link">a</a>'),
        [],
      );
    });
  });

  describe("lintMarkup", () => {
    it("finds no errors in our l10n strings", async () => {
      assert.deepEqual(await lintMarkup(), []);
    });
  });
});
