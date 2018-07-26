const path = require('path');

module.exports = {
  mode: 'development',
  context: __dirname + "/client/src/",
  entry: {
    javascript: __dirname + "/client/src/talkn.client.js",
  },

  output: {
    path: __dirname + "/server/listens/express/client/",
    filename: "talkn.client.js",
  },


  module: {
    rules: [
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
      'common': path.resolve(__dirname, 'common') + '/',
      'server': path.resolve(__dirname, 'server') + '/',
      'client': path.resolve(__dirname, 'client') + '/'
    },
    extensions: ['.js', '.jsx']
  },

  devServer: {
    historyApiFallback: true,
    contentBase: "./client/src/",
  },

  devtool: 'inline-source-map',
}
