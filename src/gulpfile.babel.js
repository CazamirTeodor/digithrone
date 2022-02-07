var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename');

var contentSrc = './content/index.js';

gulp.task('content', function(){
    return gulp.src(contentSrc)
    .pipe(babel({
        presets: ['@babel/preset-react']
    }))
    .pipe(rename('content.js'))
    .pipe(gulp.dest('dist'));
})


gulp.watch(contentSrc, ['content']);

