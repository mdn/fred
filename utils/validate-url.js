/**
 * Uniform Resource Identifier (URI) Scheme.
 * List of valid URI Schemes, see {@link https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml}
 * @typedef {"https" | "http"} URIScheme
 */

/**
 * Validates URL
 * @param {string} url - The url
 * @param {URIScheme[]} [allowedProtocols] - Allowed URI schemes. Defaults to `["https"]`
 * @returns {boolean}
 */
export function isURLValid(url, allowedProtocols = ["https"]) {
  /** @type {URL} */
  let validUrl;
  /** @type {string} */
  let protocol;

  try {
    validUrl = new URL(url);
    protocol = validUrl.protocol.replace(":", "");
  } catch {
    return false;
  }

  if (protocol) {
    /** @type {URIScheme[]} */
    const allowed = Array.isArray(allowedProtocols) ? allowedProtocols : [];
    return allowed.includes(/** @type {URIScheme} */ (protocol));
  }

  return false;
}
