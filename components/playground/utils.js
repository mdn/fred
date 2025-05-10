// import { PLAYGROUND_BASE_HOST } from "../env";

// /**
//  * @import { EditorContent } from "./types.js";
//  */

// /**
//  * @param {EditorContent} code
//  * @returns {string}
//  */
// export function codeToMarkdown(code) {
//   const parts = [];
//   if (code.html) {
//     parts.push(["```html", code.html, "```"].join("\n"));
//   }
//   if (code.css) {
//     parts.push(["```css", code.css, "```"].join("\n"));
//   }
//   if (code.js) {
//     parts.push(["```js", code.js, "```"].join("\n"));
//   }
//   return parts.join("\n\n");
// }

// /**
//  * @param {HTMLIFrameElement | null} iframe
//  * @param {EditorContent | null} editorContent
//  * @param {boolean} fullscreen
//  */
// export async function initPlayIframe(
//   iframe,
//   editorContent,
//   fullscreen = false
// ) {
//   if (!iframe || !editorContent) {
//     return;
//   }
//   const { state, hash } = await compressAndBase64Encode(
//     JSON.stringify(editorContent)
//   );
//   const path = iframe.getAttribute("data-live-path");
//   const url = new URL(
//     `${path || ""}${path?.endsWith("/") ? "" : "/"}runner.html`,
//     window.location.origin
//   );
//   if (!window.location.hostname.endsWith("localhost")) {
//     const host = PLAYGROUND_BASE_HOST.startsWith("localhost")
//       ? PLAYGROUND_BASE_HOST
//       : `${hash}.${PLAYGROUND_BASE_HOST}`;
//     url.port = "";
//     url.host = host;
//   }
//   url.search = "";
//   url.searchParams.set("state", state);
//   iframe.src = url.href;
//   if (fullscreen) {
//     const urlWithoutHash = new URL(window.location.href);
//     urlWithoutHash.hash = "";
//     window.history.replaceState(null, "", urlWithoutHash);
//     window.location.href = url.href;
//   }
// }

/**
 * @param {ArrayBuffer} bytes
 */
function bytesToBase64(bytes) {
  const binString = Array.from(new Uint8Array(bytes), (byte) =>
    String.fromCodePoint(byte),
  ).join("");
  return btoa(binString);
}

/**
 * @param {string} inputString
 */
export async function compressAndBase64Encode(inputString) {
  const inputArray = new Blob([inputString]);

  const compressionStream = new CompressionStream("deflate-raw");

  const compressedStream = new Response(
    inputArray.stream().pipeThrough(compressionStream),
  ).arrayBuffer();

  const compressed = await compressedStream;
  const hashBuffer = await globalThis.crypto.subtle.digest(
    "SHA-256",
    compressed,
  );
  const hashArray = [...new Uint8Array(hashBuffer)].slice(0, 20);
  const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  const state = bytesToBase64(compressed);

  return { state, hash };
}

/**
 * @param {string} base64
 * @returns {ArrayBuffer}
 */
function base64ToBytes(base64) {
  const binString = atob(base64);
  const len = binString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    // eslint-disable-next-line unicorn/prefer-code-point
    bytes[i] = binString.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * This is the browser version of `libs/play/index.js`. Keep in sync!
 * @param {string} base64String
 */
export async function decompressFromBase64(base64String) {
  if (!base64String) {
    return { state: null, hash: null };
  }
  const bytes = base64ToBytes(base64String);
  const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
  const hashArray = [...new Uint8Array(hashBuffer)].slice(0, 20);
  const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  const decompressionStream = new DecompressionStream("deflate-raw");

  const decompressedStream = new Response(
    new Blob([bytes]).stream().pipeThrough(decompressionStream),
  ).arrayBuffer();

  const state = new TextDecoder().decode(await decompressedStream);
  return { state, hash };
}
