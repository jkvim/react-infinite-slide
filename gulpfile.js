"use strict"

const gulp = require('gulp')
const ghPages = require('gulp-gh-pages')
const path = require('path')
const { spawnSync } = require('child_process')

gulp.task('build', () => {
  spawnSync('yarn', ['build:example'])
})

// depoly to github page
gulp.task('depoly', ['build'], () => {
  return gulp.src([
    './example/*'
  ]).pipe(ghPages())
})

gulp.task('default', ['depoly'])