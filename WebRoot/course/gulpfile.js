// 引入依赖模块
var gulp=require('gulp'),
	concat = require('gulp-concat'),
	fileinclude = require('gulp-file-include'),
	clean = require('gulp-clean'),
	livereload = require('gulp-livereload'),
	cssmin = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
	connect = require('gulp-connect'),
	rename = require('gulp-rename'),
	rubysass = require('gulp-ruby-sass'),
	uglify = require('gulp-uglify'),
	sequence = require('run-sequence')
	;

/**
 * //给 CSS 增加前缀
 * //清理dist文件,尚不知具体作用   应该是防止生成多个相同文件,在build的时候会先清理对应文件
 * //合并js css等文件
 * //自动启动web服务器,实现自动刷新
 * //实现模板分离和合并
 * //压缩图片
 * //实现浏览器自动刷新
 * //压缩css文件
 * //重命名文件 比如jquery.js---->jquery.min.js
 * //编译sass文件
 * //压缩js文件
 * //按顺序执行任务
 */

gulp.task('default',['clean','build'],function(){
    // gulp.watch(['src/*.html','src/scss/*.scss','src/css/*.css','src/js/*.js','src/images/*.*']);
});
//文件合并
gulp.task('concat', function () {
    gulp.src('js/*.js')  //要合并的文件
    .pipe(concat('main.js'))  // 合并匹配到的js文件并命名为 "all.js"
    .pipe(gulp.dest('dist/js'));
});
//分离模板
gulp.task('fileinclude', function() {
    gulp.src('src/**.html')
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
    .pipe(gulp.dest('dist'));
});
//清理dist文件夹
gulp.task('clean',function(){
	gulp.src('dist/*')
	.pipe(clean());
});
//web服务器,实现自动刷新
gulp.task('webserver',function(){
  connect.server({
    livereload:true,
    port:6060
  })
});
//监听文件
gulp.task('watch',['webserver'],function(){
    livereload.listen();
    gulp.watch('src/sass/**/*',['sass']);
    // gulp.watch('src/pages/*',['fileinclude']);
    gulp.watch(['src/*.html','src/css/*.css','src/js/*.js','src/images/*.*'],function(file){
      livereload.changed(file.path);
    });
});
//图片压缩
gulp.task('imagesmin',function(){
  gulp.src('src/images/*.*')
//    	.pipe(debug({title:'imagesmin'}))
      // .pipe(imagemin())压缩图片
      //只压缩修改过的图片
//    	.pipe(cache(imagemin()))
		.pipe(imagemin())
      	.pipe(gulp.dest('dist/images/'));
});
//压缩css
gulp.task('cssmin',function(){
  gulp.src('src/css/*.css')
//    .pipe(debug({title:'cssmin'}))
      .pipe(cssmin())
      .pipe(gulp.dest('dist/css/'));
});
//自动添加前缀
gulp.task('autoprefixer',function(){
  gulp.src('src/scss/*.scss')
      .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('src/scss/main.scss'));
});

//合并、压缩js  重命名
/*gulp.task('rename',function(){
  gulp.src('src/js/*.js')
      .pipe(concat('all.js'))
      .pipe(uglify())
      // .pipe(rename('all.min.js'))
      .pipe(gulp.dest('./dist/js'));
});*/

//单一编译sass
gulp.task('sass', function () {
    return rubysass('src/sass/main.scss')
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        // .pipe(autoprefixer({
        //       browsers: ['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
        //       cascade: true, //是否美化属性值 默认：true 像这样：
        //       //-webkit-transform: rotate(45deg);
        //       //        transform: rotate(45deg);
        //       remove:true //是否去掉不必要的前缀 默认：true
        //   }))
        .pipe(gulp.dest('src/css'));
        // .pipe(livereload());
});

//构建工程,按顺序并行
gulp.task('build',function(done){
  sequence('imagesmin','autoprefixer','sass','cssmin','fileinclude',done);
});