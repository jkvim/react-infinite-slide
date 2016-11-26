"use strict";

const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');
const webpack = require('webpack-stream');
const path = require('path');

gulp.task('build', () => {
  return gulp.src('./example/index.jsx')
    .pipe(webpack({
      entry: {
        bundle: path.resolve(__dirname + '/example', 'index.jsx')
      },
      output: {
        path: path.resolve(__dirname, "example"),
        filename: '[name].js',
      },
      resolve: {
        extensions: ['', '.js', '.jsx']
      },
      devtools: '#eval',
      module: {
        loaders: [
          {
            test: /\.jsx$/,
            loader: 'babel',
          }
        ],
      },
    }))
    .pipe(gulp.dest('./example'));
});

// depoly to github page
gulp.task('depoly', ['build'], () => {
  return gulp.src([
    './example/*'
  ]).pipe(ghPages());
});

gulp.task('default', ['depoly']);