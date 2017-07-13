const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src'),
  output: {
    filename: './react-infinite-slide.min.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
  // externals: {
  //   // Use external version of React
  //   react: {
  //     root: 'React',
  //     commonjs2: 'react',
  //     commonjs: 'react',
  //     amd: 'react'
  //   }
  // }
}
