var gulp = require('gulp'),
  minify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream');

gulp.task('browserify', function () {
  return browserify('./src/parse-mock.js')
    .external('lodash')
    .external('sinon')
    .external('parse')
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('parse-mock.latest.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./dist/'))
});

//todo: add minify

gulp.task('build', ['browserify']);
gulp.task('default', ['build']);
