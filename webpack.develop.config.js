const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
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
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/index.html'
    })
  ]
}
