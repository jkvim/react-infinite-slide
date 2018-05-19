"use strict"

const gulp = require('gulp')
const ghPages = require('gulp-gh-pages')
const webpack = require('webpack-stream')
const path = require('path')

gulp.task('build', () => {
  return gulp.src('./example/index.js')
    .pipe(webpack({
      entry: {
        bundle: path.resolve(__dirname + '/example', 'index.js')
      },
      output: {
        path: path.resolve(__dirname, "example"),
        filename: '[name].js',
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
          }
        ],
      },
    }))
    .pipe(gulp.dest('./example'))
})

// depoly to github page
gulp.task('depoly', ['build'], () => {
  return gulp.src([
    './example/*'
  ]).pipe(ghPages())
})

gulp.task('default', ['depoly'])