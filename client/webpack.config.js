module.exports = {
  mode: process.env.WEBPACK_ENV,
  context: __dirname + "/src/",
  entry: {
    javascript: __dirname + "/src/talkn.client.js"
  },

  output: {
    path: __dirname + "/../server/listens/express/client/",
    filename: "talkn.client.js"
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loaders: ["ts-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.css$/,
        loader: "file?name=[name].[ext]"
      }
    ]
  },
  /*
  plugins: [
    new BundleAnalyzerPlugin()
  ],
*/
  resolve: {
    extensions: [".js", ".jsx", "ts", "tsx"]
  },

  devServer: {
    historyApiFallback: true,
    contentBase: __dirname + "/src/"
  },

  performance: {
    hints: false
  },
  devtool: "inline-source-map"
};
