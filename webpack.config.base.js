const path = require('path');
const app = process.env.app;
let port = 8000;
switch (app) {
  case 'cover':
    port = 8000;
    break;
  default:
  case 'api':
    port = 8001;
    break;
  case 'components':
    port = 8002;
    break;
  case 'tune':
    port = 8003;
    break;
  case 'client':
    port = 8080;
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
      'common/node_modules': path.resolve(__dirname, './common/node_modules') + '/',
      'common': path.resolve(__dirname, './common/src') + '/',
      'server': path.resolve(__dirname, './server/src') + '/',
      'api': path.resolve(__dirname, './api/src') + '/',
      'client': path.resolve(__dirname, './client/src') + '/',
      'cover': path.resolve(__dirname, './cover/src') + '/',
      'tune': path.resolve(__dirname, './tune/src') + '/',
      'components': path.resolve(__dirname, './components/src') + '/',
      'assets': path.resolve(__dirname, './assets') + '/',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },

  devServer: {
    allowedHosts: 'all',
    compress: true,
    //hot: true,
    server: {
      type: 'https',
      options: {
        key: path.resolve(__dirname, './common/pems/localhost.key'),
        cert: path.resolve(__dirname, './common/pems/localhost.crt'),
      },
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
