/**
 * @param {string} pathname
 */
export async function getEnglishDoc(pathname) {
  if (
    pathname &&
    pathname.includes("/docs/") &&
    !pathname.startsWith("/en-US/")
  ) {
    const enUSURL =
      "/en-US/" + pathname.split("/").slice(2).join("/") + "/index.json";

    const response = await fetch(enUSURL);
    if (response.ok) {
      /** @type {{ doc: import("@rari").Doc}} */
      const { doc } = await response.json();
      return doc;
    }
  }
  return;
}
