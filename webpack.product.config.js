const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname + '/src', 'index.jsx'),
  output: {
    filename: './react-infinite-slide.min.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel',
      }
    ],
  },
  externals: {
    // Use external version of React
    "react": "React"
  },
};
