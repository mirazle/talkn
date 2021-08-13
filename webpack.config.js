const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require( "path" );
const mode = process.env.MODE;
let port = 8000;
switch (mode) {
  case "client":
    port = 8080;
    break;
  case "api":
    port = 8081;
    break;
}

module.exports = {
  mode: process.env.WEBPACK_ENV,
  context: __dirname,
  cache: false,
  entry: {
    javascript: __dirname + `/${mode}/talkn.${mode}.ts`,
  },
  output: {
    path: __dirname + `/server/listens/express/${mode}/`,
    filename: `talkn.${mode}.js`,
  },
  module: {
    rules: [
      {
        test: /\.tsx|.ts$/,
        exclude: [/node_modules/],
        use: [{ loader: "ts-loader" }],
      },
    ],
  },
  resolve: {
    alias: {
      common: path.resolve(__dirname, "./common") + "/",
      api: path.resolve(__dirname, "./api") + "/",
      server: path.resolve(__dirname, "./server") + "/",
      client: path.resolve(__dirname, "./client") + "/",
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },

  devServer: {
    disableHostCheck: true, // devServer同士を親ifameから読んだ場合のエラーをOFFにする
    historyApiFallback: true, // 存在しないリソースに対するアクセスをindex.htmlにする
    contentBase: __dirname + `/${mode}/`,
    port,
  },

  performance: {
    hints: false,
  },
  /*
  plugins: [
    new BundleAnalyzerPlugin()
  ],
  */
  devtool: "inline-source-map",
};
