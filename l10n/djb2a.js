/* eslint-disable unicorn/prefer-code-point */
/**
 * djb2a based on https://github.com/sindresorhus/djb2a
 *
 * @license MIT
 *
 * Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// Explanation: https://stackoverflow.com/a/31621312/64949

const MAGIC_CONSTANT = 5381;

/**
 * @param {string} string
 */
export default function djb2a(string) {
  let hash = MAGIC_CONSTANT;

  for (let index = 0; index < string.length; index++) {
    // Equivalent to: `hash * 33 ^ string.charCodeAt(i)`
    hash = ((hash << 5) + hash) ^ string.charCodeAt(index);
  }

  // Convert it to an unsigned 32-bit integer.
  return hash >>> 0;
}
