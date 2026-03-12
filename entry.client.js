await import("./symmetric-context/client.js");
await import("@lit-labs/ssr-client/lit-element-hydrate-support.js");

// hooks:
await import("./hooks/glean-init.js");
await import("./hooks/ga-init.js");
await import("./hooks/dialog-closedby.js");
await import("./l10n/hook.js");
await import("./hooks/load-elements.js");
await import("./components/baseline-indicator/hook.js");
await import("./hooks/sidebar-scroll-to-current.js");
await import("./components/navigation/hook.js");
await import("./hooks/toc-highlight.js");
await import("./hooks/code-examples.js");
await import("./hooks/live-samples.js");
await import("./hooks/skip-to-search.js");
await import("./hooks/user-ping.js");
