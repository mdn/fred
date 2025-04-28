import path from "node:path";

import { fileURLToPath } from "node:url";

import { rspack } from "@rspack/core";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { fdir } from "fdir";
import { merge } from "webpack-merge";
// @ts-expect-error
import { StatsWriterPlugin } from "webpack-stats-plugin";

import { CSPHashPlugin } from "./build/plugins/csp-hash.js";
import { GenerateElementMapPlugin } from "./build/plugins/generate-element-map.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isProd = process.env.NODE_ENV === "production";

/** @type {import("@rspack/core").RspackOptions} */
const common = {
  mode: isProd ? "production" : "development",
  stats: isProd,
  devtool: "source-map",
  output: {
    module: true,
    chunkFormat: "module",
  },
  experiments: {
    outputModule: true,
    // futureDefaults: true
  },
  plugins: [
    new rspack.CssExtractRspackPlugin({
      filename: isProd ? "[name].[contenthash].css" : "[name].css",
      // chunkFilename: "[name].[contenthash].css",
      runtime: false,
    }),
    /** @type {import("@rspack/core").Plugin} */
    new StatsWriterPlugin({
      fields: ["publicPath", "entrypoints"],
    }),
  ],
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
    // TODO: ensure common chunks across entrypoints get deduped
    // splitChunks: {
    //   cacheGroups: {
    //     styles: {
    //       // name(module, chunks, cacheGroupKey) {
    //       //   // console.log(module, chunks, cacheGroupKey)
    //       //   return module.identifier().split("/").at(-2)
    //       // },
    //       test: /\.css$/,
    //       // type: "css/mini-extract",
    //       chunks: "all",
    //       // minChunks: 1,
    //       reuseExistingChunk: false,
    //       enforce: true,
    //     },
    //   },
    // },
  },
  module: {
    parser: {
      javascript: {
        url: "relative",
      },
    },
    rules: [
      {
        resourceQuery: /source/,
        type: "asset/source",
      },
      {
        test: /\.flt$/i,
        loader: "./build/loaders/fluent.js",
      },
      {
        test: /\.css$/i,
        loader: "postcss-loader",
        type: "javascript/auto",
        oneOf: [
          {
            resourceQuery: /lit/,
            use: [
              "./build/loaders/lit-css.js",
              {
                loader: "css-loader",
                options: {
                  exportType: "string",
                },
              },
            ],
          },
          {
            use: [rspack.CssExtractRspackPlugin.loader, "css-loader"],
          },
        ],
      },
      {
        test: /\.svg$/i,
        loader: "svgo-loader",
        oneOf: [
          {
            resourceQuery: /lit/,
            loader: "./build/loaders/lit-svg.js",
          },
          {
            type: "asset/resource",
          },
        ],
      },
    ],
  },
};

/** @type {import("@rspack/core").MultiRspackOptions} */
export default [
  merge(common, {
    name: "ssr",
    target: "node22",
    async entry() {
      return {
        // TODO: move all css to client bundle?
        // TODO: prohibit css imports in js in server bundle?
        index: [
          ...(await new fdir()
            .withFullPaths()
            .filter(
              (filePath) =>
                filePath.endsWith("/element.js") ||
                filePath.endsWith("/global.css"),
            )
            .crawl(path.join(__dirname, "components"))
            .withPromise()),
          "./entry.ssr.js",
        ],
        ...Object.fromEntries(
          (
            await new fdir()
              .withFullPaths()
              .filter((filePath) => filePath.endsWith("/index.css"))
              .crawl(path.join(__dirname, "components"))
              .withPromise()
          )
            // eslint-disable-next-line unicorn/no-await-expression-member
            .map((file) => ["styles-" + file.split("/").at(-2), file]),
        ),
      };
    },
    plugins: [isProd && new CSPHashPlugin()],
    output: {
      path: path.resolve(__dirname, "dist/ssr"),
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
  }),
  merge(common, {
    name: "client",
    entry: {
      index: [!isProd && "./build/hmr.js", "./entry.client.js"].filter(
        (x) => typeof x === "string",
      ),
    },
    target: ["web", "browserslist"],
    plugins: [!isProd && new GenerateElementMapPlugin()],
    output: {
      path: path.resolve(__dirname, "dist/client"),
      filename: isProd ? "[name].[contenthash].js" : "[name].js",
      clean: true,
      publicPath: "/static/client/",
    },
  }),
];
