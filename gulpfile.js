var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss')
var concatCss = require('gulp-concat-css')

gulp.task('sass', function() {
    return gulp.src('./sass/style.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(autoprefixer({
                browsers: ['last 2 versions']
            }))
        //.pipe(concatCss('./style.css'))
        .pipe(uglifycss({
                'uglyComments': true
            }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream())
})

gulp.task('afterLoad', function() {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/webfontloader/webfontloader.js',
        //'./node_modules/owl.carousel/dist/owl.carousel.min.js',
        './node_modules/slick-carousel/slick/slick.min.js',
        './node_modules/lazysizes/lazysizes.min.js',
        './node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.min.js',
        //'./js/parallax.min.js',
        //'./node_modules/mixitup/dist/mixitup.min.js',
        './js/custom.js',
        ])
    .pipe(concat('all.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
})
gulp.task('watch', () => {
    browserSync.init({
        baseDir: './',
        server: './',
        files: './*.html'
    });
    gulp.watch('./sass/**/*.scss', ['sass'])
    gulp.watch('./js/custom.js', ['afterLoad'])
});
