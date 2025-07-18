export default override();

/**
 * @param {object} [overrides]
 * @param {(string | object)[]} [plugins]
 * @returns
 */
export function override(overrides, plugins = []) {
  return {
    multipass: true,
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
            ...overrides,
          },
        },
      },
      ...plugins,
    ],
  };
}
