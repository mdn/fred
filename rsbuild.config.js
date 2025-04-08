import { defineConfig, rspack } from "@rsbuild/core";

import { pluginReset } from "./build/plugins/reset.js";
import { pluginTsNocheck } from "./build/plugins/ts-nocheck.js";

export default defineConfig({
  plugins: [pluginReset(), pluginTsNocheck()],
  environments: {
    client: {
      output: {
        manifest: true,
        target: "web",
        emitCss: true,
        distPath: {
          root: "dist/client",
        },
        assetPrefix: "/static/client/",
      },
      dev: {
        assetPrefix: "/client/",
      },
      source: {
        tsconfigPath: "./legacy/tsconfig.json",
        entry: {
          index: "./entry.client.js",
          legacy: "./legacy/index.tsx",
        },
      },
    },
    ssr: {
      output: {
        manifest: true,
        target: "node",
        emitCss: true,
        distPath: {
          root: "dist/ssr",
        },
        cleanDistPath: {
          keep: [/\/index\.d\.ts$/, /\/package\.json$/],
        },
        assetPrefix: "/static/ssr/",
      },
      dev: {
        assetPrefix: "/ssr/",
      },
      source: {
        entry: {
          index: "./entry.ssr.js",
        },
      },
    },
  },
  tools: {
    htmlPlugin: false,
    rspack: {
      module: {
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
    },
  },
  performance: {
    chunkSplit: {
      strategy: "split-by-module",
    },
  },
});
