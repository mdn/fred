import { execSync } from "node:child_process";
import path from "node:path";

import { fileURLToPath } from "node:url";

import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";
import { rspack } from "@rspack/core";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { fdir } from "fdir";
import { RspackManifestPlugin } from "rspack-manifest-plugin";
import { merge } from "webpack-merge";
// @ts-expect-error
import { StatsWriterPlugin } from "webpack-stats-plugin";

import { BUILD_OUT_ROOT } from "./build/env.js";
import { CSPHashPlugin } from "./build/plugins/csp-hash.js";
import { GenerateElementMapPlugin } from "./build/plugins/generate-element-map.js";
import { override as svgoOverride } from "./svgo.config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const commitHash = execSync("git rev-parse --short HEAD").toString().trim();

const isProd = process.env.NODE_ENV === "production";
const buildLegacy = Boolean(
  JSON.parse(process.env.FRED_LEGACY || "null") ?? isProd,
);

const OPTIMIZATIONS = {
  MIN_CHUNK_SIZE: 1000,
  MAX_CHUNK_SIZE: 300_000,
  /** @type {Record<string, string[]>} */
  CHUNKED_STYLES: {
    // foo: ["navigation", "logo"],
    // bar: ["global", "reference-layout"],
  },
};

/**
 * @param {boolean} lit
 */
const postcssLoaders = (lit = false) => [
  {
    // the light-dark polyfill incorrectly assumes
    // it's operating on all css in the page,
    // so requires fixing
    loader: "./build/loaders/fix-light-dark.js",
  },
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [
          [
            "@csstools/postcss-global-data",
            {
              files: [
                "./components/media/index.css",
                "./components/layout/global.css",
              ],
            },
          ],
          [
            "postcss-mixins",
            {
              mixins: {
                "light-dark":
                  /**
                   * @param {any} _mixin
                   * @param {string} property
                   * @param {string} light
                   * @param {string} dark
                   */
                  (_mixin, property, light, dark) => ({
                    [property]: light,
                    "@media (prefers-color-scheme: dark)": {
                      [property]: dark,
                    },
                    '[data-theme="light"] &': {
                      [property]: light,
                    },
                    '[data-theme="dark"] &': {
                      [property]: dark,
                    },
                  }),
              },
            },
          ],
          ["postcss-custom-media"],
          [
            "postcss-preset-env",
            {
              stage: 2,
              minimumVendorImplementations: 2,
            },
          ],
          ...(isProd && lit ? [["cssnano"]] : []),
        ],
      },
    },
  },
];

