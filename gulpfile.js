'use strict';

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename'),
    clean        = require('gulp-clean'),
    browserSync  = require('browser-sync').create(),
    jade         = require('gulp-jade'),
    base64       = require('gulp-base64');

//样式
gulp.task('css', function () {
  return gulp.src(['src/skin/scss/*.scss','src/skin/promotion/**/css/*.scss'])
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0'],
      cascade: true,
      remove: true
    }))
    .pipe(base64())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/skin/promotion'))

})

//脚本
gulp.task('js', function () {
  return gulp.src(['src/skin/promotion/**/js/*','src/skin/promotion/**/js/**/*'])
    .pipe(rename({ suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/skin/promotion'))
})

// 图片
gulp.task('img', function() {
  return gulp.src(['src/skin/promotion/**/img/*','src/skin/promotion/**/img/**/*'])
    // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/skin/promotion'))
    // .pipe(notify({ message: 'Images task complete' }));
});

// 第三方js
gulp.task('plugs', function () {
  return gulp.src(['src/skin/plugs/*','src/skin/plugs/**/*'])
    .pipe(gulp.dest('dist/skin/plugs'))
})

//jade
gulp.task('jade',function () {
  return gulp.src(['src/**/*.jade'])
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('dist'))
});

//清理
gulp.task('clean', function () {
  return gulp.src('dist',{read: false})
  .pipe(clean());
})


gulp.task('build', function () {
  gulp.start('css','js','img','jade','plugs');
});

gulp.task('serve',function () {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch('src/**/*.jade',['jade'])
  gulp.watch(['src/skin/scss/*.scss','src/skin/promotion/**/css/*.scss'], ['css']);
  gulp.watch(['src/skin/promotion/**/js/*','src/skin/promotion/**/js/**/*'],['js']);
  gulp.watch(['src/skin/promotion/**/img/*','src/skin/promotion/**/img/**/*'],['img']);
  gulp.watch('*').on('change',browserSync.reload);
})

gulp.task('default', ['build','serve'])