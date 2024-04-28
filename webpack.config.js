const path = require("path");


const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const port = 3000;
let publicUrl = `http://localhost:${port}`;
if (process.env.GITPOD_WORKSPACE_URL) {
  const [schema, host] = process.env.GITPOD_WORKSPACE_URL.split("://");
  publicUrl = `${port}-${host}`;
}

module.exports = {
  mode: "development",
  entry: ["./src/js/app.js"],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "main.bundle.js",
    sourceMapFilename: "[name].js.map",
  },
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    public: publicUrl,
    stats: "errors-warnings",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: {
          loader: "file-loader",
          options: { name: "[name].[ext]" },
        },
      },
      {
        test: /\.html$/i,
        use: {
          loader: "html-loader",
          options: {
            attributes: false,
          },
        },
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      // additionalFormatters: [cleanStack]
    }),
    new ErrorOverlayPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
  ],
};