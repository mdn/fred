import { $, browser, expect } from "@wdio/globals";

import { decompressFromBase64 } from "../../vendor/yari/libs/play/index.js";
import DocPage from "../pageobjects/doc.page.js";

describe("Interactive example color scheme", () => {
  it("uses the requested mode and follows page theme changes when opted in", async () => {
    await DocPage.open("en-US/docs/MDN/Kitchensink");
    await browser.execute(() => {
      document.documentElement.dataset.theme = "light";
      /** @type {[string, "light-dark" | "light" | "dark" | undefined][]} */
      const examples = [
        ["default", undefined],
        ["light-dark", "light-dark"],
        ["light", "light"],
        ["dark", "dark"],
      ];
      for (const [id, colorScheme] of examples) {
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
    });

    /** @param {string} id */
    const runnerTheme = async (id) => {
      const src = await browser.execute((testId) => {
        const example = [
          ...document.querySelectorAll("interactive-example"),
        ].find(
          (candidate) =>
            candidate instanceof HTMLElement &&
            candidate.dataset.testId === testId,
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
    };

    const exampleIds = ["default", "light-dark", "light", "dark"];
    await browser.waitUntil(async () => {
      try {
        await Promise.all(exampleIds.map(runnerTheme));
        return true;
      } catch {
        return false;
      }
    });

    /** @param {string} id */
    const renderedTheme = async (id) => {
      const example = await $(`interactive-example[data-test-id="${id}"]`);
      const runner = await example.shadow$("mdn-play-runner");
      const iframe = await runner.shadow$("iframe");
      await browser.switchFrame(iframe);
      try {
        await browser.waitUntil(() =>
          browser.execute(() => Boolean(document.body)),
        );
        return await browser.execute(() => ({
          background: getComputedStyle(document.body).backgroundColor,
          color: getComputedStyle(document.body).color,
          colorScheme: getComputedStyle(document.body).colorScheme,
        }));
      } finally {
        await browser.switchFrame(null);
      }
    };

    await expect(await runnerTheme("default")).toBe("light");
    await expect(await runnerTheme("light-dark")).toBe("light");
    await expect(await runnerTheme("light")).toBe("light");
    await expect(await runnerTheme("dark")).toBe("dark");
    await expect(await renderedTheme("default")).toEqual({
      background: "rgb(255, 255, 255)",
      color: "rgb(21, 20, 26)",
      colorScheme: "light",
    });
    await expect(await renderedTheme("dark")).toEqual({
      background: "rgb(27, 27, 27)",
      color: "rgb(255, 255, 255)",
      colorScheme: "dark",
    });

    await browser.execute(() => {
      document.documentElement.dataset.theme = "dark";
      globalThis.dispatchEvent(
        new CustomEvent("mdn-color-theme-update", { detail: "dark" }),
      );
    });

    await browser.waitUntil(
      async () => (await runnerTheme("light-dark")) === "dark",
    );
    await expect(await runnerTheme("default")).toBe("light");
    await expect(await runnerTheme("light-dark")).toBe("dark");
    await expect(await runnerTheme("light")).toBe("light");
    await expect(await runnerTheme("dark")).toBe("dark");
    await expect(await renderedTheme("light-dark")).toEqual({
      background: "rgb(27, 27, 27)",
      color: "rgb(255, 255, 255)",
      colorScheme: "dark",
    });
  });
});
