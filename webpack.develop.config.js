const path = require('path');

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, 'example')
  },
  output: {
    path: path.resolve(__dirname, "example"),
    filename: '[name].js'
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    port: 8080,
    contentBase: "./example"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}
