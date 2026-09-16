/**
 * The client-derived values of the symmetric context:
 * this will run within a user's web browser
 * @type {import("./types.js").SymmetricContext}
 */
globalThis.__MDNClientContext = {
  locale: globalThis.location.pathname.split("/", 2)[1] || "en-US",
};
