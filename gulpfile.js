var gulp = require('gulp');
var less = require('gulp-less');


gulp.task('less', function () {
  gulp.src('src/less/battleship.less')
  .pipe(less())
  .on('error', console.log)
  .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function () {
  gulp.watch('src/less/**/*',['less']);
});