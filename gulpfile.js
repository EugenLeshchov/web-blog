const gulp = require('gulp');
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');

const browserSync = require('browser-sync');
const path = require('path');

let reload = browserSync.reload;

const sourcePath = {
    less: path.join(__dirname, 'src', 'less'),
    html: path.join(__dirname, 'src', 'html'),
    images: path.join(__dirname, 'src', 'images'),
    js: path.join(__dirname, 'src', 'js'),
};

const appPath = {
    css: path.join(__dirname, 'app', 'css'),
    html: path.join(__dirname, 'app', 'html'),
    images: path.join(__dirname, 'app', 'images'),
    js: path.join(__dirname, 'app', 'js'),
};

gulp.task('browserSync', function () {
    browserSync({
        server: ['app'],
        startPath: '/html/',
        port: 8080,
    })
});

gulp.task('js', function() {
    return gulp.src(sourcePath.js + '/**/*')
        .pipe(gulp.dest(appPath.js))
        .pipe(reload({stream: true}));
});

gulp.task('images', function() {
    return gulp.src(sourcePath.images + '/**/*')
        .pipe(gulp.dest(appPath.images))
        .pipe(reload({stream: true}));
});

gulp.task('html', function () {
    return gulp.src(sourcePath.html + '/**/*.html')
        .pipe(gulp.dest(appPath.html))
        .pipe(reload({stream: true}));
});

gulp.task('less', function() {
    const onError = function (err) {
        gutil.log(gutil.colors.red("ERROR", taskName), err);
        this.emit("end", new gutil.PluginError(taskName, err, { showStack: true }));
    };

    return gulp.src(sourcePath.less + '/styles.less')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less().on('error', onError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(appPath.css))
        .pipe(reload({stream: true}));
});

gulp.task('watch', ['browserSync', 'less'], function () {
    gulp.watch(sourcePath.less + '/**/*.less', ['less']);
    gulp.watch(sourcePath.html + '/**/*.html', ['html']);
    gulp.watch(sourcePath.images + '/**/*', ['images']);
    gulp.watch(sourcePath.js + '/**/*', ['js']);
});

gulp.task('start', ['watch', 'html', 'images', 'js'], function () {

});