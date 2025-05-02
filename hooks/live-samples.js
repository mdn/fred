for (const iframe of document.querySelectorAll("iframe[data-live-id]")) {
  if (iframe instanceof HTMLIFrameElement) {
    const { liveId, livePath } = iframe.dataset;
    if (liveId) {
      /** @type {import("../components/playground/types.js").EditorContent} */
      const playCode = {
        css: "",
        html: "",
        js: "",
      };

      for (const pre of document.querySelectorAll(
        `.live-sample___${liveId}, .live-sample---${liveId}`,
      )) {
        const { upgradePre } = await import(
          "../components/code-example/element.js"
        );
        const { language, code = "" } = upgradePre(pre) || {};
        if (language === "css" || language === "html" || language === "js") {
          playCode[language] += code;
        }
      }

      await import("../components/live-sample-result/element.js");
      const result = document.createElement("mdn-live-sample-result");
      result.code = playCode;
      result.srcPrefix = livePath;
      result.allow = iframe.allow || undefined;
      result.sandbox = iframe.sandbox.toString();
      result.height = iframe.height;
      iframe.closest(".code-example")?.replaceWith(result);
    }
  }
}
