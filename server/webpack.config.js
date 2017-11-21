module.exports = {
  resolve: {
    alias: {
      talkn: path.resolve(__dirname, '../'),
      server: path.resolve(__dirname, './../server'),
      client: path.resolve(__dirname, './../client'),
    }
  },
  devtool: 'inline-source-map',
}