/** @type {import("@rspack/core").RspackOptions} */
const common = {
  mode: isProd ? "production" : "development",
  stats: isProd,
  devtool: "source-map",
  output: {
    module: true,
    chunkFormat: "module",
    assetModuleFilename: "[name].[hash][ext]",
  },
  experiments: {
    outputModule: true,
    futureDefaults: true,
  },
  optimization: {
    minimizer: [
      // TODO: do we need to minimize ssr bundle at all?
      new rspack.SwcJsMinimizerRspackPlugin({
        extractComments: true,
        minimizerOptions: {
          mangle: {
            keep_classnames: true,
          },
        },
      }),
      // lightningcss breaks our dark theme (https://github.com/parcel-bundler/lightningcss/issues/873):
      // new rspack.LightningCssMinimizerRspackPlugin(),
      // so use cssnano instead:
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    parser: {
      javascript: {
        url: "relative",
      },
    },
    rules: [
      {
        resourceQuery: /url/,
        type: "asset/resource",
      },
      {
        resourceQuery: /source/,
        type: "asset/source",
      },
      {
        test: /\.ftl$/i,
        loader: "./build/loaders/fluent.js",
      },
      {
        // don't do anything with css, because we don't want direct imports to work
        // in server components: we have a path-based system for loading the correct
        // styles. set type to javascript/auto to disable native rspack css handling
        test: /\.css$/i,
        type: "javascript/auto",
      },
      {
        test: /\.css$/i,
        resourceQuery: /lit/,
        use: [
          "./build/loaders/lit-css.js",
          {
            loader: "css-loader",
            options: {
              exportType: "string",
              importLoaders: 2,
              // TODO: extract inline source map into external .map file in prod
              sourceMap: !isProd,
            },
          },
          ...postcssLoaders(true),
        ],
      },
    ],
  },
};

/** @type {import("@rspack/core").RspackOptions} */
const notServiceWorkerCommon = {
  plugins: [
    /** @type {import("@rspack/core").Plugin} */
    new StatsWriterPlugin({
      fields: ["publicPath", "entrypoints"],
    }),
  ],
};

/** @type {import("@rspack/core").RspackOptions} */
const clientAndSsrCommon = {
  plugins: [
    new rspack.DefinePlugin({
      "process.env": JSON.stringify({
        FRED_PLAYGROUND_LOCAL: String(!isProd),
        ...Object.fromEntries(
          Object.entries(process.env).filter(([key]) =>
            key.startsWith("FRED_"),
          ),
        ),
      }),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.svg$/i,
        oneOf: [
          {
            resourceQuery: /lit/,
            use: [
              "./build/loaders/lit-svg.js",
              {
                loader: "svgo-loader",
                options: svgoOverride({
                  cleanupIds: false,
                  removeUnknownsAndDefaults: {
                    keepRoleAttr: true,
                    keepAriaAttrs: true,
                  },
                }),
              },
            ],
          },
          {
            loader: "svgo-loader",
            options: svgoOverride(
              {
                cleanupIds: false,
                removeUnknownsAndDefaults: {
                  keepRoleAttr: true,
                  keepAriaAttrs: true,
                },
              },
              [
                {
                  name: "cleanupIds",
                  params: {
                    preserve: ["light", "dark"],
                  },
                },
              ],
            ),
            type: "asset/resource",
          },
        ],
      },
    ],
  },
};

const ssrConfig = merge(common, notServiceWorkerCommon, clientAndSsrCommon, {
  name: "ssr",
  target: "node22",
  async entry() {
    return {
      index: [
        // load custom elements
        ...(await new fdir()
          .withFullPaths()
          .filter((filePath) => filePath.endsWith("/element.js"))
          .crawl(path.join(__dirname, "components"))
          .withPromise()),
        "./entry.ssr.js",
      ],
    };
  },
  plugins: [
    isProd && new CSPHashPlugin(),
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: "public",
          to: path.resolve(BUILD_OUT_ROOT),
        },
      ],
    }),
  ],
  output: {
    path: path.resolve(BUILD_OUT_ROOT, "static", "ssr"),
    filename: "[name].js",
    // use proper file names in sourcemaps:
    devtoolModuleFilenameTemplate: (info) =>
      path.resolve(info.absoluteResourcePath),
    clean: {
      keep: "index.d.ts",
    },
    publicPath: "/static/ssr/",
    library: { type: "module" },
  },
});

/** @type {import("@rspack/core").RspackOptions} */
const clientAndLegacyCommon = {
  target: ["web", "browserslist"],
  output: {
    filename: isProd ? "[name].[contenthash].js" : "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        resourceQuery: /^$/,
        use: [
          rspack.CssExtractRspackPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          ...postcssLoaders(),
        ],
      },
    ],
  },
};

const clientConfig = merge(
  common,
  notServiceWorkerCommon,
  clientAndSsrCommon,
  clientAndLegacyCommon,
  {
    name: "client",
    async entry() {
      return {
        index: {
          runtime: "runtime",
          import: [!isProd && "./build/hmr.js", "./entry.client.js"].filter(
            (x) => typeof x === "string",
          ),
        },
        // load `components/*/global.css` files into global style entrypoint
        "styles-global": {
          runtime: "styles",
          import: await new fdir()
            .withFullPaths()
            .filter((filePath) => filePath.endsWith("/global.css"))
            .crawl(path.join(__dirname, "components"))
            .withPromise(),
        },
        // load `components/*/server.css` files into per-component style entrypoints
        ...Object.fromEntries(
          (
            await new fdir()
              .withFullPaths()
              .filter((filePath) => filePath.endsWith("/server.css"))
              .crawl(path.join(__dirname, "components"))
              .withPromise()
          )
            // eslint-disable-next-line unicorn/no-await-expression-member
            .map((file) => [
              "styles-" + file.split("/").at(-2),
              { runtime: "styles", import: file },
            ]),
        ),
      };
    },
    plugins: [
      process.env.RSDOCTOR &&
        new RsdoctorRspackPlugin(
          process.env.RSDOCTOR_PORT
            ? {
                port: Number.parseInt(process.env.RSDOCTOR_PORT, 10),
              }
            : {
                disableClientServer: true,
                mode: "brief",
              },
        ),
      !isProd && new GenerateElementMapPlugin(),
      new rspack.CssExtractRspackPlugin({
        filename: isProd ? "[name].[contenthash].css" : "[name].css",
        // chunkFilename: "[name].[contenthash].css",
        runtime: false,
      }),
    ],
    output: {
      path: path.resolve(BUILD_OUT_ROOT, "static", "client"),
      publicPath: "/static/client/",
    },
    optimization: {
      splitChunks: {
        minSize: OPTIMIZATIONS.MIN_CHUNK_SIZE,
        maxSize: OPTIMIZATIONS.MAX_CHUNK_SIZE,
        chunks: "all",
        cacheGroups: {
          ...Object.fromEntries(
            Object.entries(OPTIMIZATIONS.CHUNKED_STYLES).map(
              ([name, components]) => [
                `styles-${name}`,
                {
                  type: "css/mini-extract",
                  name: `styles-${name}`,
                  chunks:
                    /** @param {import("@rspack/core").Chunk} chunk */
                    (chunk) =>
                      Boolean(
                        chunk.name &&
                          components
                            .map((component) => `styles-${component}`)
                            .includes(chunk.name),
                      ),
                  enforce: true,
                },
              ],
            ),
          ),
        },
      },
    },
  },
);

