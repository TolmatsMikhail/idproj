var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('chlen', function(){
    return gulp.src('app/scss/style.scss')
        .pipe(sass())
		// .pipe(autoprefixer({
		// 	cascade: true,
		// 	browsers: ['not ie <= 8', 'Firefox > 39', 'iOS > 6', 'ios_saf > 6', 'Chrome > 39']
		// }))
		// .pipe(cleanCSS())
        .pipe(gulp.dest('app/css'))
});

gulp.task('default', function(){
    gulp.watch('app/scss/modules/*.scss', ['chlen']);
})
