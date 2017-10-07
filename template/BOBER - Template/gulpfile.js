var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss    = require('gulp-minify-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		jade         = require('gulp-jade'),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglifyjs');

gulp.task('browser-sync', ['styles', 'scripts', 'jade'], function() {
	browserSync.init({
			server: {
					baseDir: "./app"
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
	.pipe(gulp.dest('app'))
	// .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src([
		'./app/libs/modernizr/modernizr.js',
		'./app/libs/jquery/jquery.min.js',
		'./app/libs/pace/pace.min.js',
		'./app/libs/slick/slick.min.js',
		'./app/libs/jquery.directional-hover/jquery.directional-hover.min.js',
		'./app/libs/waypoints/waypoints.min.js',
		'./app/libs/animnum/animnum.js',
		'./app/libs/magnific-popup/jquery.magnific-popup.min.js',
		'./app/libs/animate/animate-css.js',
		// './app/libs/smoothscroll/smoothscroll.min.js',
		'./app/libs/parallax/parallax.min.js',
		'./app/libs/imagesloaded/imagesloaded.pkgd.min.js',
		'./app/libs/isotope/isotope.pkgd.min.js',
		'./app/libs/textillate/jquery.fittext.js',
		'./app/libs/textillate/jquery.lettering.js',
		'./app/libs/textillate/jquery.textillate.js',
		'./app/libs/superfish-master/js/superfish.min.js',
		'./app/libs/selectize/dist/js/standalone/selectize.js',
		'./app/libs/ytp-player/jquery.mb.YTPlayer.min.js',
		'./app/libs/jquery-ui-1.12.1.custom/jquery-ui.min.js',
		'./app/libs/countdown/jquery.countdown.min.js',
		'./app/libs/googlemaps/gmap3.min.js',
		'./app/libs/canvas-bg/particles.min.js',
		'./app/libs/canvas-bg/demo-2.js'
		])
		.pipe(concat('libs.js'))
		.pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('./app/js/'));
});

gulp.task('watch', function () {
	gulp.watch('sass/**/**/*.sass', ['styles']);
	gulp.watch('jade/**/**/**/**/*.jade', ['jade']);  
	gulp.watch('app/libs/**/*.js', ['scripts']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	// gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);