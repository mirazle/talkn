const path = require('path');
const app = process.env.app;
let port = 8000;
switch (app) {
  default:
  case 'api':
    port = 8001;
    break;
  case 'client':
    port = 8080;
    break;
  case 'top':
    port = 8000;
    break;
}

module.exports = {
  cache: false,
  entry: {
    javascript: path.resolve(__dirname, `./${app}/src/talkn.${app}.ts`),
  },
  output: {
    filename: `talkn.${app}.js`,
    path: path.resolve(__dirname, `./server/src/listens/express/${app}/`),
  },
  module: {
    rules: [
      {
        test: /\.tsx|.ts$/,
        exclude: [/node_modules/],
        use: [{ loader: 'ts-loader' }],
      },
    ],
  },
  resolve: {
    alias: {
      common: path.resolve(__dirname, './common/src') + '/',
      server: path.resolve(__dirname, './server/src') + '/',
      api: path.resolve(__dirname, './api/src') + '/',
      client: path.resolve(__dirname, './client/src') + '/',
      top: path.resolve(__dirname, './top/src') + '/',
      assets: path.resolve(__dirname, './assets') + '/',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  devServer: {
    hot: true,
    http2: true,
    https: {
      key: path.resolve(__dirname, './common/pems/localhost.key'),
      cert: path.resolve(__dirname, './common/pems/localhost.crt'),
    },
    port,
    historyApiFallback: true, // 存在しないリソースに対するアクセスをindex.htmlにする
  },

  performance: {
    hints: false,
  },

  //  plugins: [new BundleAnalyzerPlugin()],

  devtool: 'inline-source-map',
};
