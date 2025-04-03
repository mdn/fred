/**
 * Runs on either client or server,
 * and returns the client or server context respectively
 * @returns {import("./types").SymmetricContext}
 */
export function getSymmetricContext() {
  const serverStore = globalThis.__MDNServerContext?.getStore();
  const clientStore = globalThis.__MDNClientContext;
  return serverStore || clientStore;
}
