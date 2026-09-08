import { browser, expect } from "@wdio/globals";

import BaselineIndicatorPage from "../pageobjects/baseline-indicator.page.js";

describe("Baseline indicator", () => {
  beforeEach(async () => {
    await BaselineIndicatorPage.open();
    await BaselineIndicatorPage.clearStoredState();
    await browser.refresh();
  });

  it("renders the semantic summary for every status", async () => {
    const cases = [
      {
        id: "high",
        title: "Baseline",
        pill: "WIDELY AVAILABLE",
        label: "Baseline Check",
        open: false,
      },
      {
        id: "low",
        title: "Baseline 2023",
        pill: "NEWLY AVAILABLE",
        label: "Baseline Check",
        open: false,
      },
      {
        id: "limited",
        title: "Limited availability",
        label: "Baseline Cross",
        open: false,
      },
      {
        id: "discouraged",
        title: "Deprecated",
        label: "Baseline Discouraged",
        open: true,
      },
      {
        id: "removing",
        title: "Deprecated",
        pill: "TO BE REMOVED",
        label: "Baseline Discouraged Cross",
        open: true,
      },
    ];

    for (const testCase of cases) {
      const indicator = BaselineIndicatorPage.indicator(testCase.id);
      await expect(indicator.element).toBeExisting();
      await expect(indicator.title).toHaveText(testCase.title);
      await expect(indicator.statusIcon).toHaveAttribute(
        "aria-label",
        testCase.label,
      );
      await expect(await indicator.isOpen()).toEqual(testCase.open);
      await expect(await indicator.pill.isExisting()).toEqual(
        Boolean(testCase.pill),
      );
      if (testCase.pill) {
        await expect(indicator.pill).toHaveText(testCase.pill);
      }
    }
  });

  it("renders the appropriate explanation for each availability status", async () => {
    const cases = [
      {
        id: "high",
        text: "available across browsers since May 2023",
      },
      {
        id: "low",
        text: "Since May 2023, this feature works across the latest devices",
      },
      {
        id: "limited",
        text: "This feature is not Baseline because it does not work",
      },
    ];

    for (const testCase of cases) {
      const indicator = BaselineIndicatorPage.indicator(testCase.id);
      await indicator.open();
      await expect(indicator.extra).toHaveText(
        expect.stringContaining(testCase.text),
      );
    }
  });

  it("exposes browser support through accessible names and engine titles", async () => {
    const high = BaselineIndicatorPage.indicator("high");
    const browserNames = /** @type {const} */ ([
      "chrome",
      "edge",
      "firefox",
      "safari",
    ]);
    for (const browserName of browserNames) {
      const label = `${browserName.charAt(0).toUpperCase()}${browserName.slice(1)} check`;
      await expect(high.browser(browserName)).toHaveAttribute(
        "aria-label",
        label,
      );
    }

    const limited = BaselineIndicatorPage.indicator("limited");
    await expect(limited.browser("chrome")).toHaveAttribute(
      "aria-label",
      "Chrome check",
    );
    await expect(limited.browser("edge")).toHaveAttribute(
      "aria-label",
      "Edge check",
    );
    await expect(limited.browser("firefox")).toHaveAttribute(
      "aria-label",
      "Firefox check",
    );
    await expect(limited.browser("safari")).toHaveAttribute(
      "aria-label",
      "Safari cross",
    );
    await expect(limited.engine(0)).toHaveAttribute(
      "title",
      "Supported in Chrome and Edge",
    );
    await expect(limited.engine(1)).toHaveAttribute(
      "title",
      "Supported in Firefox",
    );
    await expect(limited.engine(2)).toHaveAttribute(
      "title",
      "Not widely supported in Safari",
    );

    const webkitOnly = BaselineIndicatorPage.indicator("limited-asterisk");
    await expect(webkitOnly.browser("chrome")).toHaveAttribute(
      "aria-label",
      "Chrome cross",
    );
    await expect(webkitOnly.browser("edge")).toHaveAttribute(
      "aria-label",
      "Edge cross",
    );
    await expect(webkitOnly.browser("firefox")).toHaveAttribute(
      "aria-label",
      "Firefox cross",
    );
    await expect(webkitOnly.browser("safari")).toHaveAttribute(
      "aria-label",
      "Safari check",
    );
  });

  it("renders the asterisk annotation only when applicable", async () => {
    for (const id of ["high-asterisk", "low-asterisk", "limited-asterisk"]) {
      const indicator = BaselineIndicatorPage.indicator(id);
      await indicator.open();
      await expect(indicator.asterisk).toHaveText("*");
      await expect(indicator.asteriskNote).toHaveText(
        expect.stringContaining(
          "Some parts of this feature may have varying levels of support.",
        ),
      );
    }

    for (const id of ["high", "low", "limited", "discouraged-asterisk"]) {
      const indicator = BaselineIndicatorPage.indicator(id);
      await expect(indicator.asterisk).not.toBeExisting();
      await expect(indicator.asteriskNote).not.toBeExisting();
    }
  });

  it("renders the developer signals link metadata", async () => {
    const indicator = BaselineIndicatorPage.indicator(
      "limited-developer-signals",
    );
    await expect(await indicator.isOpen()).toEqual(true);
    await expect(indicator.element).toHaveAttribute("data-open-by-default");
    await expect(indicator.signalsLink).toHaveAttribute(
      "href",
      "https://example.com/signals",
    );
    await expect(indicator.signalsLink).toHaveAttribute("target", "_blank");
    await expect(indicator.signalsLink).toHaveAttribute("rel", "noopener");
    await expect(indicator.signalsLink).toHaveElementClass("external");
    await expect(indicator.signalsLink).toHaveAttribute(
      "data-glean-id",
      "baseline_link_signals",
    );
  });

  it("renders discouraged guidance and upstream reason markup", async () => {
    const indicator = BaselineIndicatorPage.indicator("discouraged");
    await expect(indicator.extra).toHaveText(
      expect.stringContaining("Avoid using this feature in new projects."),
    );
    await expect(indicator.extra).toHaveText(
      expect.stringContaining("This feature may be a candidate for removal"),
    );
    await expect(indicator.reason).toHaveAttribute("lang", "en-US");
    await expect(indicator.reasonCode).toHaveText("<code>");
  });

  it("renders removing guidance without candidate-removal copy", async () => {
    const indicator = BaselineIndicatorPage.indicator("removing");
    await expect(indicator.extra).toHaveText(
      expect.stringContaining("This feature is pending removal from browsers."),
    );
    const text = await indicator.extra.getText();
    await expect(text).not.toContain(
      "This feature may be a candidate for removal",
    );
  });

  it("renders one or several alternatives with their metadata", async () => {
    const one = BaselineIndicatorPage.indicator("discouraged-one-alternative");
    await expect(one.alternativeLinks).toBeElementsArrayOfSize(1);
    await expect(one.extra).toHaveText(
      expect.stringContaining("Consider using the following features instead"),
    );
    await expect(one.alternativeLink("flexbox")).toHaveText("flexbox");
    await expect(one.alternativeLink("flexbox")).toHaveAttribute(
      "href",
      expect.stringContaining("/en-US/docs/Web/CSS/CSS_flexible_box_layout"),
    );
    await expect(one.alternativeLink("flexbox")).toHaveAttribute(
      "title",
      "CSS flexible box layout",
    );

    const several = BaselineIndicatorPage.indicator(
      "discouraged-several-alternatives",
    );
    await expect(several.alternativeLinks).toBeElementsArrayOfSize(2);
    await expect(several.extra).toHaveText(
      expect.stringContaining("flexbox or grid"),
    );
    await expect(several.alternativeLink("grid")).toHaveAttribute(
      "data-glean-id",
      "baseline_link_alternatives: grid",
    );

    const removing = BaselineIndicatorPage.indicator(
      "removing-several-alternatives",
    );
    await expect(removing.extra).toHaveText(
      expect.stringContaining("Use the following features instead"),
    );
  });

  it("localizes generated links and the alternatives list", async () => {
    await BaselineIndicatorPage.open("fr");
    const indicator = BaselineIndicatorPage.indicator(
      "discouraged-several-alternatives",
    );

    await expect(indicator.extra).toHaveText(
      expect.stringContaining("flexbox ou grid"),
    );
    await expect(indicator.alternativeLink("flexbox")).toHaveAttribute(
      "href",
      expect.stringContaining("/fr/docs/Web/CSS/CSS_flexible_box_layout"),
    );
    await expect(indicator.compatibilityLink).toHaveAttribute(
      "href",
      expect.stringContaining("#compatibilité_des_navigateurs"),
    );
    await expect(indicator.learnMoreLink).toHaveAttribute(
      "href",
      expect.stringContaining("/fr/docs/Glossary/Baseline/Compatibility"),
    );
  });

  it("renders the common navigation links with telemetry metadata", async () => {
    const indicator = BaselineIndicatorPage.indicator("high");
    await expect(indicator.compatibilityLink).toHaveAttribute(
      "href",
      expect.stringContaining("#browser_compatibility"),
    );
    await expect(indicator.compatibilityLink).toHaveAttribute(
      "data-glean-id",
      "baseline_link_bcd_table",
    );
    await expect(indicator.learnMoreLink).toHaveAttribute(
      "href",
      expect.stringContaining("/en-US/docs/Glossary/Baseline/Compatibility"),
    );
    await expect(indicator.learnMoreLink).toHaveAttribute("target", "_blank");
    await expect(indicator.learnMoreLink).toHaveAttribute(
      "data-glean-id",
      "baseline_link_learn_more",
    );
  });

  it("handles mocked discouraged banner", async () => {
    const discouraged = BaselineIndicatorPage.indicator(
      "discouraged-no-compatibility-data",
    );
    await expect(discouraged.element).toBeExisting();
    await expect(discouraged.title).toHaveText("Deprecated");
    await expect(discouraged.browsers).not.toBeExisting();
  });

  it("persists user-controlled open state across reloads", async () => {
    const indicator = BaselineIndicatorPage.indicator("high");
    await expect(await indicator.isOpen()).toEqual(false);

    await indicator.open();
    await browser.waitUntil(
      async () => (await BaselineIndicatorPage.getStoredState()) === "open",
      { timeoutMsg: "Opening the indicator did not persist its state" },
    );
    await browser.refresh();
    await expect(await indicator.isOpen()).toEqual(true);

    await indicator.close();
    await browser.waitUntil(
      async () => (await BaselineIndicatorPage.getStoredState()) === null,
      { timeoutMsg: "Closing the indicator did not clear its stored state" },
    );
    await browser.refresh();
    await expect(await indicator.isOpen()).toEqual(false);
  });
});
