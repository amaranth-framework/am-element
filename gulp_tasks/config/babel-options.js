var path = require('path');
var paths = require('./paths');

exports.base = function() {
  var config = {
	babelrc: false,
    filename: '',
    filenameRelative: '',
    sourceMap: true,
    sourceRoot: '',
    moduleRoot: path.resolve('src').replace(/\\/g, '/'),
    moduleIds: false,
    comments: false,
    compact: false,
    code: true,
    presets: [ 'es2015', 'stage-1' ],
    plugins: [
      'syntax-flow',
      'transform-decorators-legacy',
    ]
  };
  config.plugins.push('transform-flow-strip-types');
  return config;
}

exports.commonjs = function() {
  var options = exports.base();
  options.plugins.push('transform-es2015-modules-commonjs');
  return options;
};

exports.amd = function() {
  var options = exports.base();
  options.plugins.push('transform-es2015-modules-amd');
  return options;
};

exports.system = function() {
  var options = exports.base();
  options.plugins.push('transform-es2015-modules-systemjs');
  return options;
};

exports.es2015 = function() {
  var options = exports.base();
  options.presets = ['stage-1']
  return options;
};

exports['native-modules'] = function() {
  var options = exports.base();
//   options.presets[0] = 'es2015-native-modules';
  options.presets[0] = ["es2015", { "modules": false }];
  return options;
}