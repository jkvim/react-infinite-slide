const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/dev-server',
      path.resolve(__dirname + '/example', 'index.jsx')
    ],
  },
  output: {
    path: path.resolve(__dirname, "example"),
    filename: '[name].js',
  },
  devtools: '#eval',
  devServer: {
    hot: true,
    inline: true,
    port: 8080,
    contentBase: "./example",
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
    ],
  },
};
