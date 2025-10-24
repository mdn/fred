/**
 * Simple FNV-1a hash implementation for generating deterministic IDs.
 * @param {string} str - String to hash
 * @returns {string} - Hexadecimal hash string
 */
function hashString(str) {
  let hash = 2_166_136_261; // FNV offset basis
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line unicorn/prefer-code-point -- charCodeAt is sufficient for hash
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16_777_619); // FNV prime
  }
  // Convert to unsigned 32-bit and then to hex
  return (hash >>> 0).toString(36);
}

/**
 * Used to generate a deterministic element id by hashing the provided content.
 * Falls back to random generation if no content is provided (for backwards compatibility).
 *
 * @param {string | number | undefined} content - Content to hash for ID generation
 * @param {string} prefix - Prefix for the ID
 * @returns {string}
 */
export function deterministicIdString(content, prefix = "id-") {
  if (content === undefined || content === null || content === "") {
    // Fallback to random for backwards compatibility when no content provided
    return Math.random().toString(36).replace("0.", prefix);
  }
  return `${prefix}${hashString(String(content))}`;
}

/**
 * @deprecated Use deterministicIdString instead
 * Used to generate a random element id by combining a prefix with a random string.
 *
 * @param {string} prefix
 * @returns {string}
 */
export function randomIdString(prefix = "id-") {
  return Math.random().toString(36).replace("0.", prefix);
}
