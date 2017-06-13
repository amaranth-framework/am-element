// Karma configuration
// Generated on Fri Dec 05 2014 16:49:29 GMT-0500 (EST)

module.exports = function(config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jspm', 'jasmine'],

		jspm: {
			// Edit this to your needs
			serveFiles : ['src/**/*.js'],
			loadFiles: ['test-karma/**/*.js']
		},


		// list of files / patterns to load in the browser
		files: [
			'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.1/custom-elements-es5-adapter.js',
			'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.1/webcomponents-hi-sd-ce.js'
		],


		// list of files to exclude
		exclude: [
			// 'test-karma/**/am-*.js'
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'test-karma/**/*.js': ['babel'],
			'src/**/*.js': ['babel', 'coverage']
		},
		'babelPreprocessor': {
			options: {
				babelrc: false,
				sourceMap: 'inline',
				presets: [ 'es2015', 'stage-1'],
				plugins: [
					'syntax-flow',
					'transform-decorators-legacy',
					'transform-flow-strip-types'
				]
			}
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'coverage'],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,
		// logLevel: config.LOG_DEBUG,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		// optionally, configure the reporter
		coverageReporter: {
			type : 'html',
			dir : 'coverage/'
		}
	});
};
