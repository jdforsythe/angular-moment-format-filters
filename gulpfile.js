var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    KarmaServer = require('karma').Server;


gulp.task('jshint', function() {
  gulp.src('./src/angular-moment-format-filters.js')
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('dist', function() {
  // first copy the pretty version to ./dist
  gulp.src('./src/angular-moment-format-filters.js')
    .pipe(gulp.dest('./dist'));

  gulp.src('./src/angular-moment-format-filters.js')
    .pipe(uglify())
    .pipe(rename('angular-moment-format-filters.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('test', function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});