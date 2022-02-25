var gulp = require('gulp');
var browserify = require('browserify');
var browserify_css = require('browserify-css');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');

function popup() {
    var b = browserify({
        entries: './src/index.js',
        debug: true,
    })
        .transform(babelify, {
            presets: ["@babel/preset-env", "@babel/preset-react"]
        })
        .transform(browserify_css, {
            poll: true
        });
    return b.bundle()
        .pipe(source('popup.js'))
        .pipe(rename('popup.bundle.js'))
        .pipe(gulp.dest('../extension'));
}


gulp.task('watch', function () {
    gulp.watch('./src/**/*.js', popup);
});