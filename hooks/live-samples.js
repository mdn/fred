/* eslint-disable unicorn/prefer-query-selector */
/**
 * @import { MDNCodeExample } from "../components/code-example/element.js";
 */

for (const iframe of document.querySelectorAll("iframe[data-live-id]")) {
  if (iframe instanceof HTMLIFrameElement) {
    const { liveId, livePath } = iframe.dataset;
    if (liveId) {
      /** @type {Record<string, string>} */
      const liveSampleCode = {};
      /** @type {MDNCodeExample[]} */
      const codeExamples = [];

      for (const element of [
        // use getElementsByClassName as liveId can contain dots,
        // which breaks querySelectorAll
        ...document.getElementsByClassName(`live-sample___${liveId}`),
        ...document.getElementsByClassName(`live-sample---${liveId}`),
      ]) {
        const { MDNCodeExample, upgradePre } = await import(
          "../components/code-example/element.js"
        );
        const codeExample =
          element instanceof MDNCodeExample ? element : upgradePre(element);
        if (codeExample) {
          codeExamples.push(codeExample);
          const { language, code } = codeExample;
          liveSampleCode[language]
            ? (liveSampleCode[language] += code)
            : (liveSampleCode[language] = code);
        }
      }

      await import("../components/live-sample-result/element.js");
      const result = document.createElement("mdn-live-sample-result");
      result.liveId = liveId;
      result.code = liveSampleCode;
      result.srcPrefix = livePath;
      result.allow = iframe.allow || undefined;
      result.sandbox = iframe.sandbox.toString();
      result.height = iframe.height;
      iframe.closest(".code-example")?.replaceWith(result);

      for (const codeExample of codeExamples) {
        codeExample.liveSample ||= result;
      }
    }
  }
}
