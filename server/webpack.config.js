/**
  * Webpack 5 configuration file (custom Server-Version)
  * see https://webpack.js.org/configuration/
  * see https://webpack.js.org/configuration/dev-server/
  * ©2019-2022 - Andreas Friedel
  */

const webpack = require("webpack");
const path = require("path");
const process = require("process");

const cwd = process.cwd();

const config = {
  name: "Hexapod-js (Server)",

  target: "node",

  context: path.resolve(cwd, "src"),

  entry: {
    server: ["./server.ts"],
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  output: {
    filename: "[name].js",
    path: path.resolve(cwd, "dist"),
    publicPath: "",
    globalObject: "self",
  },

  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [{
        loader: "ts-loader",
      }],
    }],
  },

  performance: {
    hints: "warning",
    maxEntrypointSize: 4194304,
    maxAssetSize: 4194304,
  },

  plugins: [
  ],

  watchOptions: {
    ignored: /node_modules/,
  },
};

module.exports = (_env, argv) => {
  if (argv && argv.mode === "development") {
    return {
      ...config,

      devtool: "source-map",

      optimization: {
        emitOnErrors: false,
        minimize: false,
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 0,
          cacheGroups: {
            named: {
              test: /[\\/]node_modules[\\/]/,
              name() {
                return "vendor";
              },
            },
          },
        },
      },

      plugins: [
        ...config.plugins,

        new webpack.DefinePlugin({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "process.env.NODE_ENV": JSON.stringify("development"),
          // eslint-disable-next-line global-require
          "process.env.VERSION": JSON.stringify(`Debug ${require("./package.json").version}`),
        }),
      ],
    };
  }

  return {
    ...config,

    output: {
      ...config.output,
      filename: "[name].min.js",
    },

    devtool: false,

    optimization: {
      emitOnErrors: false,
      minimize: true,
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          named: {
            test: /[\\/]node_modules[\\/]/,
            name() {
              return "vendor";
            },
          },
        },
      },
    },

    plugins: [
      ...config.plugins,

      new webpack.DefinePlugin({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "process.env.NODE_ENV": JSON.stringify("production"),
        // eslint-disable-next-line global-require
        "process.env.VERSION": JSON.stringify(require("./package.json").version),
      }),
    ],

  };
};
