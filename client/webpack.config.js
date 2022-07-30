/**
  * Webpack 5 configuration file (custom Client-Version)
  * see https://webpack.js.org/configuration/
  * see https://webpack.js.org/configuration/dev-server/
  * ©2019-2022 - Andreas Friedel
  */

const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const process = require("process");

const cwd = process.cwd();

const config = {
  name: "Hexapod-js (Client)",

  target: "web",

  context: path.resolve(cwd, "src"),

  entry: {
    app: ["./app.tsx"],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      fs: false,
      path: false,
    },
  },

  output: {
    filename: "[name].js",
    path: path.resolve(cwd, "dist"),
    assetModuleFilename: "assets/[name][ext]",
    publicPath: "",
    globalObject: "self",
  },

  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: "ts-loader",
      }],
    }, {
      test: /\.(png|jpe?g|gif)$/,
      exclude: /node_modules/,
      type: "asset/resource",
    }],
  },

  performance: {
    hints: "warning",
    maxEntrypointSize: 8388608,
    maxAssetSize: 4194304,
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(cwd, "src/assets"),
        to: path.resolve(cwd, "dist/assets"),
        globOptions: {
          ignore: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.d.ts"],
        },
      }],
    }),
    new HtmlWebpackPlugin({
      baseUrl: "/",
      filename: "index.html",
      template: "index.html",
      inject: "head",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
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

      devServer: {
        allowedHosts: "all",
        bonjour: false,
        client: {
          logging: "warn",
          overlay: {
            errors: true,
            warnings: false,
          },
          progress: false,
          reconnect: true,
        },
        webSocketServer: "ws",
        compress: true,
        http2: false,
        https: false,
        headers: {
          "Cross-Origin-Embedder-Policy": "require-corp",
          "Cross-Origin-Opener-Policy": "same-origin",
          "Cross-Origin-Resource-Policy": "cross-origin",
        },
        historyApiFallback: true,
        host: "0.0.0.0",
        hot: false,
        // liveReload: true,
        // watchFiles: [path.resolve(cwd, "src")],
        port: 5000,
        static: {
          directory: path.resolve(cwd, "dist"),
          serveIndex: false,
        },
      },
    };
  }

  return {
    ...config,

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
