import { browser, expect } from "@wdio/globals";

// Lit's per-process template marker, e.g. leaked by `ref()` on custom elements.
const LIT_MARKER = /\slit\$\d+\$/;

describe("SSR", () => {
  for (const path of ["en-US/docs/MDN/Kitchensink", "en-US/play"]) {
    it(`should not leak Lit markers into ${path}`, async () => {
      const res = await fetch(new URL(path, browser.options.baseUrl));
      expect(res.ok).toBe(true);
      expect(await res.text()).not.toMatch(LIT_MARKER);
    });
  }
});