const legacyConfig = merge(
  common,
  notServiceWorkerCommon,
  clientAndLegacyCommon,
  {
    name: "legacy",
    entry: {
      index: "./legacy/index.tsx",
      yari: "./node_modules/@mdn/yari/client/src/index.tsx",
    },
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(BUILD_OUT_ROOT, "static", "legacy"),
      publicPath: "/static/legacy/",
    },
    resolve: {
      extensions: ["...", ".tsx", ".ts", ".jsx"],
      alias: {
        [path.resolve(
          __dirname,
          "node_modules/@mdn/yari/client/src/document/toolbar/index.tsx",
        )]: false,
      },
    },
    plugins: [
      new rspack.DefinePlugin({
        "process.env": JSON.stringify({
          ...Object.fromEntries(
            Object.entries(process.env).filter(([key]) =>
              key.startsWith("REACT_APP_"),
            ),
          ),
          REACT_APP_FRED: "true",
          REACT_APP_WRITER_MODE: "false",
          REACT_APP_DEV_MODE: "false",
          REACT_APP_ENABLE_PLUS: "true",
        }),
      }),
      new rspack.ProvidePlugin({
        React: "react",
      }),
      new rspack.CssExtractRspackPlugin({
        filename: "[name].[contenthash].css",
        runtime: true,
      }),
      new rspack.HtmlRspackPlugin({
        inject: true,
        chunks: ["yari"],
        filename: "index.[contenthash].html",
        template: "node_modules/@mdn/yari/client/public/index.html",
      }),
      new RspackManifestPlugin({
        fileName: "asset-manifest.json",
        generate: (_seed, files) =>
          files
            .map((file) => file.path)
            .filter((path) => !path.endsWith(".map")),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.jsx$/,
          use: {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "ecmascript",
                  jsx: true,
                },
              },
            },
          },
          type: "javascript/auto",
        },
        {
          test: /\.tsx$/,
          use: {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
              },
            },
          },
          type: "javascript/auto",
        },
        {
          test: /\.ts$/,
          use: {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: false,
                },
              },
            },
          },
          type: "javascript/auto",
        },
        {
          test: /\.(sass|scss)$/,
          with: { type: "css" },
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 4,
                exportType: "css-style-sheet",
              },
            },
            ...postcssLoaders(),
            "resolve-url-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
          type: "javascript/auto",
        },
        {
          test: /\.(sass|scss)$/,
          resourceQuery: /^$/,
          use: [
            rspack.CssExtractRspackPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 4,
              },
            },
            ...postcssLoaders(),
            "resolve-url-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
          type: "javascript/auto",
        },
        {
          test: /\.(png)$/,
          type: "asset/resource",
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: {
            loader: "@svgr/webpack",
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
              exportType: "named",
            },
          },
        },
        {
          resourceQuery: /raw/,
          type: "asset/source",
        },
      ],
    },
  },
);

const serviceWorkerConfig = merge(common, {
  name: "service-worker",
  entry: {
    "service-worker": "./vendor/yari/client/pwa/src/service-worker.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(BUILD_OUT_ROOT),
    publicPath: "/",
    clean: false,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    extensionAlias: {
      ".js": [".ts", ".js"],
    },
  },
  module: {
    rules: [
      {
        test: /\.[jt]s$/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "typescript",
                tsx: false,
              },
            },
          },
        },
        type: "javascript/auto",
      },
    ],
  },
  plugins: [
    new rspack.DefinePlugin({
      __COMMIT_HASH__: JSON.stringify(commitHash),
      __UPDATES_BASE_URL__: JSON.stringify(
        process.env.REACT_APP_UPDATES_BASE_URL,
      ),
    }),
  ],
});

/** @type {import("@rspack/core").MultiRspackOptions} */
export default [
  ssrConfig,
  clientConfig,
  ...(buildLegacy ? [legacyConfig, serviceWorkerConfig] : []),
];
