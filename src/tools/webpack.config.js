const WebpackWatchedGlobEntries = require("webpack-watched-glob-entries-plugin");
const path = require("path");
module.exports = {
  entry: WebpackWatchedGlobEntries.getEntries([
    path.resolve(__dirname, "src/**/index.js")
  ]),
  output: {
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  target: "node",
  plugins: [new WebpackWatchedGlobEntries()]
};
