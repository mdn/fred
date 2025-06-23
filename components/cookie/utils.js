/** @param {string} name */
export function getCookieValue(name) {
  let value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  if (value && value.includes("=")) {
    value = value.split("=")[1];
  }

  return value;
}

/**
 * @param {string} name
 * @param {string} value
 * @param {object} options
 * @param {Date} [options.expires]
 * @param {number} [options.maxAge]
 * @param {string} [options.path]
 */
export function setCookieValue(name, value, { expires, maxAge, path = "/" }) {
  const cookieValue = [
    `${name}=${value}`,
    expires && `expires=${expires.toUTCString()}`,
    maxAge && `max-age=${maxAge}`,
    `path=${path}`,
    document.location.hostname !== "localhost" && "secure",
  ]
    .filter(Boolean)
    .join(";");

  // eslint-disable-next-line unicorn/no-document-cookie
  document.cookie = cookieValue;
}

/** @param {string} name */
export function deleteCookie(name) {
  setCookieValue(name, "", { expires: new Date(0) });
}
