import { defineConfig } from "@rsbuild/core";
import { pluginFluent } from "./plugin-fluent/fluent.js";

export default defineConfig({
  plugins: [pluginFluent()],
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
        filename: {
          js: "[name].cjs",
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
            test: /\.svg$/,
            loader: "svgo-loader",
          },
          {
            test: /\.svg$/,
            resourceQuery: "mdnsvg",
            loader: "./plugin-mdnsvg/loader.js",
          }
        ]
      }
    }
  },
  performance: {
    chunkSplit: {
      strategy: "split-by-module",
    },
  },
});
