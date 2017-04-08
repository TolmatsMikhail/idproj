var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

var minify = require('gulp-minify');

gulp.task('gulp-task', function(){
    return gulp.src('app/scss/style.scss')
        .pipe(sass())
		.pipe(autoprefixer({
		 	cascade: false,
		 	browsers: ['not ie <= 8', 'Firefox > 39', 'iOS > 6', 'ios_saf > 6', 'Chrome > 39']
		}))
		.pipe(cleanCSS())
        .pipe(gulp.dest('app/css'))
});

gulp.task('compress', function() {
  gulp.src('app/js/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
    }))
    .pipe(gulp.dest('app/'))
});


gulp.task('default', function(){
    gulp.watch('app/scss/modules/*.scss', ['gulp-task']);
    gulp.watch('app/js/*.js', ['compress']);
})




 
