var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
	browserify('views/index.jsx')
	.transform('babelify', {presets: ['es2015', 'react']})
	.bundle()
	.on('error', function(err) {
		console.log('Error: ' + err.message);
	})
	.pipe(source('index.js'))
	.pipe(gulp.dest('app/js'));
});

gulp.task('copy', function() {
	gulp.src('views/index.html')
	.pipe(gulp.dest('app'));
});

gulp.task('default', ['browserify', 'copy']);

gulp.watch('views/**/**/*', ['default']);
