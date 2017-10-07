var gulp         = require('gulp'),
    del          = require('del'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    rename       = require('gulp-rename'),
    browserSync  = require('browser-sync').create(),
    jade         = require('gulp-jade'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs');

/**
 * gulpfile.js
 * 
 * commands:
 *  default: run a local server, watching files for changes
 *  deploy: deploy assets
 *  dist: deploy assets for production (minified) to 'dist/' folder
 */

gulp.task('browser-sync', ['deploy'], function() {
  browserSync.init({
    server: {
      baseDir: "./src" // folder to be served
    },
    notify: false
  });
});

gulp.task('styles', function () {
  return gulp.src('sass/**/*.sass')
  .pipe(sass({
    includePaths: require('node-bourbon').includePaths
  }).on('error', sass.logError))
  // .pipe(rename({suffix: '.min', prefix : ''}))
  .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
  // .pipe(minifycss())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.stream());
});

gulp.task('jade', function() {
  return gulp.src(['jade/**/!(_)*.jade'])
  .pipe(jade({
    pretty: true
  }))
  .pipe(gulp.dest('src'))
  // .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src([
    './src/libs/modernizr/modernizr.js',
    './src/libs/jquery/jquery.min.js',
    './src/libs/pace/pace.min.js',
    './src/libs/slick/slick.min.js',
    './src/libs/jquery.directional-hover/jquery.directional-hover.min.js',
    './src/libs/waypoints/waypoints.min.js',
    './src/libs/animnum/animnum.js',
    './src/libs/magnific-popup/jquery.magnific-popup.min.js',
    './src/libs/animate/animate-css.js',
    // './app/libs/smoothscroll/smoothscroll.min.js',
    './src/libs/parallax/parallax.min.js',
    './src/libs/imagesloaded/imagesloaded.pkgd.min.js',
    './src/libs/isotope/isotope.pkgd.min.js',
    './src/libs/textillate/jquery.fittext.js',
    './src/libs/textillate/jquery.lettering.js',
    './src/libs/textillate/jquery.textillate.js',
    './src/libs/superfish-master/js/superfish.min.js',
    './src/libs/selectize/dist/js/standalone/selectize.js',
    './src/libs/ytp-player/jquery.mb.YTPlayer.min.js',
    './src/libs/jquery-ui-1.12.1.custom/jquery-ui.min.js',
    './src/libs/countdown/jquery.countdown.min.js',
    './src/libs/googlemaps/gmap3.min.js',
    './src/libs/canvas-bg/particles.min.js',
    './src/libs/canvas-bg/demo-2.js'
  ])
  .pipe(concat('libs.js'))
  .pipe(uglify()) //Minify libs.js
  .pipe(gulp.dest('./src/js/'));
});

gulp.task('watch', function () {
  gulp.watch('sass/**/**/*.sass', ['styles']);
  gulp.watch('jade/**/**/**/**/*.jade', ['jade']);  
  gulp.watch('src/libs/**/*.js', ['scripts']);
  gulp.watch('src/js/*.js').on("change", browserSync.reload);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

/* 
 * Deploying for production
 */

gulp.task('styles-deploy', function () {
  return gulp.src('sass/**/*.sass')
  .pipe(sass({
    includePaths: require('node-bourbon').includePaths
  }).on('error', sass.logError))
  .pipe(rename({suffix: '.min', prefix : ''}))
  .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
  .pipe(minifycss())
  .pipe(gulp.dest('.dist/css'))
  .pipe(browserSync.stream());
});

gulp.task('deploy', ['styles', 'scripts', 'jade']);
gulp.task('default', ['browser-sync', 'watch']);
