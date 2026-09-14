import { describe, it } from "node:test";

import { RuleTester } from "eslint";

import fred from "../../../build/eslint-fred.js";

RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: "latest", sourceType: "module" },
});

const rule = fred.rules?.["no-external-link-whitespace"];
if (!rule) {
  throw new Error("Rule `no-external-link-whitespace` is not registered");
}

const message =
  "External links must not start or end with whitespace, otherwise the icon wraps onto its own line.";

ruleTester.run("no-external-link-whitespace", rule, {
  valid: [
    {
      name: "static class without whitespace",
      code: 'html`<a class="external" href="https://example.com">Link</a>`;',
    },
    {
      name: "expression body without whitespace",
      code: 'html`<a class="external" href=${href}>${text}</a>`;',
    },
    {
      name: "prettier-style formatting without inner whitespace",
      code: `html\`<a
        class="external"
        href=\${href}
        >\${text}</a
      >\`;`,
    },
    {
      name: "non-external anchor with whitespace",
      code: 'html`<a href="/foo"> Link </a>`;',
    },
    {
      name: "class that merely contains the substring",
      code: 'html`<a class="externalize"> Link </a>`;',
    },
    {
      name: "class expression that does not mention external",
      code: "html`<a class=${className} href=${href}> Link </a>`;",
    },
    {
      name: "non-html template tag",
      code: 'css`<a class="external"> Link </a>`;',
    },
    {
      name: "nested content without whitespace",
      code: 'html`<a class="external"><span>Link</span><i></i></a>`;',
    },
  ],
  invalid: [
    {
      name: "trailing newline (static class)",
      code: 'html`<a class="external" href="https://example.com">Link\n</a>`;',
      output: 'html`<a class="external" href="https://example.com">Link</a>`;',
      errors: [{ message }],
    },
    {
      name: "leading space",
      code: 'html`<a class="external"> Link</a>`;',
      output: 'html`<a class="external">Link</a>`;',
      errors: [{ message }],
    },
    {
      name: "leading and trailing whitespace around an expression",
      code: 'html`<a class="external" href=${href}>\n  ${text}\n</a>`;',
      output: 'html`<a class="external" href=${href}>${text}</a>`;',
      errors: [{ message }],
    },
    {
      name: "conditional class expression",
      code: 'html`<a class=${link.external ? "external" : ""}>\n  ${link.text}\n</a>`;',
      output:
        'html`<a class=${link.external ? "external" : ""}>${link.text}</a>`;',
      errors: [{ message }],
    },
    {
      name: "class with literal and expression",
      code: 'html`<a class="external ${className}"> ${content} </a>`;',
      output: 'html`<a class="external ${className}">${content}</a>`;',
      errors: [{ message }],
    },
    {
      name: "multiple classes",
      code: 'html`<a class="bc-github-link external external-icon">\n  ${text}\n</a>`;',
      output:
        'html`<a class="bc-github-link external external-icon">${text}</a>`;',
      errors: [{ message }],
    },
    {
      name: "whitespace-only body",
      code: 'html`<a class="external"> </a>`;',
      output: 'html`<a class="external"></a>`;',
      errors: [{ message }],
    },
    {
      name: "nested elements",
      code: 'html`<a class="external">\n  <div class="x"></div>\n  <span>${text}</span>\n</a>`;',
      output:
        'html`<a class="external"><div class="x"></div>\n  <span>${text}</span></a>`;',
      errors: [{ message }],
    },
    {
      name: "closing tag split across lines",
      code: 'html`<a class="external">Link </a\n>`;',
      output: 'html`<a class="external">Link</a\n>`;',
      errors: [{ message }],
    },
    {
      name: "two anchors in one template",
      code: 'html`<a class="external">A </a><a class="external"> B</a>`;',
      output: 'html`<a class="external">A</a><a class="external">B</a>`;',
      errors: [{ message }, { message }],
    },
    {
      name: "attribute value containing a closing angle bracket",
      code: 'html`<a class="external" data-glean-id=${`footer: link -> ${href}`}>\n  ${text}\n</a>`;',
      output:
        'html`<a class="external" data-glean-id=${`footer: link -> ${href}`}>${text}</a>`;',
      errors: [{ message }],
    },
  ],
});
