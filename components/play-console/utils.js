// Copied from https://github.com/mdn/bob/blob/9da42cd641d7f2a9796bf3406e74cad411ce9438/editor/js/editor-libs/console-utils.ts
/**
 * Formats arrays:
 * - quotes around strings in arrays
 * - square brackets around arrays
 * - adds commas appropriately (with spacing)
 * - identifies empty slots
 * designed to be used recursively
 * @param {any} input - The output to log.
 * @returns Formatted output as a string.
 */
export function formatArray(input) {
  let output = "";
  for (let i = 0, l = input.length; i < l; i++) {
    if (typeof input[i] === "string") {
      output += '"' + input[i] + '"';
    } else if (Array.isArray(input[i])) {
      output += "Array [";
      output += formatArray(input[i]);
      output += "]";
    } else if (Object.prototype.hasOwnProperty.call(input, i)) {
      output += formatOutput(input[i]);
    } else {
      let emptyCount = 1;
      while (i + 1 < l && !Object.prototype.hasOwnProperty.call(input, i + 1)) {
        emptyCount++;
        i++;
      }
      output +=
        emptyCount === 1 ? "<1 empty slot>" : `<${emptyCount} empty slots>`;
    }

    if (i < input.length - 1) {
      output += ", ";
    }
  }
  return output;
}

/**
 * Formats objects:
 * ArrayBuffer, DataView, SharedArrayBuffer,
 * Int8Array, Int16Array, Int32Array,
 * Uint8Array, Uint16Array, Uint32Array,
 * Uint8ClampedArray, Float32Array, Float64Array
 * Symbol
 * @param {any} input - The output to log.
 * @returns Formatted output as a string.
 */
export function formatObject(input) {
  const bufferDataViewRegExp = /^(ArrayBuffer|SharedArrayBuffer|DataView)$/;
  const complexArrayRegExp =
    /^(Int8Array|Int16Array|Int32Array|Uint8Array|Uint16Array|Uint32Array|Uint8ClampedArray|Float32Array|Float64Array|BigInt64Array|BigUint64Array)$/;

  const objectName = input.constructor ? input.constructor.name : input;

  if (objectName === "String") {
    // String object
    return `String { "${input.valueOf()}" }`;
  }

  if (input === JSON) {
    // console.log(JSON) is output as "JSON {}" in browser console
    return `JSON {}`;
  }

  if (objectName.match && bufferDataViewRegExp.test(objectName)) {
    return objectName + " {}";
  }

  if (objectName.match && complexArrayRegExp.test(objectName)) {
    const arrayLength = input.length;

    return arrayLength > 0
      ? objectName + " [" + formatArray(input) + "]"
      : objectName + " []";
  }

  if (objectName === "Symbol" && input !== undefined) {
    return input.toString();
  }

  if (objectName === "Object") {
    if (input?._MDNPlaySerializedObject) {
      return input._MDNPlaySerializedObject;
    }
    let formattedChild = "";
    let start = true;
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        if (start) {
          start = false;
        } else {
          formattedChild = formattedChild + ", ";
        }
        formattedChild = formattedChild + key + ": " + formatOutput(input[key]);
      }
    }
    return objectName + " { " + formattedChild + " }";
  }

  // Special object created with `OrdinaryObjectCreate(null)` returned by, for
  // example, named capture groups in https://mzl.la/2RERfQL
  // @see https://github.com/mdn/bob/issues/574#issuecomment-858213621
  if (!input.constructor && !input.prototype) {
    let formattedChild = "";
    let start = true;
    for (const key in input) {
      if (start) {
        start = false;
      } else {
        formattedChild = formattedChild + ", ";
      }
      formattedChild = formattedChild + key + ": " + formatOutput(input[key]);
    }
    return "Object { " + formattedChild + " }";
  }

  return input;
}

/**
 * Formats output to indicate its type:
 * - quotes around strings
 * - single quotes around strings containing double quotes
 * - square brackets around arrays
 * (also copes with arrays of arrays)
 * does NOT detect Int32Array etc
 * @param {any} input - The output to log.
 * @returns Formatted output as a string.
 */
export function formatOutput(input) {
  if (input === undefined || input === null || typeof input === "boolean") {
    return String(input);
  } else if (typeof input === "number") {
    // Negative zero
    if (Object.is(input, -0)) {
      return "-0";
    }
    return String(input);
  } else if (typeof input === "bigint") {
    return String(input) + "n";
  } else if (typeof input === "string") {
    // string literal
    return input.includes('"') ? "'" + input + "'" : '"' + input + '"';
  } else if (Array.isArray(input)) {
    // check the contents of the array
    return "Array [" + formatArray(input) + "]";
  } else {
    return formatObject(input);
  }
}
