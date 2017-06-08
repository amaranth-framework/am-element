var path = require('path');
var fs = require('fs');

var appRoot = 'src/';
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

var paths = {
	root: appRoot,
	source: appRoot + '**/*.js',
	output: 'dist/',
	packageName: pkg.name
};

module.exports = paths;
