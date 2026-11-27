import { $, browser, expect } from "@wdio/globals";

import { decompressFromBase64 } from "../../vendor/yari/libs/play/index.js";
import DocPage from "../pageobjects/doc.page.js";

/**
 * @typedef {"light" | "dark"} Theme
 * @typedef {{ id: string, colorScheme: "light-dark" | "light" | "dark" | undefined, expected: Record<Theme, Theme>, preferred: Record<Theme, Theme> }} Example
 */

/** @type {Example[]} */
const EXAMPLES = [
  {
    id: "default",
    colorScheme: undefined,
    expected: { light: "light", dark: "light" },
    preferred: { light: "light", dark: "dark" },
  },
  {
    id: "light-dark",
    colorScheme: "light-dark",
    expected: { light: "light", dark: "dark" },
    preferred: { light: "light", dark: "dark" },
  },
  {
    id: "light",
    colorScheme: "light",
    expected: { light: "light", dark: "light" },
    preferred: { light: "light", dark: "light" },
  },
  {
    id: "dark",
    colorScheme: "dark",
    expected: { light: "dark", dark: "dark" },
    preferred: { light: "dark", dark: "dark" },
  },
];

/** @type {Record<Theme, { background: string, color: string, colorScheme: string }>} */
const RENDERED = {
  light: {
    background: "rgb(255, 255, 255)",
    color: "rgb(21, 20, 26)",
    colorScheme: "light",
  },
  dark: {
    background: "rgb(27, 27, 27)",
    color: "rgb(255, 255, 255)",
    colorScheme: "dark",
  },
};

/** @type {WebdriverIO.BrowsingContext} */
let page;

/** @param {string} id */
async function runnerTheme(id) {
  const src = await browser.execute((testId) => {
    const example = [...document.querySelectorAll("interactive-example")].find(
      (candidate) =>
        candidate instanceof HTMLElement && candidate.dataset.testId === testId,
    );
    return example?.shadowRoot
      ?.querySelector("mdn-play-runner")
      ?.shadowRoot?.querySelector("iframe")?.src;
  }, id);
  if (!src) {
    throw new Error(`Missing runner source for ${id}`);
  }
  const state = new URL(src).searchParams.get("state");
  if (!state) {
    throw new Error(`Missing runner state for ${id}`);
  }
  const { state: serializedState } = await decompressFromBase64(state);
  if (!serializedState) {
    throw new Error(`Could not decode runner state for ${id}`);
  }
  return JSON.parse(serializedState).theme;
}

/**
 * @param {string} id
 * @param {Theme} theme
 */
async function renderedTheme(id, theme) {
  const example = await $(`interactive-example[data-test-id="${id}"]`);
  const runner = await example.shadow$("mdn-play-runner");
  const frame = await page.frame(await runner.shadow$("iframe"));
  await browser.waitUntil(() =>
    frame.execute(
      (expected) => getComputedStyle(document.body).colorScheme === expected,
      theme,
    ),
  );
  return await frame.execute(() => ({
    background: getComputedStyle(document.body).backgroundColor,
    color: getComputedStyle(document.body).color,
    colorScheme: getComputedStyle(document.body).colorScheme,
    preferred: globalThis.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  }));
}

/** @param {Theme} pageTheme */
async function expectThemes(pageTheme) {
  for (const { id, expected, preferred } of EXAMPLES) {
    const theme = expected[pageTheme];
    await expect({ id, theme: await runnerTheme(id) }).toEqual({ id, theme });
    await expect({ id, ...(await renderedTheme(id, theme)) }).toEqual({
      id,
      ...RENDERED[theme],
      preferred: preferred[pageTheme],
    });
  }
}

describe("Interactive example color scheme", () => {
  before(async () => {
    page = await DocPage.open("en-US/docs/MDN/Kitchensink");
    await browser.execute((examples) => {
      document.documentElement.dataset.theme = "light";
      for (const { id, colorScheme } of examples) {
        const section = document.createElement("section");
        /** @type {["html" | "css", string][]} */
        const codeBlocks = [
          ["html", "<div>Example</div>"],
          ["css", "div { color: rebeccapurple; }"],
        ];
        for (const [language, code] of codeBlocks) {
          const wrapper = document.createElement("div");
          wrapper.className = "code-example";
          const pre = document.createElement("pre");
          pre.className = [language, "interactive-example", colorScheme]
            .filter(Boolean)
            .join(" ");
          const codeElement = document.createElement("code");
          codeElement.textContent = code;
          pre.append(codeElement);
          wrapper.append(pre);
          section.append(wrapper);
        }
        const example = document.createElement("interactive-example");
        example.dataset.testId = id;
        example.setAttribute("name", id);
        section.append(example);
        document.body.append(section);
      }
    }, EXAMPLES);

    await browser.waitUntil(async () => {
      try {
        await Promise.all(EXAMPLES.map(({ id }) => runnerTheme(id)));
        return true;
      } catch {
        return false;
      }
    });
  });

  it("uses the requested color scheme", async () => {
    await expectThemes("light");
  });

  it("follows page theme changes only when marked light-dark", async () => {
    await browser.execute(() => {
      document.documentElement.dataset.theme = "dark";
      globalThis.dispatchEvent(
        new CustomEvent("mdn-color-theme-update", { detail: "dark" }),
      );
    });

    await browser.waitUntil(
      async () => (await runnerTheme("light-dark")) === "dark",
    );
    await expectThemes("dark");
  });
});
