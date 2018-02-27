const path = require('path');

module.exports = {
  context: __dirname + "/src",
  entry: {
    javascript: ["./talkn.client.js"],
  },

  output: {
    path: __dirname + "./../",
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
      'common': path.resolve(__dirname, '../common') + '/',
      'server': path.resolve(__dirname, '../server') + '/',
      'client': path.resolve(__dirname) + '/'
    },
    extensions: ['.js', '.jsx']
  },

  devtool: 'inline-source-map',
}
