var paths = require('./config/paths');
var compilerOptions = require('./config/babel-options');

var gulp = require('gulp');

var runSequence = require('run-sequence');
var to5 = require('gulp-babel');
var assign = Object.assign || require('object.assign');
var concat = require('gulp-concat');

var jsName = paths.packageName + '.js';
var compileToModules = ['es2015', 'commonjs', 'amd', 'system', 'native-modules'];

compileToModules.forEach(function(moduleType){
	gulp.task('build-babel-' + moduleType, function () {
		return gulp.src(paths.source)
			.pipe(to5(assign({}, compilerOptions[moduleType]())))
			.pipe(concat('index.js'))
			.pipe(gulp.dest(paths.output + moduleType));
	});
});

gulp.task('build', function(callback) {
	return runSequence(
		'clean',
		compileToModules.map(function(moduleType) { return 'build-babel-' + moduleType }),
		callback
	);
});
