var gulp = require('gulp'),
  minify = require('gulp-uglify'),
  concat = require('gulp-concat');

gulp.task('build', function () {
  return gulp.src(['src/**.js'])
    .pipe(minify({mangle: false}))
    .pipe(concat('parse-mock.min.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['build']);