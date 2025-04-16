import path from "node:path";

import { fileURLToPath } from "node:url";

import { rspack } from "@rspack/core";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { merge } from "webpack-merge";
// @ts-expect-error
import { StatsWriterPlugin } from "webpack-stats-plugin";

import { GenerateElementMapPlugin } from "./build/plugins/generate-element-map.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isProd = process.env.NODE_ENV === "production";

/** @type {import("@rspack/core").RspackOptions} */
const clientAndSsrAndInline = {
  mode: isProd ? "production" : "development",
  stats: isProd,
  devtool: "source-map",
};

const clientAndSsr = merge(clientAndSsrAndInline, {
  output: {
    module: true,
    chunkFormat: "module",
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    /** @type {import("@rspack/core").Plugin} */
    new StatsWriterPlugin({
      fields: ["publicPath", "entrypoints"],
    }),
  ],
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin({
        extractComments: true,
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
        test: /\.flt$/i,
        loader: "./build/loaders/fluent.js",
      },
      {
        test: /\.css$/i,
        loader: "postcss-loader",
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
});

/** @type {import("@rspack/core").MultiRspackOptions} */
export default [
  merge(clientAndSsr, {
    name: "ssr",
    target: "node",
    entry: {
      index: "./entry.ssr.js",
    },
    plugins: [
      new rspack.CssExtractRspackPlugin({
        filename: isProd ? "[name].[contenthash].css" : "[name].css",
        runtime: false,
      }),
    ],
    output: {
      path: path.resolve(__dirname, "dist/ssr"),
      filename: isProd ? "[name].js" : "[name].[contenthash].js",
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
  merge(clientAndSsr, {
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
  merge(clientAndSsrAndInline, {
    name: "inline",
    entry: {
      inline: "./entry.inline.js",
    },
    output: {
      path: path.resolve(__dirname, "dist/inline"),
      publicPath: "/static/inline/",
      filename: "[name].js",
      clean: true,
    },
    plugins: [
      new rspack.SourceMapDevToolPlugin({
        filename: "[name].[contenthash].js.map",
        publicPath: "/static/inline/",
        append: `
//# sourceURL=[file]
//# sourceMappingURL=[url]`,
      }),
    ],
    optimization: {
      splitChunks: false,
      runtimeChunk: false,
    },
  }),
];
