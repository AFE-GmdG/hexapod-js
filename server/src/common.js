import process from "node:process";

/**
 * Returns a promise that resolves after the given number of milliseconds.
 * @param {number} ms delay in milliseconds
 * @returns {Promise<void>} A promise that resolves after the given number of milliseconds.
 */
export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));
};

/**
 * Maps a value from one range to another.
 * @param {number} value The value to map.
 * @param {number} fromLow The low value of the from range.
 * @param {number} fromHigh The high value of the from range.
 * @param {number} toLow The low value of the to range.
 * @param {number} toHigh The high value of the to range.
 * @param {boolean} clamp If true, the value will be clamped to the to range. Default is false.
 * @returns {number} The mapped value.
 */
export const mapValue = (value, fromLow, fromHigh, toLow, toHigh, clamp = false) => {
  if (fromLow === fromHigh || toLow === toHigh) {
    return toLow;
  }
  const mapped = (value - fromLow) / (fromHigh - fromLow) * (toHigh - toLow) + toLow;
  if (clamp) {
    if (mapped < toLow) {
      return toLow;
    } else if (mapped > toHigh) {
      return toHigh;
    }
  }
  return mapped;
};

/**
 * Returns a formatted and padded 8 bit value.
 * @param {number} value The 8 bit value to format as a hex string.
 * @returns {string} The formatted hex string.
 */
export const hexPad8Bit = (value) => {
  return `0x${value.toString(16).padStart(2, "0")}`;
};

/**
 * Returns a formatted and padded 16 bit value.
 * @param {number} value The 16 bit value to format as a hex string.
 * @returns {string} The formatted hex string.
 */
export const hexPad16Bit = (value) => {
  return `0x${value.toString(16).padStart(4, "0")}`;
};

export const terminalSize = () => {
  const {stdout, stderr} = process;
  if (stdout && stdout.columns && stdout.rows) {
    return {
      columns: stdout.columns,
      rows: stdout.rows,
    };
  }
  if (stderr && stderr.columns && stderr.rows) {
    return {
      columns: stderr.columns,
      rows: stderr.rows,
    };
  }
  return {
    columns: 80,
    rows: 10,
  };
};
