const path = require('path');

module.exports = {
  context: __dirname + "/src",
  entry: {
    javascript: "./talkn.client.js",
//    html: "./index.html",
  },

  output: {
    path: __dirname + "/dist",
    filename: "talkn.client.js",
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.css$/,
        loader: "file?name=[name].[ext]",
      },
    ],
  },

  resolve: {
    alias: {
      'common': path.resolve(__dirname, '../common/'),
      '~': path.resolve(__dirname)
    },
    extensions: ['.js', '.jsx']
  },

  devtool: 'inline-source-map',
}
