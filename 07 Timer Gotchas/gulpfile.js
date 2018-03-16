'use strict';

const gulp = require('gulp'),
  connect = require('gulp-connect'),
  open = require('gulp-open'),
  options = {
    port: 9005,
    root: ['src'],
    devBase: 'http://localhost:',
    browsers: ['safari', 'chrome']
  },
  openOptions = {
    uri: options.devBase + options.port,
    app: options.browser
  };

  gulp.task('connect', () => connect.server({
    root: options.root,
    port: options.port
  }));
  // https://github.com/stevelacy/gulp-open/issues/15
  gulp.task('open', () => gulp.src(__filename).pipe(open(openOptions)));

gulp.task('default', ['connect', 'open']);
