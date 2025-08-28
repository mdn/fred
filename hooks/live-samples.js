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

      for (const element of document.querySelectorAll(
        `.live-sample___${liveId}, .live-sample---${liveId}`,
      )) {
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
