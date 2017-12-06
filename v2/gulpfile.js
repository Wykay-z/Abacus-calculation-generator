var gulp = require('gulp');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');

gulp.task('script', function() {
	gulp.src('src/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('app'))
})
gulp.task('images', function() {
	gulp.src('src/images/*.*')
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(gulp.dest('app/images'))
})
gulp.task('lessMin', function() {
	gulp.src('src/*.less')
		.pipe(less())
		.pipe(minifyCSS())
        .pipe(autoprefixer({
          browsers: 'last 2 versions'
        }))
		.pipe(gulp.dest('app'))
})

// gulp.task('css', function() {
// 	gulp.src('src/*.css')
// 		.pipe(minifyCSS())
// 		.pipe(gulp.dest('app'))
// })

gulp.task('html', function () {
    var options = {
        removeComments: true,  //清除HTML注释
        collapseWhitespace: true,  //压缩HTML
        collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
        minifyJS: true,  //压缩页面JS
        minifyCSS: true  //压缩页面CSS
    };
    gulp.src('src/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('app'));
});


gulp.task('auto', function() {
	// 监听文件修改
	gulp.watch('src/*.js', ['script'])
	gulp.watch('src/images/*.*', ['images'])
	gulp.watch('src/*.less', ['lessMin'])
	gulp.watch('src/*.html', ['html'])
	// gulp.watch('src/*.css', ['css'])
})

gulp.task('default', ['script', 'images', 'lessMin', 'html', 'auto'])
gulp.task('final', ['script', 'images', 'lessMin', 'html'])

// 在开发时，只需要编译less时
gulp.task('less', function() {
	gulp.src('src/*.less')
		.pipe(less())
		.pipe(gulp.dest('src'))
})
gulp.task('watchLess', function() {
	gulp.watch('src/*.less', ['less'])
})