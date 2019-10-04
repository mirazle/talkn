const path = require("path");
module.exports = {
  mode: process.env.WEBPACK_ENV,
  context: __dirname + "/client/src/",
  entry: {
    javascript: __dirname + "/client/src/talkn.client.ts"
  },

  output: {
    path: __dirname + "/server/listens/express/client/",
    filename: "talkn.client.js"
  },

  module: {
    rules: [
      {
        test: /\.tsx|.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      common: path.resolve(__dirname, "./common") + "/",
      server: path.resolve(__dirname, "./server") + "/",
      client: path.resolve(__dirname, "./client") + "/"
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
  },

  devServer: {
    historyApiFallback: true,
    contentBase: __dirname + "/client/src/"
  },

  performance: {
    hints: false
  },
  devtool: "inline-source-map"
};
