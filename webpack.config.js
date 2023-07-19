/* eslint-env node */

const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { SubresourceIntegrityPlugin } = require("webpack-subresource-integrity");

module.exports = () => {
  return {
    mode: "development",
    devtool: "source-map",
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new MiniCssExtractPlugin(),
      new SubresourceIntegrityPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.js$/,
          enforce: "pre",
          use: ["source-map-loader"],
        },
        {
          test: /\.ts$/,
          use: {
            loader: "ts-loader",
            options: {
              onlyCompileBundledFiles: true,
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
      alias: {
        "prosemirror-model": path.resolve("./node_modules/prosemirror-model"),
      },
    },
    entry: "./src/index.ts",
    output: {
      filename: "[name].js",
    },
    optimization: {
      minimize: false,
      splitChunks: {
        chunks: "all",
      },
    },
  };
};
